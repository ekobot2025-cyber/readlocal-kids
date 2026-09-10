import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { CERTIFICATE_BADGE_BASE64 } from "./badgeBase64";
import { Printer, Award, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";

/**
 * Generate a standalone, self-contained HTML string for clean printing in a dedicated new tab.
 */
function generatePrintHtml({ studentName, certDate, certId, qrCodeDataUrl, badgeBase64 }) {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <title>Sertifikat Resmi - ${studentName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700;800&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=Playfair+Display:ital,wght@1,600;1,700&display=swap" rel="stylesheet">
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
      border: 6px solid #D97706;
      border-radius: 20px;
      padding: 5mm 8mm;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: #FFFDF8;
      position: relative;
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
    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 2px;
      border-bottom: 1px solid rgba(252, 211, 77, 0.4);
    }
    .logo-row {
      display: flex;
      align-items: center;
      gap: 10px;
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
    .cert-badge-pill {
      background: #FEF3C7;
      border: 1px solid #FCD34D;
      border-radius: 9999px;
      padding: 3px 12px;
      font-size: 9px;
      font-weight: 800;
      color: #92400E;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .program-tag {
      font-size: 9.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      color: #B45309;
      margin-top: 3px;
      display: block;
    }
    .cert-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 27px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #0F172A;
      margin-top: 2px;
      line-height: 1.15;
    }
    .award-to {
      font-size: 12px;
      font-style: italic;
      font-weight: 600;
      color: #64748B;
      margin-top: 2px;
    }
    .student-name-box {
      margin: 4px 0 2px 0;
    }
    .student-name {
      font-family: 'Fredoka', sans-serif;
      font-size: 38px;
      font-weight: 800;
      color: #D97706;
      line-height: 1.1;
      letter-spacing: -0.5px;
    }
    .gold-divider {
      width: 220px;
      height: 3px;
      border-radius: 9999px;
      background: linear-gradient(to right, transparent, #F59E0B, transparent);
      margin: 4px auto 0 auto;
    }
    .citation-text {
      max-width: 680px;
      margin: 4px auto 0 auto;
      font-size: 11.5px;
      line-height: 1.45;
      color: #334155;
      font-weight: 500;
    }
    .citation-text strong {
      color: #0F172A;
      font-weight: 700;
    }

    /* 3 Competency Highlights to balance vertical space */
    .competency-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      max-width: 720px;
      margin: 8px auto 4px auto;
      text-align: left;
    }
    .competency-card {
      background: #FFFDF9;
      border: 1px solid #FDE68A;
      border-radius: 10px;
      padding: 6px 10px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    .competency-icon {
      font-size: 16px;
      line-height: 1;
      margin-top: 2px;
    }
    .competency-title {
      font-size: 10px;
      font-weight: 800;
      color: #92400E;
      line-height: 1.2;
    }
    .competency-desc {
      font-size: 8px;
      color: #64748B;
      line-height: 1.25;
      margin-top: 1px;
    }

    /* Bottom Section: Left 3D Ribbon Badge, Right 1 Signatory + QR Code */
    .validation-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: 6px;
      padding: 0 10mm;
    }
    .badge-section {
      display: flex;
      align-items: center;
      gap: 12px;
      text-align: left;
    }
    .badge-img {
      width: 78px;
      height: 78px;
      object-fit: contain;
      filter: drop-shadow(0 4px 8px rgba(217, 119, 6, 0.3));
    }
    .badge-text-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 11.5px;
      font-weight: 700;
      color: #B45309;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      line-height: 1.2;
    }
    .badge-text-sub {
      font-size: 8.5px;
      color: #64748B;
      font-weight: 600;
      line-height: 1.2;
      margin-top: 1px;
    }

    /* Single Signatory + QR Code */
    .signatory-section {
      display: flex;
      align-items: center;
      gap: 14px;
      background: #FFFDF9;
      border: 1px solid rgba(252, 211, 77, 0.6);
      border-radius: 12px;
      padding: 6px 12px;
      text-align: left;
    }
    .qr-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }
    .qr-img {
      width: 60px;
      height: 60px;
      border-radius: 6px;
      border: 1px solid #CBD5E1;
      background: #FFFFFF;
      padding: 2px;
    }
    .qr-label {
      font-size: 7px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748B;
    }
    .sign-content {
      border-left: 1px solid #E2E8F0;
      padding-left: 12px;
    }
    .sign-script {
      font-family: 'Playfair Display', Georgia, cursive;
      font-style: italic;
      font-size: 17px;
      font-weight: 700;
      color: #1E293B;
      line-height: 1.1;
      margin-bottom: 2px;
    }
    .sign-line {
      width: 160px;
      height: 1.5px;
      background: #94A3B8;
      margin: 2px 0 3px 0;
    }
    .sign-name {
      font-size: 12px;
      font-weight: 800;
      color: #0F172A;
      line-height: 1.2;
    }
    .sign-role {
      font-size: 9px;
      font-weight: 600;
      color: #475569;
      line-height: 1.2;
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
        
        <!-- 1. Header Row with Branding & ID -->
        <div class="header-row">
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
          <div class="cert-badge-pill">
            ID: ${certId}
          </div>
        </div>

        <!-- 2. Program Title & Recipient -->
        <div>
          <span class="program-tag">READLOCAL KIDS · PAPUAN READING ALOUD & CULTURAL DISCOVERY PROGRAM</span>
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

          <!-- 3. Key Competency Highlights to Fill Vertical Space -->
          <div class="competency-grid">
            <div class="competency-card">
              <span class="competency-icon">🎧</span>
              <div>
                <div class="competency-title">Pronunciation & Diction</div>
                <div class="competency-desc">Mastered clear phonetic sounds, intonation, and expressive word stress.</div>
              </div>
            </div>
            <div class="competency-card">
              <span class="competency-icon">📖</span>
              <div>
                <div class="competency-title">Oral Reading Fluency</div>
                <div class="competency-desc">Achieved natural reading pacing, confidence, and expressive storytelling aloud.</div>
              </div>
            </div>
            <div class="competency-card">
              <span class="competency-icon">🏝️</span>
              <div>
                <div class="competency-title">Papuan Cultural Heritage</div>
                <div class="competency-desc">Explored 26 illustrated indigenous folktales and regional Papuan traditions.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Bottom Validation: 3D Ribbon Badge (Left) + Single Signatory with QR Code (Right) -->
        <div>
          <div class="validation-row">
            
            <!-- Left: 3D Gold Medal Ribbon Badge -->
            <div class="badge-section">
              <img src="${badgeBase64}" alt="Excellence Badge" class="badge-img" />
              <div>
                <div class="badge-text-title">Official Excellence Badge</div>
                <div class="badge-text-sub">Verified Reading Aloud Achievement</div>
                <div class="badge-text-sub" style="color:#D97706;font-weight:700;margin-top:2px;">ReadLocal Kids Certified Learner</div>
              </div>
            </div>

            <!-- Right: Single Signatory with QR Code -->
            <div class="signatory-section">
              <div class="qr-box">
                <img src="${qrCodeDataUrl}" alt="QR Verification" class="qr-img" />
                <span class="qr-label">Scan Verifikasi</span>
              </div>
              <div class="sign-content">
                <div class="sign-script">Dr. Yulini Rinantanti</div>
                <div class="sign-line"></div>
                <div class="sign-name">Dr. Yulini Rinantanti, M. Ed.</div>
                <div class="sign-role">Research Lead & Author · ReadLocal Kids</div>
              </div>
            </div>

          </div>

          <!-- Footer Metadata -->
          <div class="meta-bar">
            <div>Date Issued: <span>${certDate}</span></div>
            <div>Official Digital Certificate · <span>Papua, Indonesia</span></div>
            <div>Verification Link: <span style="font-family:monospace;font-weight:bold;">readlocal-kids-nu.vercel.app</span></div>
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

  // Generate real QR code data URL
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

  useEffect(() => {
    const verifyUrl = `https://readlocal-kids-nu.vercel.app/verify/${certId}`;
    const qrContent = `ReadLocal Kids Official Certificate\nID: ${certId}\nRecipient: ${studentName}\nSignatory: Dr. Yulini Rinantanti, M. Ed.\nProgram: Papuan Reading Aloud\nVerification: ${verifyUrl}`;

    QRCode.toDataURL(qrContent, {
      width: 180,
      margin: 1,
      color: {
        dark: "#0F172A",
        light: "#FFFFFF",
      },
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error("QR Code Error:", err));
  }, [certId, studentName]);

  // 1. Direct browser print (uses CSS portal to bypass modal overflow containers)
  const handlePrint = () => {
    window.print();
  };

  // 2. Open clean standalone print page in new tab as guaranteed fallback
  const handleOpenInNewTab = async () => {
    let qr = qrCodeDataUrl;
    if (!qr) {
      try {
        const verifyUrl = `https://readlocal-kids-nu.vercel.app/verify/${certId}`;
        const qrContent = `ReadLocal Kids Official Certificate\nID: ${certId}\nRecipient: ${studentName}\nSignatory: Dr. Yulini Rinantanti, M. Ed.\nProgram: Papuan Reading Aloud\nVerification: ${verifyUrl}`;
        qr = await QRCode.toDataURL(qrContent, { width: 180, margin: 1 });
      } catch (e) {}
    }
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Browser memblokir pop-up. Izinkan pop-up untuk membuka sertifikat di tab baru.");
      return;
    }
    printWindow.document.open();
    printWindow.document.write(
      generatePrintHtml({
        studentName,
        certDate,
        certId,
        qrCodeDataUrl: qr || qrCodeDataUrl,
        badgeBase64: CERTIFICATE_BADGE_BASE64,
      })
    );
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
        <DialogContent className="w-full p-3 sm:p-5 overflow-hidden rounded-3xl">
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
          <div className="p-1 sm:p-2 max-h-[72vh] overflow-y-auto">
            <div
              id="certificate-preview-box"
              className="relative mx-auto w-full max-w-3xl rounded-2xl border-4 sm:border-6 border-amber-500 bg-[#FFFDF8] p-3 sm:p-6 text-center shadow-xl overflow-hidden"
            >
              <div className="relative z-10 rounded-xl border-2 border-dashed border-amber-300 p-3 sm:p-5 flex flex-col justify-between">
                
                {/* Header Row with Brand Logo & ID */}
                <div className="flex items-center justify-between pb-2 border-b border-amber-200/60">
                  <div className="flex items-center gap-2">
                    <Logo size={36} />
                  </div>
                  <div className="bg-amber-100/80 border border-amber-300 rounded-full px-3 py-0.5 text-[9px] sm:text-[10px] font-extrabold text-amber-900 uppercase tracking-wider">
                    ID: {certId}
                  </div>
                </div>

                {/* Title & Student Name */}
                <div className="mt-2">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 block">
                    READLOCAL KIDS · PAPUAN READING ALOUD PROGRAM
                  </span>

                  <h1 className="mt-1 font-heading text-xl sm:text-3xl font-extrabold tracking-wide text-slate-900 uppercase leading-tight">
                    Certificate of Accomplishment
                  </h1>

                  <p className="mt-0.5 text-xs font-semibold italic text-slate-500">
                    This certificate is proudly awarded to
                  </p>

                  <div className="my-2 sm:my-3">
                    <h2 className="font-heading text-2xl sm:text-4xl font-black text-amber-600 tracking-tight">
                      {studentName}
                    </h2>
                    <div className="mx-auto mt-1 h-0.5 sm:h-1 w-36 sm:w-48 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                  </div>

                  <p className="mx-auto max-w-xl text-[11px] sm:text-xs font-medium leading-relaxed text-slate-700">
                    For outstanding performance, dedication, and excellence in completing the{" "}
                    <span className="font-bold text-slate-900">Papuan Reading Aloud & Cultural Discovery Program</span>,
                    demonstrating mastery in English pronunciation, fluency, and local Papuan heritage storytelling.
                  </p>

                  {/* 3 Competency Highlight Cards */}
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-xl mx-auto text-left">
                    <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-2 flex items-start gap-2">
                      <span className="text-base">🎧</span>
                      <div>
                        <div className="text-[10px] font-bold text-amber-900">Pronunciation & Diction</div>
                        <div className="text-[8px] text-slate-500 leading-tight">Accurate phonetic articulation & stress.</div>
                      </div>
                    </div>
                    <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-2 flex items-start gap-2">
                      <span className="text-base">📖</span>
                      <div>
                        <div className="text-[10px] font-bold text-amber-900">Oral Reading Fluency</div>
                        <div className="text-[8px] text-slate-500 leading-tight">Expressive storytelling & reading aloud confidence.</div>
                      </div>
                    </div>
                    <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-2 flex items-start gap-2">
                      <span className="text-base">🏝️</span>
                      <div>
                        <div className="text-[10px] font-bold text-amber-900">Papuan Heritage Stories</div>
                        <div className="text-[8px] text-slate-500 leading-tight">Cultural literacy across 26 local folktales.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Validation Row: 3D Ribbon Badge (Left) + 1 Signatory with QR Code (Right) */}
                <div className="mt-4 pt-3 border-t border-amber-200/50 flex items-end justify-between px-2 sm:px-4">
                  
                  {/* Left: 3D Gold Ribbon Medal Badge */}
                  <div className="flex items-center gap-3 text-left">
                    <img
                      src={CERTIFICATE_BADGE_BASE64}
                      alt="3D Gold Medal Ribbon Badge"
                      className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-md"
                    />
                    <div>
                      <div className="font-heading text-xs sm:text-sm font-bold text-amber-900 uppercase">
                        Official Excellence Badge
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                        Verified Reading Aloud Achievement
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-amber-700 font-bold mt-0.5">
                        ReadLocal Kids Certified Learner
                      </div>
                    </div>
                  </div>

                  {/* Right: Single Signatory with QR Code */}
                  <div className="flex items-center gap-3 bg-amber-50/40 border border-amber-200/70 rounded-xl p-2 text-left">
                    <div className="flex flex-col items-center">
                      {qrCodeDataUrl ? (
                        <img
                          src={qrCodeDataUrl}
                          alt="QR Code Verification"
                          className="h-14 w-14 rounded border border-slate-300 bg-white p-0.5"
                        />
                      ) : (
                        <div className="h-14 w-14 bg-slate-100 animate-pulse rounded" />
                      )}
                      <span className="text-[7px] font-bold uppercase tracking-widest text-slate-500 mt-0.5">
                        Scan Verifikasi
                      </span>
                    </div>

                    <div className="border-l border-slate-200 pl-3">
                      <div className="font-serif italic text-sm sm:text-base font-bold text-slate-800">
                        Dr. Yulini Rinantanti
                      </div>
                      <div className="w-28 sm:w-36 h-[1.5px] bg-slate-400 my-1" />
                      <div className="text-[11px] sm:text-xs font-extrabold text-slate-900">
                        Dr. Yulini Rinantanti, M. Ed.
                      </div>
                      <div className="text-[8px] sm:text-[9px] text-slate-500 font-medium">
                        Research Lead & Author · ReadLocal Kids
                      </div>
                    </div>
                  </div>

                </div>

                {/* Metadata Footer */}
                <div className="mt-3 flex items-center justify-between border-t border-amber-200/60 pt-2 text-[8px] sm:text-[9px] text-slate-400 font-semibold">
                  <div>Date Issued: <span className="text-slate-600">{certDate}</span></div>
                  <div>Official Digital Credential · <span className="text-slate-600">Papua, Indonesia</span></div>
                  <div>Verification Link: <span className="text-slate-600 font-mono font-bold">readlocal-kids-nu.vercel.app</span></div>
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
              border: "6px solid #D97706",
              borderRadius: "20px",
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
              {/* Header Row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "2px",
                  borderBottom: "1px solid rgba(252, 211, 77, 0.4)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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

                <div
                  style={{
                    background: "#FEF3C7",
                    border: "1px solid #FCD34D",
                    borderRadius: "9999px",
                    padding: "3px 12px",
                    fontSize: "9px",
                    fontWeight: "800",
                    color: "#92400E",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  ID: {certId}
                </div>
              </div>

              {/* Title & Student Name */}
              <div>
                <span
                  style={{
                    fontSize: "9.5px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "2.5px",
                    color: "#B45309",
                    marginTop: "3px",
                    display: "block",
                  }}
                >
                  READLOCAL KIDS · PAPUAN READING ALOUD & CULTURAL DISCOVERY PROGRAM
                </span>

                <h1
                  style={{
                    fontFamily: "Fredoka, sans-serif",
                    fontSize: "27px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    color: "#0F172A",
                    marginTop: "2px",
                    lineHeight: "1.15",
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

                <div style={{ margin: "4px 0 2px 0" }}>
                  <div
                    style={{
                      fontFamily: "Fredoka, sans-serif",
                      fontSize: "38px",
                      fontWeight: "800",
                      color: "#D97706",
                      lineHeight: "1.1",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {studentName}
                  </div>
                  <div
                    style={{
                      width: "220px",
                      height: "3px",
                      borderRadius: "9999px",
                      background: "linear-gradient(to right, transparent, #F59E0B, transparent)",
                      margin: "4px auto 0 auto",
                    }}
                  />
                </div>

                <p
                  style={{
                    maxWidth: "680px",
                    margin: "4px auto 0 auto",
                    fontSize: "11.5px",
                    lineHeight: "1.45",
                    color: "#334155",
                    fontWeight: "500",
                  }}
                >
                  For outstanding performance, dedication, and excellence in completing the{" "}
                  <strong style={{ color: "#0F172A", fontWeight: "700" }}>Papuan Reading Aloud & Cultural Discovery Program</strong>,
                  demonstrating mastery in English pronunciation, fluency, and local Papuan heritage storytelling.
                </p>

                {/* 3 Competency Highlight Cards */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "12px",
                    maxWidth: "720px",
                    margin: "8px auto 4px auto",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      background: "#FFFDF9",
                      border: "1px solid #FDE68A",
                      borderRadius: "10px",
                      padding: "6px 10px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "16px", lineHeight: 1, marginTop: "2px" }}>🎧</span>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: "800", color: "#92400E", lineHeight: 1.2 }}>
                        Pronunciation & Diction
                      </div>
                      <div style={{ fontSize: "8px", color: "#64748B", lineHeight: 1.25, marginTop: "1px" }}>
                        Mastered clear phonetic sounds, intonation, and expressive word stress.
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      background: "#FFFDF9",
                      border: "1px solid #FDE68A",
                      borderRadius: "10px",
                      padding: "6px 10px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "16px", lineHeight: 1, marginTop: "2px" }}>📖</span>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: "800", color: "#92400E", lineHeight: 1.2 }}>
                        Oral Reading Fluency
                      </div>
                      <div style={{ fontSize: "8px", color: "#64748B", lineHeight: 1.25, marginTop: "1px" }}>
                        Achieved natural reading pacing, confidence, and expressive storytelling aloud.
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      background: "#FFFDF9",
                      border: "1px solid #FDE68A",
                      borderRadius: "10px",
                      padding: "6px 10px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "16px", lineHeight: 1, marginTop: "2px" }}>🏝️</span>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: "800", color: "#92400E", lineHeight: 1.2 }}>
                        Papuan Heritage Stories
                      </div>
                      <div style={{ fontSize: "8px", color: "#64748B", lineHeight: 1.25, marginTop: "1px" }}>
                        Explored 26 illustrated indigenous folktales and regional Papuan traditions.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Validation: Badge (Left) + Signatory with QR (Right) */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    marginTop: "6px",
                    padding: "0 10mm",
                  }}
                >
                  {/* Left: 3D Ribbon Badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}>
                    <img
                      src={CERTIFICATE_BADGE_BASE64}
                      alt="Excellence Badge"
                      style={{
                        width: "78px",
                        height: "78px",
                        objectFit: "contain",
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontFamily: "Fredoka, sans-serif",
                          fontSize: "11.5px",
                          fontWeight: "700",
                          color: "#B45309",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          lineHeight: 1.2,
                        }}
                      >
                        Official Excellence Badge
                      </div>
                      <div style={{ fontSize: "8.5px", color: "#64748B", fontWeight: "600", lineHeight: 1.2, marginTop: "1px" }}>
                        Verified Reading Aloud Achievement
                      </div>
                      <div style={{ fontSize: "8.5px", color: "#D97706", fontWeight: "700", lineHeight: 1.2, marginTop: "2px" }}>
                        ReadLocal Kids Certified Learner
                      </div>
                    </div>
                  </div>

                  {/* Right: Single Signatory + QR Code */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      background: "#FFFDF9",
                      border: "1px solid rgba(252, 211, 77, 0.6)",
                      borderRadius: "12px",
                      padding: "6px 12px",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                      <img
                        src={qrCodeDataUrl}
                        alt="QR Verification"
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "6px",
                          border: "1px solid #CBD5E1",
                          background: "#FFFFFF",
                          padding: "2px",
                        }}
                      />
                      <span style={{ fontSize: "7px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748B" }}>
                        Scan Verifikasi
                      </span>
                    </div>

                    <div style={{ borderLeft: "1px solid #E2E8F0", paddingLeft: "12px" }}>
                      <div
                        style={{
                          fontFamily: "Georgia, cursive",
                          fontStyle: "italic",
                          fontSize: "17px",
                          fontWeight: "700",
                          color: "#1E293B",
                          lineHeight: 1.1,
                          marginBottom: "2px",
                        }}
                      >
                        Dr. Yulini Rinantanti
                      </div>
                      <div style={{ width: "160px", height: "1.5px", background: "#94A3B8", margin: "2px 0 3px 0" }} />
                      <div style={{ fontSize: "12px", fontWeight: "800", color: "#0F172A", lineHeight: 1.2 }}>
                        Dr. Yulini Rinantanti, M. Ed.
                      </div>
                      <div style={{ fontSize: "9px", fontWeight: "600", color: "#475569", lineHeight: 1.2 }}>
                        Research Lead & Author · ReadLocal Kids
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Metadata */}
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
                  <div>Official Digital Certificate · <span style={{ color: "#475569" }}>Papua, Indonesia</span></div>
                  <div>Verification Link: <span style={{ color: "#475569", fontFamily: "monospace", fontWeight: "bold" }}>readlocal-kids-nu.vercel.app</span></div>
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
