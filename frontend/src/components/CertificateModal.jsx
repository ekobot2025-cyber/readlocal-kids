import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { CERTIFICATE_BADGE_BASE64 } from "./badgeBase64";
import { Printer, Award, ExternalLink, Sparkles } from "lucide-react";

/**
 * Papuan Motif SVG Assets & Patterns
 */
const PAPUA_TIFA_PATTERN_SVG = `
<svg width="100%" height="16" viewBox="0 0 600 16" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="papua-tifa-unit" width="40" height="16" patternUnits="userSpaceOnUse">
      <path d="M0 8 L10 0 L20 8 L10 16 Z" fill="#D97706" />
      <path d="M20 8 L30 0 L40 8 L30 16 Z" fill="#B45309" />
      <path d="M10 4 L16 8 L10 12 L4 8 Z" fill="#FEF3C7" />
      <path d="M30 4 L36 8 L30 12 L24 8 Z" fill="#FEF3C7" />
      <circle cx="10" cy="8" r="2" fill="#78350F" />
      <circle cx="30" cy="8" r="2" fill="#78350F" />
      <line x1="0" y1="1" x2="40" y2="1" stroke="#92400E" stroke-width="1.5" />
      <line x1="0" y1="15" x2="40" y2="15" stroke="#92400E" stroke-width="1.5" />
    </pattern>
  </defs>
  <rect width="100%" height="16" fill="url(#papua-tifa-unit)" />
</svg>
`;

/**
 * Generate a standalone, self-contained HTML string with authentic Papuan cultural aesthetic.
 */
function generatePrintHtml({ studentName, certDate, certId, qrCodeDataUrl, badgeBase64 }) {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <title>Sertifikat Resmi Budaya Papua - ${studentName}</title>
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
      padding: 6mm 8mm;
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
      padding: 4mm 6mm;
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
      border: 2.5px solid #B45309;
      border-radius: 14px;
      padding: 4mm 6mm;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      position: relative;
      background-color: #FFFDF9;
      background-image: radial-gradient(#FDE68A 0.75px, transparent 0.75px);
      background-size: 16px 16px;
    }

    /* Watermark Burung Cenderawasih di tengah */
    .cenderawasih-watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 320px;
      height: 320px;
      opacity: 0.045;
      pointer-events: none;
      z-index: 1;
    }

    .cert-content-layer {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Motif Pita Tifa Ukir Papua */
    .papua-motif-bar {
      width: 100%;
      height: 14px;
      display: block;
      margin: 2px 0;
    }

    /* Sudut Ukir Papua */
    .corner-motif {
      position: absolute;
      width: 32px;
      height: 32px;
      z-index: 3;
      pointer-events: none;
    }
    .corner-tl { top: 2px; left: 2px; }
    .corner-tr { top: 2px; right: 2px; transform: scaleX(-1); }
    .corner-bl { bottom: 2px; left: 2px; transform: scaleY(-1); }
    .corner-br { bottom: 2px; right: 2px; transform: scale(-1); }

    /* Header Row */
    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 4mm 2px 4mm;
    }
    .logo-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo-box {
      width: 40px;
      height: 40px;
      border-radius: 12px;
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
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #F59E0B;
      border: 2px solid #FFFFFF;
    }
    .logo-text-main {
      font-family: 'Fredoka', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: #1E293B;
      line-height: 1.1;
      text-align: left;
    }
    .logo-text-sub {
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #D97706;
    }
    .cert-badge-pill {
      background: linear-gradient(135deg, #FEF3C7, #FDE68A);
      border: 1.5px solid #F59E0B;
      border-radius: 9999px;
      padding: 4px 16px;
      font-size: 10px;
      font-weight: 800;
      color: #92400E;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      box-shadow: 0 2px 4px rgba(245, 158, 11, 0.15);
    }

    /* Program & Recipient */
    .program-tag {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #B45309;
      margin-top: 3px;
      display: block;
    }
    .cert-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 32px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #0F172A;
      margin-top: 2px;
      line-height: 1.15;
    }
    .award-to {
      font-size: 13.5px;
      font-style: italic;
      font-weight: 600;
      color: #64748B;
      margin-top: 2px;
    }
    .student-name-box {
      margin: 4px 0 3px 0;
    }
    .student-name {
      font-family: 'Fredoka', sans-serif;
      font-size: 46px;
      font-weight: 800;
      color: #D97706;
      line-height: 1.1;
      letter-spacing: -0.5px;
      text-shadow: 0 2px 4px rgba(217, 119, 6, 0.15);
    }
    .papua-divider-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin: 3px auto 0 auto;
      max-width: 380px;
    }
    .gold-divider-line {
      flex: 1;
      height: 2.5px;
      background: linear-gradient(to right, transparent, #F59E0B);
      border-radius: 9999px;
    }
    .gold-divider-line.right {
      background: linear-gradient(to left, transparent, #F59E0B);
    }
    .papua-center-accent {
      width: 14px;
      height: 14px;
      transform: rotate(45deg);
      background: #D97706;
      border: 2px solid #FEF3C7;
    }

    .citation-text {
      max-width: 740px;
      margin: 5px auto 0 auto;
      font-size: 13px;
      line-height: 1.5;
      color: #334155;
      font-weight: 500;
    }
    .citation-text strong {
      color: #0F172A;
      font-weight: 700;
    }

    /* 3 Competency Highlight Cards with Papuan Motifs */
    .competency-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      max-width: 780px;
      margin: 8px auto 4px auto;
      text-align: left;
    }
    .competency-card {
      background: #FFFFFF;
      border: 1.5px solid #FCD34D;
      border-radius: 12px;
      padding: 8px 12px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      box-shadow: 0 2px 6px rgba(217, 119, 6, 0.08);
      position: relative;
      overflow: hidden;
    }
    .competency-card::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(to bottom, #F59E0B, #B45309);
    }
    .competency-icon-circle {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: #FEF3C7;
      border: 1px solid #FDE68A;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      shrink: 0;
    }
    .competency-title {
      font-size: 12px;
      font-weight: 800;
      color: #92400E;
      line-height: 1.25;
    }
    .competency-desc {
      font-size: 9.5px;
      color: #475569;
      line-height: 1.35;
      margin-top: 2px;
    }

    /* Bottom Section: Left 3D Ribbon Badge, Right 1 Signatory + QR Code */
    .validation-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: 6px;
      padding: 0 8mm;
    }
    .badge-section {
      display: flex;
      align-items: center;
      gap: 14px;
      text-align: left;
      background: #FFFFFF;
      border: 1.5px solid #FDE68A;
      border-radius: 14px;
      padding: 6px 14px;
      box-shadow: 0 2px 6px rgba(217, 119, 6, 0.08);
    }
    .badge-img {
      width: 88px;
      height: 88px;
      object-fit: contain;
      filter: drop-shadow(0 4px 10px rgba(217, 119, 6, 0.35));
    }
    .badge-text-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 13.5px;
      font-weight: 700;
      color: #B45309;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      line-height: 1.2;
    }
    .badge-text-sub {
      font-size: 10px;
      color: #64748B;
      font-weight: 600;
      line-height: 1.25;
      margin-top: 2px;
    }

    /* Single Signatory + QR Code */
    .signatory-section {
      display: flex;
      align-items: center;
      gap: 14px;
      background: #FFFFFF;
      border: 1.5px solid #FDE68A;
      border-radius: 14px;
      padding: 6px 14px;
      text-align: left;
      box-shadow: 0 2px 6px rgba(217, 119, 6, 0.08);
    }
    .qr-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
    }
    .qr-img {
      width: 68px;
      height: 68px;
      border-radius: 6px;
      border: 1.5px solid #CBD5E1;
      background: #FFFFFF;
      padding: 2px;
    }
    .qr-label {
      font-size: 7.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #64748B;
    }
    .sign-content {
      border-left: 1.5px solid #E2E8F0;
      padding-left: 14px;
    }
    .sign-script {
      font-family: 'Playfair Display', Georgia, cursive;
      font-style: italic;
      font-size: 20px;
      font-weight: 700;
      color: #1E293B;
      line-height: 1.1;
      margin-bottom: 2px;
    }
    .sign-line {
      width: 180px;
      height: 2px;
      background: #94A3B8;
      margin: 2px 0 4px 0;
    }
    .sign-name {
      font-size: 13px;
      font-weight: 800;
      color: #0F172A;
      line-height: 1.2;
    }
    .sign-role {
      font-size: 10px;
      font-weight: 700;
      color: #B45309;
      line-height: 1.2;
      margin-top: 1px;
    }
    .sign-inst {
      font-size: 8.5px;
      font-weight: 600;
      color: #64748B;
      line-height: 1.2;
    }

    .meta-bar {
      border-top: 1px solid rgba(252, 211, 77, 0.8);
      margin-top: 4px;
      padding-top: 3px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 9.5px;
      font-weight: 600;
      color: #94A3B8;
      padding-left: 4mm;
      padding-right: 4mm;
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
        
        <!-- Sudut Ukir Tradisional Papua -->
        <svg class="corner-motif corner-tl" viewBox="0 0 40 40" fill="none">
          <path d="M0 0 L40 0 C25 5 15 15 10 30 L0 40 Z" fill="#D97706" />
          <path d="M4 4 L30 4 C20 8 12 16 8 26 L4 30 Z" fill="#FEF3C7" />
          <circle cx="12" cy="12" r="3" fill="#B45309" />
        </svg>
        <svg class="corner-motif corner-tr" viewBox="0 0 40 40" fill="none">
          <path d="M0 0 L40 0 C25 5 15 15 10 30 L0 40 Z" fill="#D97706" />
          <path d="M4 4 L30 4 C20 8 12 16 8 26 L4 30 Z" fill="#FEF3C7" />
          <circle cx="12" cy="12" r="3" fill="#B45309" />
        </svg>
        <svg class="corner-motif corner-bl" viewBox="0 0 40 40" fill="none">
          <path d="M0 0 L40 0 C25 5 15 15 10 30 L0 40 Z" fill="#D97706" />
          <path d="M4 4 L30 4 C20 8 12 16 8 26 L4 30 Z" fill="#FEF3C7" />
          <circle cx="12" cy="12" r="3" fill="#B45309" />
        </svg>
        <svg class="corner-motif corner-br" viewBox="0 0 40 40" fill="none">
          <path d="M0 0 L40 0 C25 5 15 15 10 30 L0 40 Z" fill="#D97706" />
          <path d="M4 4 L30 4 C20 8 12 16 8 26 L4 30 Z" fill="#FEF3C7" />
          <circle cx="12" cy="12" r="3" fill="#B45309" />
        </svg>

        <!-- Watermark Siluet Cenderawasih -->
        <svg class="cenderawasih-watermark" viewBox="0 0 100 100" fill="#B45309">
          <path d="M50 15 C55 25 70 30 85 28 C75 35 65 38 60 45 C75 50 85 65 80 80 C70 70 65 60 55 58 C50 70 45 85 30 90 C35 75 42 62 45 52 C35 55 25 52 15 45 C25 42 35 40 42 32 C40 25 45 18 50 15 Z" />
        </svg>

        <div class="cert-content-layer">
          
          <!-- 1. Header Row -->
          <div>
            <div class="header-row">
              <div class="logo-row">
                <div class="logo-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
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

            <!-- Motif Pita Tifa Papua Atas -->
            <div class="papua-motif-bar">
              ${PAPUA_TIFA_PATTERN_SVG}
            </div>
          </div>

          <!-- 2. Program Title & Recipient -->
          <div>
            <span class="program-tag">READLOCAL KIDS · PAPUAN READING ALOUD & CULTURAL DISCOVERY PROGRAM</span>
            <h1 class="cert-title">Certificate of Accomplishment</h1>
            <p class="award-to">This certificate is proudly awarded to</p>

            <div class="student-name-box">
              <div class="student-name">${studentName}</div>
              <div class="papua-divider-row">
                <div class="gold-divider-line"></div>
                <div class="papua-center-accent"></div>
                <div class="gold-divider-line right"></div>
              </div>
            </div>

            <p class="citation-text">
              For outstanding performance, dedication, and excellence in completing the
              <strong>Papuan Reading Aloud & Cultural Discovery Program</strong>,
              demonstrating mastery in English pronunciation, oral reading fluency, and cultural appreciation of local Papuan heritage storytelling.
            </p>

            <!-- 3. Key Competency Highlights with Papuan Aesthetic -->
            <div class="competency-grid">
              <div class="competency-card">
                <div class="competency-icon-circle">🎧</div>
                <div>
                  <div class="competency-title">Pronunciation & Diction</div>
                  <div class="competency-desc">Mastered clear phonetic sounds, intonation, and expressive word stress in English.</div>
                </div>
              </div>
              <div class="competency-card">
                <div class="competency-icon-circle">📖</div>
                <div>
                  <div class="competency-title">Oral Reading Fluency</div>
                  <div class="competency-desc">Achieved natural reading pacing, confidence, and expressive storytelling aloud.</div>
                </div>
              </div>
              <div class="competency-card">
                <div class="competency-icon-circle">🏝️</div>
                <div>
                  <div class="competency-title">Papuan Cultural Heritage</div>
                  <div class="competency-desc">Explored 26 illustrated indigenous folktales and regional Papuan traditions.</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. Bottom Validation Section: Badge (Left) + 1 Signatory with QR (Right) -->
          <div>
            <!-- Motif Pita Tifa Papua Bawah -->
            <div class="papua-motif-bar">
              ${PAPUA_TIFA_PATTERN_SVG}
            </div>

            <div class="validation-row">
              
              <!-- Left: 3D Ribbon Badge -->
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
                  <div class="sign-inst">Universitas Cenderawasih · Program Literasi Papua</div>
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
      width: 200,
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
        qr = await QRCode.toDataURL(qrContent, { width: 200, margin: 1 });
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
                <h3 className="font-heading text-lg font-bold text-slate-800">Pratinjau Sertifikat Resmi (Motif Papua)</h3>
                <p className="text-[11px] text-slate-500">Sertifikat kelulusan membaca dengan ornamen khas budaya Papua.</p>
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
              <strong>Tips Cetak:</strong> Pilih orientasi <strong>Landscape (Mendatar)</strong> dan atur <strong>Margins: None / Default</strong> di jendela cetak browser.
            </span>
          </div>

          {/* Visual Certificate Preview Card */}
          <div className="p-1 sm:p-2 max-h-[72vh] overflow-y-auto">
            <div
              id="certificate-preview-box"
              className="relative mx-auto w-full max-w-3xl rounded-2xl border-4 sm:border-6 border-amber-600 bg-[#FFFDF8] p-3 sm:p-5 text-center shadow-xl overflow-hidden"
            >
              <div className="relative z-10 rounded-xl border-2 border-amber-700 p-3 sm:p-5 flex flex-col justify-between bg-[#FFFDF9]">
                
                {/* Header Row */}
                <div className="flex items-center justify-between pb-2 border-b border-amber-200/60">
                  <div className="flex items-center gap-2">
                    <Logo size={36} />
                  </div>
                  <div className="bg-amber-100/90 border border-amber-300 rounded-full px-3 py-0.5 text-[9px] sm:text-[10px] font-extrabold text-amber-900 uppercase tracking-wider">
                    ID: {certId}
                  </div>
                </div>

                {/* Motif Pita Papua Preview */}
                <div className="my-1.5 h-2.5 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 rounded-full opacity-80" />

                {/* Title & Student Name */}
                <div className="mt-1">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-amber-800 block">
                    READLOCAL KIDS · PAPUAN READING ALOUD & CULTURAL DISCOVERY PROGRAM
                  </span>

                  <h1 className="mt-1 font-heading text-xl sm:text-3xl font-extrabold tracking-wide text-slate-900 uppercase leading-tight">
                    Certificate of Accomplishment
                  </h1>

                  <p className="mt-0.5 text-xs font-semibold italic text-slate-500">
                    This certificate is proudly awarded to
                  </p>

                  <div className="my-2 sm:my-3">
                    <h2 className="font-heading text-2xl sm:text-4xl font-black text-amber-600 tracking-tight drop-shadow-sm">
                      {studentName}
                    </h2>
                    <div className="mx-auto mt-1 flex items-center justify-center gap-2 max-w-xs">
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-amber-400 to-amber-500" />
                      <div className="w-2.5 h-2.5 rotate-45 bg-amber-600 border border-amber-200" />
                      <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent via-amber-400 to-amber-500" />
                    </div>
                  </div>

                  <p className="mx-auto max-w-xl text-[11px] sm:text-xs font-medium leading-relaxed text-slate-700">
                    For outstanding performance, dedication, and excellence in completing the{" "}
                    <span className="font-bold text-slate-900">Papuan Reading Aloud & Cultural Discovery Program</span>,
                    demonstrating mastery in English pronunciation, fluency, and local Papuan heritage storytelling.
                  </p>

                  {/* 3 Competency Highlight Cards */}
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-xl mx-auto text-left">
                    <div className="bg-white border-l-4 border-l-amber-500 border border-amber-200 rounded-lg p-2 shadow-xs">
                      <div className="text-[10px] font-bold text-amber-900 flex items-center gap-1">
                        <span>🎧</span> Pronunciation & Diction
                      </div>
                      <div className="text-[8px] text-slate-500 leading-tight mt-0.5">Accurate phonetic articulation & stress.</div>
                    </div>
                    <div className="bg-white border-l-4 border-l-amber-500 border border-amber-200 rounded-lg p-2 shadow-xs">
                      <div className="text-[10px] font-bold text-amber-900 flex items-center gap-1">
                        <span>📖</span> Oral Reading Fluency
                      </div>
                      <div className="text-[8px] text-slate-500 leading-tight mt-0.5">Expressive storytelling & reading aloud confidence.</div>
                    </div>
                    <div className="bg-white border-l-4 border-l-amber-500 border border-amber-200 rounded-lg p-2 shadow-xs">
                      <div className="text-[10px] font-bold text-amber-900 flex items-center gap-1">
                        <span>🏝️</span> Papuan Heritage Stories
                      </div>
                      <div className="text-[8px] text-slate-500 leading-tight mt-0.5">Cultural literacy across 26 local folktales.</div>
                    </div>
                  </div>
                </div>

                {/* Validation Row */}
                <div className="mt-4 pt-2 border-t border-amber-200/50 flex items-end justify-between px-2 sm:px-4">
                  
                  {/* Left: 3D Badge */}
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
                  <div className="flex items-center gap-3 bg-white border border-amber-200 rounded-xl p-2 text-left shadow-xs">
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
                      <div className="text-[8.5px] sm:text-[9.5px] text-amber-800 font-bold">
                        Research Lead & Author · ReadLocal Kids
                      </div>
                      <div className="text-[7.5px] text-slate-500">
                        Universitas Cenderawasih · Program Literasi Papua
                      </div>
                    </div>
                  </div>

                </div>

                {/* Metadata Footer */}
                <div className="mt-3 flex items-center justify-between border-t border-amber-200/60 pt-1.5 text-[8px] sm:text-[9px] text-slate-400 font-semibold">
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
              padding: "4mm 6mm",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "#FFFDF8",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                border: "2.5px solid #B45309",
                borderRadius: "14px",
                padding: "4mm 6mm",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "center",
                position: "relative",
                backgroundColor: "#FFFDF9",
              }}
            >
              {/* Sudut Ukir Tradisional Papua */}
              <svg style={{ position: "absolute", top: "2px", left: "2px", width: "32px", height: "32px", zIndex: 3, pointerEvents: "none" }} viewBox="0 0 40 40" fill="none">
                <path d="M0 0 L40 0 C25 5 15 15 10 30 L0 40 Z" fill="#D97706" />
                <path d="M4 4 L30 4 C20 8 12 16 8 26 L4 30 Z" fill="#FEF3C7" />
                <circle cx="12" cy="12" r="3" fill="#B45309" />
              </svg>
              <svg style={{ position: "absolute", top: "2px", right: "2px", width: "32px", height: "32px", transform: "scaleX(-1)", zIndex: 3, pointerEvents: "none" }} viewBox="0 0 40 40" fill="none">
                <path d="M0 0 L40 0 C25 5 15 15 10 30 L0 40 Z" fill="#D97706" />
                <path d="M4 4 L30 4 C20 8 12 16 8 26 L4 30 Z" fill="#FEF3C7" />
                <circle cx="12" cy="12" r="3" fill="#B45309" />
              </svg>
              <svg style={{ position: "absolute", bottom: "2px", left: "2px", width: "32px", height: "32px", transform: "scaleY(-1)", zIndex: 3, pointerEvents: "none" }} viewBox="0 0 40 40" fill="none">
                <path d="M0 0 L40 0 C25 5 15 15 10 30 L0 40 Z" fill="#D97706" />
                <path d="M4 4 L30 4 C20 8 12 16 8 26 L4 30 Z" fill="#FEF3C7" />
                <circle cx="12" cy="12" r="3" fill="#B45309" />
              </svg>
              <svg style={{ position: "absolute", bottom: "2px", right: "2px", width: "32px", height: "32px", transform: "scale(-1)", zIndex: 3, pointerEvents: "none" }} viewBox="0 0 40 40" fill="none">
                <path d="M0 0 L40 0 C25 5 15 15 10 30 L0 40 Z" fill="#D97706" />
                <path d="M4 4 L30 4 C20 8 12 16 8 26 L4 30 Z" fill="#FEF3C7" />
                <circle cx="12" cy="12" r="3" fill="#B45309" />
              </svg>

              {/* Watermark Burung Cenderawasih di Tengah */}
              <svg style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "320px", height: "320px", opacity: "0.045", pointerEvents: "none", zIndex: 1 }} viewBox="0 0 100 100" fill="#B45309">
                <path d="M50 15 C55 25 70 30 85 28 C75 35 65 38 60 45 C75 50 85 65 80 80 C70 70 65 60 55 58 C50 70 45 85 30 90 C35 75 42 62 45 52 C35 55 25 52 15 45 C25 42 35 40 42 32 C40 25 45 18 50 15 Z" />
              </svg>

              <div style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                
                {/* 1. Header Row */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0 4mm 2px 4mm",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "12px",
                          background: "linear-gradient(135deg, #F0F9FF, #E0F2FE)",
                          border: "1.5px solid #BAE6FD",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#0284C7",
                          position: "relative",
                        }}
                      >
                        <Award style={{ width: "24px", height: "24px", color: "#0284C7" }} />
                        <div
                          style={{
                            position: "absolute",
                            top: "-3px",
                            right: "-3px",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "#F59E0B",
                            border: "2px solid #FFFFFF",
                          }}
                        />
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontFamily: "Fredoka, sans-serif", fontSize: "20px", fontWeight: "700", color: "#1E293B", lineHeight: "1.1" }}>
                          ReadLocal <span style={{ color: "#0EA5E9" }}>Kids</span>
                        </div>
                        <div style={{ fontSize: "9px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.5px", color: "#D97706" }}>
                          Read English · Discover Culture
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
                        border: "1.5px solid #F59E0B",
                        borderRadius: "9999px",
                        padding: "4px 16px",
                        fontSize: "10px",
                        fontWeight: "800",
                        color: "#92400E",
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                      }}
                    >
                      ID: {certId}
                    </div>
                  </div>

                  {/* Motif Pita Tifa Ukir Papua Atas */}
                  <div
                    style={{
                      width: "100%",
                      height: "14px",
                      margin: "2px 0",
                    }}
                    dangerouslySetInnerHTML={{ __html: PAPUA_TIFA_PATTERN_SVG }}
                  />
                </div>

                {/* 2. Program Title & Recipient */}
                <div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "800",
                      textTransform: "uppercase",
                      letterSpacing: "3px",
                      color: "#B45309",
                      marginTop: "2px",
                      display: "block",
                    }}
                  >
                    READLOCAL KIDS · PAPUAN READING ALOUD & CULTURAL DISCOVERY PROGRAM
                  </span>

                  <h1
                    style={{
                      fontFamily: "Fredoka, sans-serif",
                      fontSize: "32px",
                      fontWeight: "800",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      color: "#0F172A",
                      marginTop: "2px",
                      lineHeight: "1.15",
                    }}
                  >
                    Certificate of Accomplishment
                  </h1>

                  <p
                    style={{
                      fontSize: "13.5px",
                      fontStyle: "italic",
                      fontWeight: "600",
                      color: "#64748B",
                      marginTop: "2px",
                    }}
                  >
                    This certificate is proudly awarded to
                  </p>

                  <div style={{ margin: "4px 0 3px 0" }}>
                    <div
                      style={{
                        fontFamily: "Fredoka, sans-serif",
                        fontSize: "46px",
                        fontWeight: "800",
                        color: "#D97706",
                        lineHeight: "1.1",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {studentName}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", margin: "3px auto 0 auto", maxWidth: "380px" }}>
                      <div style={{ flex: 1, height: "2.5px", background: "linear-gradient(to right, transparent, #F59E0B)", borderRadius: "9999px" }} />
                      <div style={{ width: "14px", height: "14px", transform: "rotate(45deg)", background: "#D97706", border: "2px solid #FEF3C7" }} />
                      <div style={{ flex: 1, height: "2.5px", background: "linear-gradient(to left, transparent, #F59E0B)", borderRadius: "9999px" }} />
                    </div>
                  </div>

                  <p
                    style={{
                      maxWidth: "740px",
                      margin: "5px auto 0 auto",
                      fontSize: "13px",
                      lineHeight: "1.5",
                      color: "#334155",
                      fontWeight: "500",
                    }}
                  >
                    For outstanding performance, dedication, and excellence in completing the{" "}
                    <strong style={{ color: "#0F172A", fontWeight: "700" }}>Papuan Reading Aloud & Cultural Discovery Program</strong>,
                    demonstrating mastery in English pronunciation, oral reading fluency, and cultural appreciation of local Papuan heritage storytelling.
                  </p>

                  {/* 3 Competency Highlight Cards */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "14px",
                      maxWidth: "780px",
                      margin: "8px auto 4px auto",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        background: "#FFFFFF",
                        border: "1.5px solid #FCD34D",
                        borderLeft: "4px solid #F59E0B",
                        borderRadius: "12px",
                        padding: "8px 12px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        boxShadow: "0 2px 6px rgba(217, 119, 6, 0.08)",
                      }}
                    >
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#FEF3C7", border: "1px solid #FDE68A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>
                        🎧
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: "800", color: "#92400E", lineHeight: "1.25" }}>
                          Pronunciation & Diction
                        </div>
                        <div style={{ fontSize: "9.5px", color: "#475569", lineHeight: "1.35", marginTop: "2px" }}>
                          Mastered clear phonetic sounds, intonation, and expressive word stress.
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        background: "#FFFFFF",
                        border: "1.5px solid #FCD34D",
                        borderLeft: "4px solid #F59E0B",
                        borderRadius: "12px",
                        padding: "8px 12px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        boxShadow: "0 2px 6px rgba(217, 119, 6, 0.08)",
                      }}
                    >
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#FEF3C7", border: "1px solid #FDE68A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>
                        📖
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: "800", color: "#92400E", lineHeight: "1.25" }}>
                          Oral Reading Fluency
                        </div>
                        <div style={{ fontSize: "9.5px", color: "#475569", lineHeight: "1.35", marginTop: "2px" }}>
                          Achieved natural reading pacing, confidence, and expressive storytelling aloud.
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        background: "#FFFFFF",
                        border: "1.5px solid #FCD34D",
                        borderLeft: "4px solid #F59E0B",
                        borderRadius: "12px",
                        padding: "8px 12px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        boxShadow: "0 2px 6px rgba(217, 119, 6, 0.08)",
                      }}
                    >
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#FEF3C7", border: "1px solid #FDE68A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>
                        🏝️
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: "800", color: "#92400E", lineHeight: "1.25" }}>
                          Papuan Cultural Heritage
                        </div>
                        <div style={{ fontSize: "9.5px", color: "#475569", lineHeight: "1.35", marginTop: "2px" }}>
                          Explored 26 illustrated indigenous folktales and regional Papuan traditions.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Bottom Validation: 3D Badge (Left) + Signatory with QR (Right) */}
                <div>
                  {/* Motif Pita Tifa Papua Bawah */}
                  <div
                    style={{
                      width: "100%",
                      height: "14px",
                      margin: "2px 0",
                    }}
                    dangerouslySetInnerHTML={{ __html: PAPUA_TIFA_PATTERN_SVG }}
                  />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      marginTop: "6px",
                      padding: "0 8mm",
                    }}
                  >
                    {/* Left: 3D Ribbon Badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", textAlign: "left", background: "#FFFFFF", border: "1.5px solid #FDE68A", borderRadius: "14px", padding: "6px 14px", boxShadow: "0 2px 6px rgba(217, 119, 6, 0.08)" }}>
                      <img
                        src={CERTIFICATE_BADGE_BASE64}
                        alt="Excellence Badge"
                        style={{
                          width: "88px",
                          height: "88px",
                          objectFit: "contain",
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontFamily: "Fredoka, sans-serif",
                            fontSize: "13.5px",
                            fontWeight: "700",
                            color: "#B45309",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            lineHeight: "1.2",
                          }}
                        >
                          Official Excellence Badge
                        </div>
                        <div style={{ fontSize: "10px", color: "#64748B", fontWeight: "600", lineHeight: "1.25", marginTop: "2px" }}>
                          Verified Reading Aloud Achievement
                        </div>
                        <div style={{ fontSize: "10px", color: "#D97706", fontWeight: "700", lineHeight: "1.25", marginTop: "2px" }}>
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
                        background: "#FFFFFF",
                        border: "1.5px solid #FDE68A",
                        borderRadius: "14px",
                        padding: "6px 14px",
                        textAlign: "left",
                        boxShadow: "0 2px 6px rgba(217, 119, 6, 0.08)",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <img
                          src={qrCodeDataUrl}
                          alt="QR Verification"
                          style={{
                            width: "68px",
                            height: "68px",
                            borderRadius: "6px",
                            border: "1.5px solid #CBD5E1",
                            background: "#FFFFFF",
                            padding: "2px",
                          }}
                        />
                        <span style={{ fontSize: "7.5px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.8px", color: "#64748B" }}>
                          Scan Verifikasi
                        </span>
                      </div>

                      <div style={{ borderLeft: "1.5px solid #E2E8F0", paddingLeft: "14px" }}>
                        <div
                          style={{
                            fontFamily: "Georgia, cursive",
                            fontStyle: "italic",
                            fontSize: "20px",
                            fontWeight: "700",
                            color: "#1E293B",
                            lineHeight: "1.1",
                            marginBottom: "2px",
                          }}
                        >
                          Dr. Yulini Rinantanti
                        </div>
                        <div style={{ width: "180px", height: "2px", background: "#94A3B8", margin: "2px 0 4px 0" }} />
                        <div style={{ fontSize: "13px", fontWeight: "800", color: "#0F172A", lineHeight: "1.2" }}>
                          Dr. Yulini Rinantanti, M. Ed.
                        </div>
                        <div style={{ fontSize: "10px", fontWeight: "700", color: "#B45309", lineHeight: "1.2", marginTop: "1px" }}>
                          Research Lead & Author · ReadLocal Kids
                        </div>
                        <div style={{ fontSize: "8.5px", fontWeight: "600", color: "#64748B", lineHeight: "1.2" }}>
                          Universitas Cenderawasih · Program Literasi Papua
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Metadata */}
                  <div
                    style={{
                      borderTop: "1px solid rgba(252, 211, 77, 0.8)",
                      marginTop: "4px",
                      paddingTop: "3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "9.5px",
                      fontWeight: "600",
                      color: "#94A3B8",
                      paddingLeft: "4mm",
                      paddingRight: "4mm",
                    }}
                  >
                    <div>Date Issued: <span style={{ color: "#475569" }}>{certDate}</span></div>
                    <div>Official Digital Certificate · <span style={{ color: "#475569" }}>Papua, Indonesia</span></div>
                    <div>Verification Link: <span style={{ color: "#475569", fontFamily: "monospace", fontWeight: "bold" }}>readlocal-kids-nu.vercel.app</span></div>
                  </div>
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
