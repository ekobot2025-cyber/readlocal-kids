import React, { useMemo } from "react";
import { createPortal } from "react-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Printer, Award, ExternalLink, Sparkles } from "lucide-react";

/**
 * Generate a standalone, self-contained HTML string for clean printing in a dedicated new tab.
 */
function generatePrintHtml({ studentName, certDate, certId }) {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <title>Sertifikat - ${studentName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700;800&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 landscape;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      width: 297mm;
      height: 210mm;
      margin: 0;
      padding: 0;
      background-color: #FFFDF8;
      font-family: 'Nunito', system-ui, -apple-system, sans-serif;
      overflow: hidden;
      -webkit-font-smoothing: antialiased;
    }
    .cert-page {
      width: 297mm;
      height: 210mm;
      padding: 7mm 10mm;
      background-color: #FFFDF8;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cert-outer-border {
      width: 100%;
      height: 100%;
      border: 8px solid #F59E0B;
      border-radius: 22px;
      padding: 5mm 8mm;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: #FFFDF8;
    }
    .cert-inner-frame {
      width: 100%;
      height: 100%;
      border: 2px dashed #FCD34D;
      border-radius: 14px;
      padding: 5mm 8mm;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
    }
    .logo-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 2px;
    }
    .logo-box {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: linear-gradient(135deg, #F0F9FF, #E0F2FE);
      border: 1.5px solid #BAE6FD;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0284C7;
      position: relative;
    }
    .logo-dot {
      position: absolute;
      top: -3px;
      right: -3px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #F59E0B;
      border: 2px solid #FFFFFF;
    }
    .logo-text-main {
      font-family: 'Fredoka', sans-serif;
      font-size: 17px;
      font-weight: 700;
      color: #1E293B;
      line-height: 1.1;
      text-align: left;
    }
    .logo-text-sub {
      font-size: 8px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #D97706;
    }
    .program-tag {
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #B45309;
      margin-top: 3px;
      display: block;
    }
    .cert-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 26px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #0F172A;
      margin-top: 2px;
    }
    .award-to {
      font-size: 12px;
      font-style: italic;
      font-weight: 600;
      color: #64748B;
      margin-top: 2px;
    }
    .student-name-box {
      margin: 4px 0;
    }
    .student-name {
      font-family: 'Fredoka', sans-serif;
      font-size: 36px;
      font-weight: 800;
      color: #D97706;
      line-height: 1.15;
    }
    .gold-divider {
      width: 170px;
      height: 3px;
      border-radius: 9999px;
      background: linear-gradient(to right, transparent, #F59E0B, transparent);
      margin: 3px auto 0 auto;
    }
    .citation-text {
      max-width: 620px;
      margin: 2px auto 0 auto;
      font-size: 11px;
      line-height: 1.45;
      color: #334155;
      font-weight: 500;
    }
    .citation-text strong {
      color: #0F172A;
      font-weight: 700;
    }
    .footer-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: 4px;
      padding: 0 8mm;
    }
    .sign-box {
      text-align: center;
      width: 150px;
    }
    .sign-line {
      border-bottom: 1.5px solid #94A3B8;
      padding-bottom: 2px;
      margin-bottom: 3px;
      font-family: Georgia, serif;
      font-style: italic;
      font-size: 15px;
      font-weight: bold;
      color: #334155;
    }
    .sign-name {
      font-size: 11px;
      font-weight: 800;
      color: #1E293B;
    }
    .sign-title {
      font-size: 8.5px;
      font-weight: 600;
      color: #64748B;
    }
    .seal-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .seal-circle {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #FDE68A, #F59E0B, #B45309);
      border: 3px solid #FEF3C7;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(245, 158, 11, 0.35);
    }
    .seal-text {
      font-size: 7.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #92400E;
      margin-top: 2px;
    }
    .meta-bar {
      border-top: 1px solid rgba(252, 211, 77, 0.6);
      margin-top: 4px;
      padding-top: 3px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 9px;
      font-weight: 600;
      color: #94A3B8;
    }
    .meta-bar span {
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="cert-page">
    <div class="cert-outer-border">
      <div class="cert-inner-frame">
        <!-- Top Section -->
        <div>
          <div class="logo-row">
            <div class="logo-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <div class="logo-dot"></div>
            </div>
            <div>
              <div class="logo-text-main">ReadLocal <span style="color:#0EA5E9;">Kids</span></div>
              <div class="logo-text-sub">Read English · Discover Culture</div>
            </div>
          </div>

          <span class="program-tag">READLOCAL KIDS · PAPUAN READING ALOUD PROGRAM</span>
          <h1 class="cert-title">Certificate of Accomplishment</h1>
          <p class="award-to">This certificate is proudly awarded to</p>

          <div class="student-name-box">
            <div class="student-name">${studentName}</div>
            <div class="gold-divider"></div>
          </div>

          <p class="citation-text">
            For outstanding performance, dedication, and excellence in completing the
            <strong>Papuan Reading Aloud & Cultural Discovery Program</strong>,
            demonstrating mastery in English pronunciation, fluency, and local Papuan heritage storytelling.
          </p>
        </div>

        <!-- Bottom Signatures & Seal Section -->
        <div>
          <div class="footer-row">
            <div class="sign-box">
              <div class="sign-line">Mam Yulini</div>
              <div class="sign-name">Mam Yulini, M.Pd.</div>
              <div class="sign-title">Research Lead & Author</div>
            </div>

            <div class="seal-box">
              <div class="seal-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <span class="seal-text">Excellence Award</span>
            </div>

            <div class="sign-box">
              <div class="sign-line">Miss Bunga</div>
              <div class="sign-name">Miss Bunga, S.Pd.</div>
              <div class="sign-title">Co-Author & Educator</div>
            </div>
          </div>

          <div class="meta-bar">
            <div>Date Issued: <span>${certDate}</span></div>
            <div>Certificate ID: <span style="font-family:monospace;font-weight:bold;">${certId}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script>
    window.addEventListener('load', function() {
      setTimeout(function() {
        window.print();
      }, 350);
    });
  </script>
</body>
</html>`;
}

export function CertificateModal({ open, onClose, studentName = "Maria Papuana", stats = {} }) {
  // Consistent date & formatted Certificate ID
  const { certDate, certId } = useMemo(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const cleanName = (studentName || "STUDENT")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, 6);
    const id = `RLK-2026-${cleanName || "PAPUA"}-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}`;
    return { certDate: formattedDate, certId: id };
  }, [studentName]);

  // 1. Direct browser print (uses CSS portal to bypass modal overflow containers)
  const handlePrint = () => {
    window.print();
  };

  // 2. Open clean standalone print page in new tab as guaranteed fallback
  const handleOpenInNewTab = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Browser memblokir pop-up. Izinkan pop-up untuk membuka sertifikat di tab baru.");
      return;
    }
    printWindow.document.open();
    printWindow.document.write(generatePrintHtml({ studentName, certDate, certId }));
    printWindow.document.close();
  };

  return (
    <>
      {/* ----------------- MODAL PREVIEW (SCREEN ONLY) ----------------- */}
      <Dialog
        open={open}
        onOpenChange={(o) => { if (!o) onClose(); }}
        maxWidth="max-w-4xl"
        portalClassName="rlk-cert-portal"
      >
        <DialogContent className="w-full p-3 sm:p-6 overflow-hidden rounded-3xl">
          {/* Modal Header & Actions */}
          <div data-print-hide="true" className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 sm:px-4 pt-1 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500 shrink-0" />
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-800">Official Certificate Preview</h3>
                <p className="text-[11px] text-slate-500">Pratinjau resmi sertifikat kelulusan program membaca.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                onClick={handlePrint}
                data-testid="print-cert-btn"
                className="rounded-full bg-amber-500 hover:bg-amber-600 font-bold text-white shadow-md text-xs sm:text-sm px-4 py-2 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <Printer className="h-4 w-4" /> Cetak / Simpan PDF
              </Button>
              <Button
                onClick={handleOpenInNewTab}
                variant="outline"
                className="rounded-full border-amber-300 text-amber-800 hover:bg-amber-50 font-bold text-xs sm:text-sm px-3.5 py-2 flex items-center gap-1.5 cursor-pointer"
                title="Buka sertifikat di tab baru untuk pencetakan bersih bebas kendala"
              >
                <ExternalLink className="h-4 w-4" /> Buka di Tab Baru
              </Button>
            </div>
          </div>

          {/* Quick Print Tip */}
          <div data-print-hide="true" className="no-print bg-amber-50/80 border border-amber-200/80 rounded-xl px-4 py-2 text-xs text-amber-900 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
            <span>
              <strong>Tips Cetak Rapi:</strong> Di jendela cetak browser, pilih <strong>Layout: Landscape (Mendatar)</strong> dan atur <strong>Margins: None / Default</strong>.
            </span>
          </div>

          {/* Visual Certificate Preview Card */}
          <div className="p-1 sm:p-3 max-h-[70vh] overflow-y-auto">
            <div
              id="certificate-preview-box"
              className="relative mx-auto w-full max-w-3xl rounded-2xl border-4 sm:border-8 border-amber-400 bg-[#FFFDF8] p-4 sm:p-8 text-center shadow-xl overflow-hidden"
            >
              <div className="relative z-10 rounded-xl border-2 border-dashed border-amber-300 p-4 sm:p-6 flex flex-col justify-between">
                
                {/* Header */}
                <div>
                  <div className="flex justify-center mb-2">
                    <Logo size={40} />
                  </div>

                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                    READLOCAL KIDS · PAPUAN READING ALOUD PROGRAM
                  </span>

                  <h1 className="mt-2 font-heading text-2xl sm:text-4xl font-extrabold tracking-wide text-slate-900 uppercase">
                    Certificate of Accomplishment
                  </h1>

                  <p className="mt-1 text-xs sm:text-sm font-semibold italic text-slate-500">
                    This certificate is proudly awarded to
                  </p>

                  <div className="my-2 sm:my-3">
                    <h2 className="font-heading text-2xl sm:text-4xl font-black text-amber-600 tracking-tight">
                      {studentName}
                    </h2>
                    <div className="mx-auto mt-1 h-1 w-36 sm:w-48 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                  </div>

                  <p className="mx-auto max-w-xl text-[11px] sm:text-xs font-medium leading-relaxed text-slate-700">
                    For outstanding performance, dedication, and excellence in completing the{" "}
                    <span className="font-bold text-slate-900">Papuan Reading Aloud & Cultural Discovery Program</span>,
                    demonstrating mastery in English pronunciation, fluency, and local Papuan heritage storytelling.
                  </p>
                </div>

                {/* Signatures & Seal */}
                <div className="mt-4 sm:mt-6">
                  <div className="grid grid-cols-3 items-end justify-between gap-2 sm:gap-4">
                    
                    {/* Mam Yulini */}
                    <div className="text-center">
                      <div className="mx-auto mb-1 h-8 sm:h-10 w-24 sm:w-28 border-b-2 border-slate-400 flex items-end justify-center pb-0.5">
                        <span className="font-serif italic text-sm sm:text-base text-slate-700 font-bold">Mam Yulini</span>
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-slate-800">Mam Yulini, M.Pd.</div>
                      <div className="text-[8px] sm:text-[9px] text-slate-500 font-medium">Research Lead & Author</div>
                    </div>

                    {/* Excellence Seal */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 text-white shadow-md border-2 sm:border-4 border-amber-200">
                        <Award className="h-6 sm:h-8 w-6 sm:w-8 text-white drop-shadow" />
                      </div>
                      <span className="mt-1 text-[7px] sm:text-[8px] font-extrabold uppercase tracking-widest text-amber-800">
                        EXCELLENCE AWARD
                      </span>
                    </div>

                    {/* Miss Bunga */}
                    <div className="text-center">
                      <div className="mx-auto mb-1 h-8 sm:h-10 w-24 sm:w-28 border-b-2 border-slate-400 flex items-end justify-center pb-0.5">
                        <span className="font-serif italic text-sm sm:text-base text-slate-700 font-bold">Miss Bunga</span>
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-slate-800">Miss Bunga, S.Pd.</div>
                      <div className="text-[8px] sm:text-[9px] text-slate-500 font-medium">Co-Author & Educator</div>
                    </div>

                  </div>

                  {/* Metadata */}
                  <div className="mt-3 sm:mt-4 flex items-center justify-between border-t border-amber-200/60 pt-2 text-[9px] sm:text-[10px] text-slate-400 font-semibold">
                    <div>Date Issued: <span className="text-slate-600">{certDate}</span></div>
                    <div>Certificate ID: <span className="text-slate-600 font-mono">{certId}</span></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ----------------- DIRECT BODY PORTAL FOR PRINT ENGINE (PRINT ONLY) ----------------- */}
      {open && typeof document !== "undefined" && createPortal(
        <div id="rlk-print-certificate-target">
          <div
            style={{
              width: "100%",
              height: "100%",
              border: "8px solid #F59E0B",
              borderRadius: "22px",
              padding: "5mm 8mm",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "#FFFDF8",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                border: "2px dashed #FCD34D",
                borderRadius: "14px",
                padding: "5mm 8mm",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              {/* Header */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "2px" }}>
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #F0F9FF, #E0F2FE)",
                      border: "1.5px solid #BAE6FD",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#0284C7",
                      position: "relative",
                    }}
                  >
                    <Award style={{ width: "20px", height: "20px", color: "#0284C7" }} />
                    <div
                      style={{
                        position: "absolute",
                        top: "-3px",
                        right: "-3px",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "#F59E0B",
                        border: "2px solid #FFFFFF",
                      }}
                    />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "Fredoka, sans-serif", fontSize: "17px", fontWeight: "700", color: "#1E293B", lineHeight: "1.1" }}>
                      ReadLocal <span style={{ color: "#0EA5E9" }}>Kids</span>
                    </div>
                    <div style={{ fontSize: "8px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", color: "#D97706" }}>
                      Read English · Discover Culture
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: "#B45309",
                    marginTop: "3px",
                    display: "block",
                  }}
                >
                  READLOCAL KIDS · PAPUAN READING ALOUD PROGRAM
                </span>

                <h1
                  style={{
                    fontFamily: "Fredoka, sans-serif",
                    fontSize: "26px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#0F172A",
                    marginTop: "2px",
                  }}
                >
                  Certificate of Accomplishment
                </h1>

                <p
                  style={{
                    fontSize: "12px",
                    fontStyle: "italic",
                    fontWeight: "600",
                    color: "#64748B",
                    marginTop: "2px",
                  }}
                >
                  This certificate is proudly awarded to
                </p>

                <div style={{ margin: "4px 0" }}>
                  <div
                    style={{
                      fontFamily: "Fredoka, sans-serif",
                      fontSize: "36px",
                      fontWeight: "800",
                      color: "#D97706",
                      lineHeight: "1.15",
                    }}
                  >
                    {studentName}
                  </div>
                  <div
                    style={{
                      width: "170px",
                      height: "3px",
                      borderRadius: "9999px",
                      background: "linear-gradient(to right, transparent, #F59E0B, transparent)",
                      margin: "3px auto 0 auto",
                    }}
                  />
                </div>

                <p
                  style={{
                    maxWidth: "620px",
                    margin: "2px auto 0 auto",
                    fontSize: "11px",
                    lineHeight: "1.45",
                    color: "#334155",
                    fontWeight: "500",
                  }}
                >
                  For outstanding performance, dedication, and excellence in completing the{" "}
                  <strong style={{ color: "#0F172A", fontWeight: "700" }}>Papuan Reading Aloud & Cultural Discovery Program</strong>,
                  demonstrating mastery in English pronunciation, fluency, and local Papuan heritage storytelling.
                </p>
              </div>

              {/* Signatures & Seal */}
              <div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "4px", padding: "0 8mm" }}>
                  <div style={{ textAlign: "center", width: "150px" }}>
                    <div
                      style={{
                        borderBottom: "1.5px solid #94A3B8",
                        paddingBottom: "2px",
                        marginBottom: "3px",
                        fontFamily: "Georgia, serif",
                        fontStyle: "italic",
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: "#334155",
                      }}
                    >
                      Mam Yulini
                    </div>
                    <div style={{ fontSize: "11px", fontWeight: "800", color: "#1E293B" }}>Mam Yulini, M.Pd.</div>
                    <div style={{ fontSize: "8.5px", fontWeight: "600", color: "#64748B" }}>Research Lead & Author</div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #FDE68A, #F59E0B, #B45309)",
                        border: "3px solid #FEF3C7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 10px rgba(245, 158, 11, 0.35)",
                      }}
                    >
                      <Award style={{ width: "26px", height: "26px", color: "#FFFFFF" }} />
                    </div>
                    <span
                      style={{
                        fontSize: "7.5px",
                        fontWeight: "800",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        color: "#92400E",
                        marginTop: "2px",
                      }}
                    >
                      Excellence Award
                    </span>
                  </div>

                  <div style={{ textAlign: "center", width: "150px" }}>
                    <div
                      style={{
                        borderBottom: "1.5px solid #94A3B8",
                        paddingBottom: "2px",
                        marginBottom: "3px",
                        fontFamily: "Georgia, serif",
                        fontStyle: "italic",
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: "#334155",
                      }}
                    >
                      Miss Bunga
                    </div>
                    <div style={{ fontSize: "11px", fontWeight: "800", color: "#1E293B" }}>Miss Bunga, S.Pd.</div>
                    <div style={{ fontSize: "8.5px", fontWeight: "600", color: "#64748B" }}>Co-Author & Educator</div>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px solid rgba(252, 211, 77, 0.6)",
                    marginTop: "4px",
                    paddingTop: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "9px",
                    fontWeight: "600",
                    color: "#94A3B8",
                  }}
                >
                  <div>Date Issued: <span style={{ color: "#475569" }}>{certDate}</span></div>
                  <div>Certificate ID: <span style={{ color: "#475569", fontFamily: "monospace", fontWeight: "bold" }}>{certId}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
