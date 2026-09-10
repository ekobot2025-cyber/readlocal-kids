import React, { useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Printer, Award } from "lucide-react";

export function CertificateModal({ open, onClose, studentName = "Maria Papuana", stats = {} }) {
  const printRef = useRef(null);

  const handlePrint = () => {
    // 1. Remove previous print iframe if existing
    const existing = document.getElementById("rlk-cert-print-frame");
    if (existing) existing.remove();

    // 2. Create isolated print iframe
    const iframe = document.createElement("iframe");
    iframe.id = "rlk-cert-print-frame";
    iframe.style.position = "fixed";
    iframe.style.left = "-9999px";
    iframe.style.top = "-9999px";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Certificate - ${studentName}</title>
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
              padding: 8mm 12mm;
              background-color: #FFFDF8;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .cert-outer-border {
              width: 100%;
              height: 100%;
              border: 10px solid #F59E0B;
              border-radius: 24px;
              padding: 6mm 10mm;
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
              border-radius: 16px;
              padding: 6mm 10mm;
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
              width: 36px;
              height: 36px;
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
              width: 9px;
              height: 9px;
              border-radius: 50%;
              background: #F59E0B;
              border: 2px solid #FFFFFF;
            }
            .logo-text-main {
              font-family: 'Fredoka', sans-serif;
              font-size: 18px;
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
              font-size: 27px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: #0F172A;
              margin-top: 3px;
            }
            .award-to {
              font-size: 12px;
              font-style: italic;
              font-weight: 600;
              color: #64748B;
              margin-top: 2px;
            }
            .student-name-box {
              margin: 6px 0;
            }
            .student-name {
              font-family: 'Fredoka', sans-serif;
              font-size: 38px;
              font-weight: 800;
              color: #D97706;
              line-height: 1.1;
            }
            .gold-divider {
              width: 180px;
              height: 3px;
              border-radius: 9999px;
              background: linear-gradient(to right, transparent, #F59E0B, transparent);
              margin: 4px auto 0 auto;
            }
            .citation-text {
              max-width: 620px;
              margin: 0 auto;
              font-size: 11.5px;
              line-height: 1.5;
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
              margin-top: 6px;
              padding: 0 10mm;
            }
            .sign-box {
              text-align: center;
              width: 160px;
            }
            .sign-line {
              border-bottom: 1.5px solid #94A3B8;
              padding-bottom: 2px;
              margin-bottom: 3px;
              font-family: Georgia, serif;
              font-style: italic;
              font-size: 16px;
              font-weight: bold;
              color: #334155;
            }
            .sign-name {
              font-size: 11px;
              font-weight: 800;
              color: #1E293B;
            }
            .sign-title {
              font-size: 9px;
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
              width: 50px;
              height: 50px;
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
              margin-top: 3px;
            }
            .meta-bar {
              border-top: 1px solid rgba(252, 211, 77, 0.6);
              margin-top: 6px;
              padding-top: 4px;
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
                <!-- Header -->
                <div>
                  <div class="logo-row">
                    <div class="logo-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
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

                  <!-- Recipient Name -->
                  <div class="student-name-box">
                    <div class="student-name">${studentName}</div>
                    <div class="gold-divider"></div>
                  </div>

                  <!-- Citation -->
                  <p class="citation-text">
                    For outstanding performance, dedication, and excellence in completing the
                    <strong>Papuan Reading Aloud & Cultural Discovery Program</strong>,
                    demonstrating mastery in English pronunciation, fluency, and local Papuan heritage storytelling.
                  </p>
                </div>

                <!-- Signatures & Seal -->
                <div>
                  <div class="footer-row">
                    <div class="sign-box">
                      <div class="sign-line">Mam Yulini</div>
                      <div class="sign-name">Mam Yulini, M.Pd.</div>
                      <div class="sign-title">Research Lead & Author</div>
                    </div>

                    <div class="seal-box">
                      <div class="seal-circle">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
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
        </body>
      </html>
    `);
    doc.close();

    // Trigger print
    setTimeout(() => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (err) {
        console.error("Iframe print fallback:", err);
        window.print();
      }
    }, 450);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => { if (!o) onClose(); }}
      maxWidth="max-w-4xl"
      portalClassName="rlk-cert-portal"
    >
      <DialogContent className="w-full p-2 sm:p-6 overflow-hidden rounded-3xl">
        {/* Modal Action Bar (Hidden during print) */}
        <div data-print-hide="true" className="no-print flex items-center justify-between px-4 pt-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            <h3 className="font-heading text-lg font-bold text-slate-800">Official Certificate Preview</h3>
          </div>
          <div className="flex items-center gap-2 pr-8">
            <Button
              onClick={handlePrint}
              data-testid="print-cert-btn"
              className="rounded-full bg-amber-500 hover:bg-amber-600 font-bold text-white shadow-md text-xs sm:text-sm px-5 py-2.5 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Printer className="h-4 w-4" /> Print / Save as PDF
            </Button>
          </div>
        </div>

        {/* Certificate Landscape Layout Container */}
        <div className="p-2 sm:p-4 max-h-[75vh] overflow-y-auto">
          <div
            id="certificate-printable"
            ref={printRef}
            className="relative mx-auto w-full max-w-3xl rounded-3xl border-8 border-amber-400 bg-[#FFFDF8] p-6 sm:p-10 text-center shadow-2xl overflow-hidden"
          >
            {/* Inner Gold Border Frame */}
            <div className="inner-frame relative z-10 rounded-2xl border-2 border-dashed border-amber-300 p-6 sm:p-8">
              
              {/* Header Logo & Title */}
              <div>
                <div className="flex justify-center mb-2">
                  <Logo size={42} />
                </div>

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
                  READLOCAL KIDS · PAPUAN READING ALOUD PROGRAM
                </span>

                <h1 className="mt-3 font-heading text-3xl sm:text-4xl font-extrabold tracking-wide text-slate-900 uppercase">
                  Certificate of Accomplishment
                </h1>

                <p className="mt-2 text-xs sm:text-sm font-semibold italic text-slate-500">
                  This certificate is proudly awarded to
                </p>

                {/* Recipient Name */}
                <div className="my-3 sm:my-4">
                  <h2 className="font-heading text-3xl sm:text-5xl font-black text-amber-600 tracking-tight drop-shadow-sm">
                    {studentName}
                  </h2>
                  <div className="mx-auto mt-2 h-1 w-48 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                </div>

                {/* Citation Body */}
                <p className="mx-auto max-w-xl text-xs sm:text-sm font-medium leading-relaxed text-slate-700">
                  For outstanding performance, dedication, and excellence in completing the{" "}
                  <span className="font-bold text-slate-900">Papuan Reading Aloud & Cultural Discovery Program</span>,
                  demonstrating mastery in English pronunciation, fluency, and local Papuan heritage storytelling.
                </p>
              </div>

              {/* Gold Seal & Signatures Footer */}
              <div>
                <div className="mt-6 sm:mt-8 grid grid-cols-3 items-end justify-between gap-4">
                  
                  {/* Signature 1: Mam Yulini */}
                  <div className="text-center">
                    <div className="mx-auto mb-1 h-10 sm:h-12 w-28 border-b-2 border-slate-400 flex items-end justify-center pb-1">
                      <span className="font-serif italic text-base sm:text-lg text-slate-700 font-bold">Mam Yulini</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-800">Mam Yulini, M.Pd.</div>
                    <div className="text-[9px] text-slate-500 font-medium">Research Lead & Author</div>
                  </div>

                  {/* Golden Award Ribbon Seal */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex h-14 sm:h-16 w-14 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 text-white shadow-lg border-4 border-amber-200">
                      <Award className="h-8 sm:h-9 w-8 sm:w-9 text-white drop-shadow" />
                    </div>
                    <span className="mt-1 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-amber-800">
                      EXCELLENCE AWARD
                    </span>
                  </div>

                  {/* Signature 2: Miss Bunga */}
                  <div className="text-center">
                    <div className="mx-auto mb-1 h-10 sm:h-12 w-28 border-b-2 border-slate-400 flex items-end justify-center pb-1">
                      <span className="font-serif italic text-base sm:text-lg text-slate-700 font-bold">Miss Bunga</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-800">Miss Bunga, S.Pd.</div>
                    <div className="text-[9px] text-slate-500 font-medium">Co-Author & Educator</div>
                  </div>

                </div>

                {/* Footer Metadata */}
                <div className="mt-4 sm:mt-6 flex items-center justify-between border-t border-amber-200/60 pt-3 text-[10px] text-slate-400 font-semibold">
                  <div>Date Issued: <span className="text-slate-600">{certDate}</span></div>
                  <div>Certificate ID: <span className="text-slate-600 font-mono">{certId}</span></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
