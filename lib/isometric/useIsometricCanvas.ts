// lib/isometric/useIsometricCanvas.ts
import { RefObject, useCallback, useRef } from "react";
import { tiles, Tile } from "./tileData";

/**
 * Linear interpolation helper
 */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Convert HEX to RGBA with given opacity */
function hexToRgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

/** Isometric projection */
function isoProject(x: number, y: number): [number, number] {
  return [x - y, (x + y) * 0.5];
}

/** Main hook */
export function useIsometricCanvas({
  canvasRef,
  activeTile,
  hoveredTile,
  setActiveTile,
  setHoveredTile,
}: {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  activeTile: string | null;
  hoveredTile: string | null;
  setActiveTile: (id: string | null) => void;
  setHoveredTile: (id: string | null) => void;
}) {
  // Use refs to store interactive states so we can access them in the animate loop at 60fps
  // without triggering continuous React re-renders or suffering from JS closure staleness.
  const stateRef = useRef<
    Record<
      string,
      {
        hover: number;        // current animated hover (0 to 1)
        targetHover: number;  // target hover (0 or 1)
        active: boolean;      // current active state
      }
    >
  >({
    aepers: { hover: 0, targetHover: 0, active: false }, // Master orchestrator tile
    voice: { hover: 0, targetHover: 0, active: false },
    chat: { hover: 0, targetHover: 0, active: false },
    workflow: { hover: 0, targetHover: 0, active: false },
    data: { hover: 0, targetHover: 0, active: false },
  });

  const mouseRef = useRef({ x: 370, y: 280 });
  const hoveredTileRef = useRef<string | null>(hoveredTile);
  const activeTileRef = useRef<string | null>(activeTile);

  // Sync state refs instantly on every component render
  hoveredTileRef.current = hoveredTile;
  activeTileRef.current = activeTile;

  /** Initialise canvas – set DPI & start animation loop */
  const initCanvas = useCallback((): void | (() => void) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Retina (HiDPI) scaling — keep CSS display size fixed at 740×560
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 740 * dpr;
    canvas.height = 560 * dpr;
    canvas.style.width = "740px";
    canvas.style.height = "560px";
    ctx.scale(dpr, dpr);

    let animationFrameId: number;
    let mounted = true; // guard against post-unmount rAF callbacks

    const render = (time: number) => {
      if (!mounted) return; // bail if already cleaned up

      // 1. Continuous lerp for hover states
      const states = stateRef.current;
      let hasHovered = false;

      Object.keys(states).forEach((id) => {
        const s = states[id];
        const isHovered = hoveredTileRef.current === id;
        s.targetHover = isHovered ? 1 : 0;
        s.hover = lerp(s.hover, s.targetHover, 0.15);
        s.active = activeTileRef.current === id;
        if (s.targetHover > 0.5) hasHovered = true;
      });

      // 2. Dynamic cursor pointer feedback
      canvas.style.cursor = hasHovered ? "pointer" : "default";

      // 3. Draw scene (clear in CSS-pixel space — drawing coords are 0..740 × 0..560)
      ctx.clearRect(0, 0, 740, 560);
      drawScene(ctx, time / 1000);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      mounted = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef]);


  /** Mouse move – update mouse position and target hover states */
  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    mouseRef.current = { x: mx, y: my };

    let currentlyHovered: string | null = null;

    // A. Bounding Box check for the master 'aepers' Tile
    const masterCx = 370;
    const masterCy = 130;
    const masterHalf = 95; // size 190
    const insideMaster =
      Math.abs(mx - masterCx) / masterHalf + Math.abs(my - masterCy) / (masterHalf / 2) <= 1.05;

    if (insideMaster) {
      currentlyHovered = "aepers";
    } else {
      // B. Bounding Box check for the 4 sub-tiles
      tiles.forEach((t, idx) => {
        const gx = idx % 2 === 0 ? -0.5 : 0.5;
        const gy = idx < 2 ? -0.5 : 0.5;
        const size = 150; // Beautiful layout spacing
        const [cX, cY] = isoProject(gx * size, gy * size);
        const cx = 370 + cX;
        const cy = 345 + cY; // Centered lower to fit the master tile above
        const half = size / 2;

        const inside =
          Math.abs(mx - cx) / half + Math.abs(my - cy) / (half / 2) <= 1.05;

        if (inside) {
          currentlyHovered = t.id;
        }
      });
    }

    if (currentlyHovered !== hoveredTileRef.current) {
      hoveredTileRef.current = currentlyHovered;
      setHoveredTile(currentlyHovered); // Notify parent component of hover change immediately
    }
  };

  /** Click – toggle activation */
  const handleClick = () => {
    const activeId = hoveredTileRef.current;
    if (!activeId || activeId === "aepers") return; // Master tile click does not open steps below

    if (activeTileRef.current === activeId) {
      setActiveTile(null);
    } else {
      setActiveTile(activeId);
    }
  };

  /** Core drawing routine */
  const drawScene = (
    ctx: CanvasRenderingContext2D,
    t: number,
  ) => {
    const size = 150;
    const depth = 30;
    const centreX = 370;
    const centreY = 345; // Lowered center of grid for sub-tiles
    const grid = [
      { gx: -0.5, gy: -0.5, id: "voice" },
      { gx: 0.5, gy: -0.5, id: "chat" },
      { gx: -0.5, gy: 0.5, id: "workflow" },
      { gx: 0.5, gy: 0.5, id: "data" },
    ];

    const states = stateRef.current;

    // 1. Draw dot fields first (behind sub-tiles)
    grid.forEach(({ gx, gy, id }) => {
      const tile = tiles.find((x) => x.id === id)!;
      const state = states[id];
      if (state.hover > 0.01 || state.active) {
        drawHoverDots(
          ctx,
          tile,
          gx,
          gy,
          size,
          depth,
          centreX,
          centreY,
          t,
          state,
        );
      }
    });

    // 2. Draw the master "aepers" dot field when hovered/active
    const masterState = states["aepers"];
    if (masterState.hover > 0.01) {
      drawMasterHoverDots(ctx, 370, 130, 190, t, masterState);
    }

    // 3. Draw energy pipelines flowing down from "aepers" to the 4 modules
    drawEnergyPipelines(ctx, grid, centreX, centreY, size, t);

    // 4. Draw the master "aepers" Tile at the top
    drawMasterTile(ctx, 370, 130, 190, 34, t, masterState);

    // 5. Draw sub-tiles with beautiful lighting, layers, and hover lift
    grid.forEach(({ gx, gy, id }) => {
      const tile = tiles.find((x) => x.id === id)!;
      const state = states[id];
      const lift = state.hover * 20 + (state.active ? 8 : 0);
      drawTile(
        ctx,
        tile,
        gx,
        gy,
        size,
        depth,
        centreX,
        centreY,
        lift,
        t,
        state,
      );
    });

    // 6. Draw elegant connecting guides when a sub-tile is active
    if (activeTileRef.current) {
      const points = grid.map(({ gx, gy }) => {
        const [cX, cY] = isoProject(gx * size, gy * size);
        return { x: centreX + cX, y: centreY + cY };
      });
      ctx.save();
      ctx.strokeStyle = "rgba(245, 98, 17, 0.15)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }
  };

  /** Master "aepers" Tile Drawing */
  const drawMasterTile = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    size: number,
    depth: number,
    time: number,
    state: { hover: number; active: boolean },
  ) => {
    const lift = state.hover * 22; // Master tile floats upward elegantly
    const cyLifted = cy - lift;
    const half = size / 2;

    const pts: [number, number][] = [
      [cx, cyLifted - half / 2],
      [cx + half, cyLifted],
      [cx, cyLifted + half / 2],
      [cx - half, cyLifted],
    ];

    // A. Ambient Shadow beneath the master card
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy + size * 0.4, half * 0.95, half * 0.28, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(245, 98, 17, 0.10)";
    ctx.filter = `blur(${10 + state.hover * 5}px)`;
    ctx.fill();
    ctx.restore();

    // B. Left side depth (accent brand color)
    ctx.save();
    ctx.fillStyle = hexToRgba("#F56211", 0.6); // Warm Brand Accent Color
    ctx.beginPath();
    ctx.moveTo(pts[2][0], pts[2][1]);
    ctx.lineTo(pts[3][0], pts[3][1]);
    ctx.lineTo(pts[3][0], pts[3][1] + depth);
    ctx.lineTo(pts[2][0], pts[2][1] + depth);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // C. Right side depth (shadowed accent color)
    ctx.save();
    ctx.fillStyle = hexToRgba("#E04A00", 0.45);
    ctx.beginPath();
    ctx.moveTo(pts[1][0], pts[1][1]);
    ctx.lineTo(pts[2][0], pts[2][1]);
    ctx.lineTo(pts[2][0], pts[2][1] + depth);
    ctx.lineTo(pts[1][0], pts[1][1] + depth);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // D. Top Face (Solid white surface with clean double border)
    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#F56211";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // E. Dynamic Cursor Spotlight tracking
    ctx.save();
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    if (Math.hypot(mx - cx, my - cyLifted) < 250) {
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
      ctx.closePath();
      ctx.clip();

      const lightGrad = ctx.createRadialGradient(mx, my, 5, mx, my, 140);
      lightGrad.addColorStop(0, "rgba(255, 255, 255, 0.5)");
      lightGrad.addColorStop(0.5, "rgba(245, 98, 17, 0.08)");
      lightGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = lightGrad;
      ctx.fill();
    }
    ctx.restore();

    // F. Inner Dashed Detail Border (12px inset)
    ctx.save();
    const insetX = 14;
    const insetY = 7;
    const innerPts = [
      [cx, pts[0][1] + insetY],
      [pts[1][0] - insetX, cyLifted],
      [cx, pts[2][1] - insetY],
      [pts[3][0] + insetX, cyLifted],
    ];
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = "rgba(245, 98, 17, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    innerPts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    // G. Typography - "aepers" (brand lowercase & premium decent styling)
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // CHARACTER ICON (Central node symbol)
    ctx.fillStyle = "#F56211";
    ctx.font = "bold 20px 'Satoshi', 'DM Sans', sans-serif";
    ctx.fillText("❖", cx, cyLifted - 18);

    // BRAND NAME (lowercase, bold, clean)
    ctx.fillStyle = "#111111";
    ctx.font = "900 16px 'Satoshi', 'DM Sans', sans-serif";
    ctx.fillText("aepers", cx, cyLifted + 6);

    // SUB-LABEL
    ctx.fillStyle = "rgba(245, 98, 17, 0.8)";
    ctx.font = "bold 9px 'Satoshi', 'DM Sans', sans-serif";
    ctx.fillText("CORE ENGINE", cx, cyLifted + 22);

    ctx.restore();
  };

  /** Helper to draw energy pipelines connecting master node to all 4 modules */
  const drawEnergyPipelines = (
    ctx: CanvasRenderingContext2D,
    grid: { gx: number; gy: number; id: string }[],
    centreX: number,
    centreY: number,
    size: number,
    time: number,
  ) => {
    const states = stateRef.current;
    const masterCx = 370;
    const masterCy = 130 + 17; // Start from bottom of the master tile's depth

    ctx.save();
    grid.forEach(({ gx, gy, id }) => {
      const tile = tiles.find((x) => x.id === id)!;
      const subState = states[id];
      const masterState = states["aepers"];

      const [cX, cY] = isoProject(gx * size, gy * size);
      const subCx = centreX + cX;
      // Terminate at the top corner of the sub-tile diamond top face
      const lift = subState.hover * 20 + (subState.active ? 8 : 0);
      const subCy = centreY + cY - size / 4 - lift;

      // 1. Draw glowing pipeline background line
      ctx.beginPath();
      ctx.moveTo(masterCx, masterCy);
      ctx.lineTo(subCx, subCy);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = hexToRgba(tile.accent, (subState.hover > 0.1 || masterState.hover > 0.1) ? 0.25 : 0.08);
      ctx.stroke();

      // 2. Draw pulsing energy dot traveling along the line
      // When hovered, the particle speeds up and gets larger
      const speed = subState.hover > 0.1 ? 1.5 : 0.8;
      const progress = (time * speed) % 1;
      const px = lerp(masterCx, subCx, progress);
      const py = lerp(masterCy, subCy, progress);

      ctx.beginPath();
      ctx.arc(px, py, subState.hover > 0.1 ? 4.5 : 3, 0, Math.PI * 2);
      ctx.fillStyle = tile.accent;
      ctx.shadowColor = tile.accent;
      ctx.shadowBlur = subState.hover > 0.1 ? 12 : 4;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow
    });
    ctx.restore();
  };

  /** Master tile hover dot field */
  const drawMasterHoverDots = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    size: number,
    time: number,
    state: { hover: number },
  ) => {
    const gridSize = 24;
    const dotR = 2.0;
    const spread = size * 1.6;

    ctx.save();
    ctx.fillStyle = "#F56211";
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const localX = (i - gridSize / 2) * (spread / gridSize);
        const localY = (j - gridSize / 2) * (spread / gridSize);
        const [dx, dy] = isoProject(localX, localY);
        const px = cx + dx;
        const py = cy + dy;
        const dist = Math.hypot(dx, dy);
        const maxDist = spread / 2;
        const baseOp = 1 - dist / maxDist;
        const ripple = Math.sin(time * 1.2 + dist * 6) * 0.5 + 0.5;
        const op = baseOp * ripple * state.hover;
        ctx.globalAlpha = Math.max(0, Math.min(1, op));
        ctx.beginPath();
        ctx.arc(px, py, dotR, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  };

  /** Individual sub-tile drawing */
  const drawTile = (
    ctx: CanvasRenderingContext2D,
    tile: Tile,
    gx: number,
    gy: number,
    size: number,
    depth: number,
    centreX: number,
    centreY: number,
    lift: number,
    time: number,
    state: { hover: number; active: boolean },
  ) => {
    const [cX, cY] = isoProject(gx * size, gy * size);
    const cx = centreX + cX;
    const cy = centreY + cY - lift;
    const half = size / 2;

    // Top face diamond corners
    const pts: [number, number][] = [
      [cx, cy - half / 2],
      [cx + half, cy],
      [cx, cy + half / 2],
      [cx - half, cy],
    ];

    // 1. Soft shadow beneath sub-tile
    ctx.save();
    ctx.beginPath();
    const shadowY = centreY + cY + size * 0.45 + (lift * 0.25);
    const shadowWidth = half * (1 - state.hover * 0.15);
    const shadowHeight = half * 0.28 * (1 - state.hover * 0.15);
    ctx.ellipse(cx, shadowY, shadowWidth, shadowHeight, 0, 0, Math.PI * 2);
    ctx.fillStyle = state.active
      ? hexToRgba(tile.accent, 0.12)
      : "rgba(17, 12, 10, 0.08)";
    ctx.filter = `blur(${8 + state.hover * 4}px)`;
    ctx.fill();
    ctx.restore();

    // 2. Left side face (depth) - 55% opacity
    ctx.save();
    ctx.fillStyle = hexToRgba(tile.accent, 0.55);
    ctx.beginPath();
    ctx.moveTo(pts[2][0], pts[2][1]);
    ctx.lineTo(pts[3][0], pts[3][1]);
    ctx.lineTo(pts[3][0], pts[3][1] + depth);
    ctx.lineTo(pts[2][0], pts[2][1] + depth);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 3. Right side face (depth) - 40% opacity
    ctx.save();
    ctx.fillStyle = hexToRgba(tile.accent, 0.4);
    ctx.beginPath();
    ctx.moveTo(pts[1][0], pts[1][1]);
    ctx.lineTo(pts[2][0], pts[2][1]);
    ctx.lineTo(pts[2][0], pts[2][1] + depth);
    ctx.lineTo(pts[1][0], pts[1][1] + depth);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 4. Top face (White background)
    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = state.active ? tile.accent : hexToRgba(tile.accent, 0.85);
    ctx.lineWidth = state.active ? 2.5 : 1.5;
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 5. Spotlight tracking light overlay
    ctx.save();
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const distToMouse = Math.hypot(mx - cx, my - cy);
    if (distToMouse < 250) {
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
      ctx.closePath();
      ctx.clip();

      const lightGrad = ctx.createRadialGradient(mx, my, 5, mx, my, 120);
      lightGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      lightGrad.addColorStop(0.5, hexToRgba(tile.accent, 0.1));
      lightGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = lightGrad;
      ctx.fill();
    }
    ctx.restore();

    // 6. Inner Dashed Detail Border (12px inset)
    ctx.save();
    const insetX = 12;
    const insetY = 6;
    const innerPts = [
      [cx, pts[0][1] + insetY],
      [pts[1][0] - insetX, cy],
      [cx, pts[2][1] - insetY],
      [pts[3][0] + insetX, cy],
    ];
    ctx.setLineDash([5, 3]);
    ctx.strokeStyle = hexToRgba(tile.accent, 0.35);
    ctx.lineWidth = 1;
    ctx.beginPath();
    innerPts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    // 7. Corner Rivets
    ctx.save();
    ctx.fillStyle = hexToRgba(tile.accent, 0.45);
    innerPts.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // 8. Typography inside sub-card
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // CHARACTER ICON
    ctx.fillStyle = tile.accent;
    ctx.font = "bold 16px 'Satoshi', 'DM Sans', sans-serif";
    ctx.fillText(tile.icon, cx, cy - 14);

    // TITLE (Split symmetrically)
    ctx.fillStyle = "#111111";
    ctx.font = "700 11px 'Satoshi', 'DM Sans', sans-serif";

    let line1 = "";
    let line2 = "";
    if (tile.id === "voice") {
      line1 = "AI Voice";
      line2 = "Receptionist";
    } else if (tile.id === "chat") {
      line1 = "Intelligent";
      line2 = "Chatbot";
    } else if (tile.id === "workflow") {
      line1 = "Workflow";
      line2 = "Automation";
    } else if (tile.id === "data") {
      line1 = "Data";
      line2 = "Dashboards";
    }

    ctx.fillText(line1, cx, cy + 4);
    ctx.fillText(line2, cx, cy + 16);
    ctx.restore();
  };

  /** Sub-tile hover dot field */
  const drawHoverDots = (
    ctx: CanvasRenderingContext2D,
    tile: Tile,
    gx: number,
    gy: number,
    size: number,
    depth: number,
    centreX: number,
    centreY: number,
    time: number,
    state: { hover: number; active: boolean },
  ) => {
    const [cX, cY] = isoProject(gx * size, gy * size);
    const cx = centreX + cX;
    const cy = centreY + cY;
    const gridSize = 22;
    const dotR = 1.8;
    const spread = size * 1.8;

    ctx.save();
    ctx.fillStyle = tile.accent;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const localX = (i - gridSize / 2) * (spread / gridSize);
        const localY = (j - gridSize / 2) * (spread / gridSize);
        const [dx, dy] = isoProject(localX, localY);
        const px = cx + dx;
        const py = cy + dy;
        const dist = Math.hypot(dx, dy);
        const maxDist = spread / 2;
        const baseOp = 1 - dist / maxDist;
        const ripple = Math.sin(time * 1.0 + dist * 8) * 0.5 + 0.5;
        const op = baseOp * ripple * state.hover;
        ctx.globalAlpha = Math.max(0, Math.min(1, op));
        ctx.beginPath();
        ctx.arc(px, py, dotR, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  };

  return { initCanvas, handleMouseMove, handleClick };
}
