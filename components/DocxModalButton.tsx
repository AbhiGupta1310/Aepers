"use client";
import { useState, useEffect } from "react";
import { X, FileText, Download, Loader2 } from "lucide-react";

interface Props {
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
}

export default function DocxModalButton({ title, description, fileUrl, fileName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [docHtml, setDocHtml] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen && !docHtml) {
      setIsLoading(true);
      fetch(`/api/parse-docx?file=${encodeURIComponent(fileName)}`)
        .then(res => res.json())
        .then(data => {
          if (data.html) {
            // Remove the table cells containing only numbers (1, 2, 3...) that cause misalignment
            const cleanedHtml = data.html.replace(/<td><p><strong>\d+<\/strong><\/p><\/td>/g, '');
            setDocHtml(cleanedHtml);
          } else {
            setError(true);
          }
        })
        .catch(() => setError(true))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, fileName, docHtml]);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn-ghost" style={{ cursor: "pointer" }}>
        View Docx
      </button>

      {isOpen && (
        <div 
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
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
              maxWidth: "800px",
              width: "100%",
              position: "relative",
              boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
              animation: "fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh"
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
              background: "var(--surface-2)", 
              padding: "32px", 
              borderRadius: "12px", 
              border: "1px solid var(--border-subtle)", 
              marginBottom: "24px",
              overflowY: "auto",
              flexGrow: 1
            }}>
              {isLoading && (
                <div style={{ display: "flex", alignItems: "center", justifyItems: "center", padding: "60px 0", color: "var(--text-secondary)", gap: "12px", justifyContent: "center" }}>
                  <Loader2 size={24} className="animate-spin" />
                  <span>Loading document preview...</span>
                </div>
              )}
              {error && !isLoading && (
                <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
                  Preview unavailable. You can still download the file below.
                </div>
              )}
              {docHtml && !isLoading && (
                <>
                  <style>{`
                    .docx-preview ol,
                    .docx-preview ul {
                      list-style: none !important;
                      padding-left: 0 !important;
                      margin-left: 0 !important;
                      counter-reset: none !important;
                    }
                    .docx-preview ol li,
                    .docx-preview ul li {
                      list-style: none !important;
                    }
                    .docx-preview ol li::before,
                    .docx-preview ul li::before,
                    .docx-preview ol li::marker,
                    .docx-preview ul li::marker {
                      content: none !important;
                      display: none !important;
                    }
                  `}</style>
                  <div 
                    className="docx-preview"
                    dangerouslySetInnerHTML={{ __html: docHtml }} 
                    style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-primary)", fontFamily: "sans-serif" }}
                  />
                </>
              )}
            </div>
            
            <div style={{ display: "flex", gap: "16px", flexShrink: 0 }}>
              <a 
                href={fileUrl} 
                download={fileName} 
                className="btn-primary" 
                style={{ width: "100%", justifyContent: "center", display: "flex", alignItems: "center", gap: "8px" }} 
                onClick={() => setIsOpen(false)}
              >
                <Download size={18} /> Download {fileName}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
