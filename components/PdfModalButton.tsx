"use client";
import { useState } from "react";
import { X, FileText, Download } from "lucide-react";

interface Props {
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
}

export default function PdfModalButton({ title, description, fileUrl, fileName }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn-ghost" style={{ cursor: "pointer" }}>
        View PDF
      </button>

      {isOpen && (
        <div 
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px"
          }} 
          onClick={() => setIsOpen(false)}
        >
          <div 
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "900px",
              width: "100%",
              position: "relative",
              boxShadow: "0 24px 48px rgba(0,0,0,0.3)",
              animation: "fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              display: "flex",
              flexDirection: "column",
              height: "85vh",
              maxHeight: "900px"
            }} 
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsOpen(false)}
              style={{ 
                position: "absolute", 
                top: "20px", 
                right: "20px", 
                background: "rgba(255,255,255,0.05)", 
                border: "1px solid var(--border-subtle)", 
                cursor: "pointer", 
                color: "var(--text-secondary)",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
            >
              <X size={16} />
            </button>
            
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", flexShrink: 0 }}>
              <div style={{ 
                background: "rgba(245, 98, 17, 0.1)", 
                border: "1px solid rgba(245, 98, 17, 0.2)",
                padding: "14px", 
                borderRadius: "14px", 
                color: "var(--accent)" 
              }}>
                <FileText size={28} />
              </div>
              <div>
                <span className="badge" style={{ marginBottom: "6px", display: "inline-block" }}>DOCUMENT PREVIEW</span>
                <h3 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</h3>
              </div>
            </div>
            
            <div style={{ 
              background: "#ffffff", 
              borderRadius: "12px", 
              border: "1px solid var(--border-subtle)", 
              marginBottom: "24px",
              flexGrow: 1,
              position: "relative",
              overflow: "hidden"
            }}>
              <iframe 
                src={`${fileUrl}#toolbar=1`} 
                style={{ width: "100%", height: "100%", border: "none" }} 
              />
            </div>
            
            <div style={{ display: "flex", gap: "16px", flexShrink: 0 }}>
              <a 
                href={fileUrl} 
                download={fileName} 
                className="btn-primary" 
                style={{ width: "100%", justifyContent: "center", display: "flex", alignItems: "center", gap: "8px" }} 
                onClick={() => setIsOpen(false)}
              >
                <Download size={18} /> Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
