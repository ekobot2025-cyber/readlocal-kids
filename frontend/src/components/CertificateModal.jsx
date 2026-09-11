import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CERTIFICATE_BG_BASE64 } from "./certificateBgBase64";
import { Printer, Award, ExternalLink, Sparkles } from "lucide-react";

/**
 * Generate a standalone, self-contained HTML string with the custom Papuan illustrated background.
 * Perfectly calibrated for A4 Landscape (297mm x 210mm).
 */
function generatePrintHtml({ studentName, certDate, certId, qrCodeDataUrl, bgBase64 }) {
  const logoIconSvg = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>`;

  const badgeIconSvg = `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>`;

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
      font-family: 'Nunito', system-ui, -apple-system, sans-serif;
      overflow: hidden;
      background-color: #FFFFFF;
      -webkit-font-smoothing: antialiased;
    }
    .cert-page {
      width: 297mm;
      height: 210mm;
      position: relative;
      background-image: url('${bgBase64}');
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      overflow: hidden;
      box-sizing: border-box;
    }
    
    /* Top-Left Official Application Logo - Exactly matches app branding */
    .app-logo-topleft {
      position: absolute;
      top: 5%;
      left: 6%;
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 10;
    }
    .app-logo-box {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
      border: 1.8px solid #BAE6FD;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.15);
    }
    .app-logo-dot {
      position: absolute;
      top: -3px;
      right: -3px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #F59E0B;
      border: 2.2px solid #FFFFFF;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    }
    .app-logo-text-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 22px;
      font-weight: 800;
      color: #0F172A;
      line-height: 1.1;
      letter-spacing: -0.3px;
    }
    .app-logo-text-title span {
      color: #0EA5E9;
    }
    .app-logo-text-sub {
      font-size: 9.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #D97706;
      margin-top: 1.5px;
    }

    /* Main Certificate Content - Full page layout, no excessive empty spaces */
    .cert-content {
      position: absolute;
      top: 23.5%;
      bottom: 7%;
      left: 26%;
      right: 14%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
    }
    
    .cert-header-block {
      margin-bottom: 2px;
    }
    .cert-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 32px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #0F172A;
      margin: 0;
      line-height: 1.1;
    }
    .program-tag {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      color: #B45309;
      margin-top: 2px;
      display: block;
    }
    .award-to {
      font-size: 13.5px;
      font-style: italic;
      font-weight: 600;
      color: #64748B;
      margin-top: 2px;
    }
    .student-name {
      font-family: 'Fredoka', sans-serif;
      font-size: 46px;
      font-weight: 800;
      color: #D97706;
      line-height: 1.1;
      letter-spacing: -0.5px;
      margin-top: 3px;
      text-shadow: 0 2px 6px rgba(217, 119, 6, 0.2);
    }
    .papua-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin: 4px auto 0 auto;
      max-width: 420px;
    }
    .papua-divider-line {
      flex: 1;
      height: 2.5px;
      background: linear-gradient(to right, transparent, #F59E0B);
      border-radius: 9999px;
    }
    .papua-divider-line.right {
      background: linear-gradient(to left, transparent, #F59E0B);
    }
    .papua-diamond {
      width: 11px;
      height: 11px;
      transform: rotate(45deg);
      background: #D97706;
      border: 2px solid #FEF3C7;
    }

    /* Full-width Citation */
    .citation-text {
      width: 100%;
      margin: 6px auto 0 auto;
      font-size: 12.8px;
      line-height: 1.55;
      color: #334155;
      font-weight: 500;
    }
    .citation-text strong {
      color: #0F172A;
      font-weight: 700;
    }

    /* 3 Competency Cards - Expands to fill width gracefully */
    .competency-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      width: 100%;
      margin: 8px auto 0 auto;
    }
    .competency-card {
      background: rgba(255, 255, 255, 0.96);
      border: 1.5px solid #FCD34D;
      border-left: 4px solid #F59E0B;
      border-radius: 10px;
      padding: 8px 12px;
      display: flex;
      align-items: flex-start;
      gap: 9px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
    }
    .competency-icon {
      font-size: 19px;
      line-height: 1;
      padding-top: 2px;
    }
    .competency-title {
      font-size: 11.5px;
      font-weight: 800;
      color: #92400E;
      line-height: 1.25;
    }
    .competency-desc {
      font-size: 9px;
      color: #475569;
      line-height: 1.35;
      margin-top: 2px;
    }

    /* Bottom Validation: Frameless / No Box */
    .validation-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 8px;
      width: 100%;
    }
    
    /* Left: Official App Icon Badge (Larger, No Box) */
    .app-badge-section {
      display: flex;
      align-items: center;
      gap: 14px;
      text-align: left;
    }
    .app-badge-icon-box {
      width: 66px;
      height: 66px;
      border-radius: 18px;
      background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
      border: 2.2px solid #BAE6FD;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.22);
    }
    .app-badge-icon-dot {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #F59E0B;
      border: 3px solid #FFFFFF;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
    }
    .app-badge-text-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 13.5px;
      font-weight: 700;
      color: #B45309;
      text-transform: uppercase;
      line-height: 1.15;
    }
    .app-badge-text-sub {
      font-size: 9.5px;
      color: #475569;
      font-weight: 600;
      line-height: 1.3;
      margin-top: 2px;
    }
    .app-badge-text-certified {
      font-size: 9.5px;
      color: #D97706;
      font-weight: 800;
      line-height: 1.3;
      margin-top: 1.5px;
    }

    /* Right: Signatory + QR Code (Frameless / No Box) */
    .signatory-section {
      display: flex;
      align-items: center;
      gap: 14px;
      text-align: left;
    }
    .qr-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }
    .qr-img {
      width: 52px;
      height: 52px;
      border-radius: 6px;
      border: 1.5px solid #CBD5E1;
      background: #FFFFFF;
      padding: 1px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
    }
    .qr-label {
      font-size: 7px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748B;
    }
    .sign-content {
      border-left: 1.5px solid #CBD5E1;
      padding-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .sign-name {
      font-size: 13px;
      font-weight: 800;
      color: #0F172A;
      line-height: 1.2;
    }
    .sign-role {
      font-size: 9.5px;
      font-weight: 700;
      color: #B45309;
      line-height: 1.25;
      margin-top: 2px;
    }
    .sign-inst {
      font-size: 8.5px;
      font-weight: 600;
      color: #64748B;
      line-height: 1.25;
      margin-top: 1px;
    }

    /* Footer Bar */
    .footer-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1.5px solid rgba(245, 158, 11, 0.35);
      padding-top: 4px;
      font-size: 9px;
      font-weight: 700;
      color: #475569;
      margin-top: 4px;
    }
    .footer-bar span {
      color: #0F172A;
    }
  </style>
</head>
<body>
  <div class="cert-page">
    <!-- Top-Left Official Application Logo -->
    <div class="app-logo-topleft">
      <div class="app-logo-box">
        ${logoIconSvg}
        <div class="app-logo-dot"></div>
      </div>
      <div>
        <div class="app-logo-text-title">ReadLocal <span>Kids</span></div>
        <div class="app-logo-text-sub">READ ENGLISH · DISCOVER CULTURE</div>
      </div>
    </div>

    <!-- Main Certificate Content (Full page layout) -->
    <div class="cert-content">
      <div class="cert-header-block">
        <h1 class="cert-title">Certificate of Accomplishment</h1>
        <span class="program-tag">Papuan Reading Aloud & Cultural Discovery Program</span>
        <p class="award-to">This certificate is proudly awarded to</p>
        <div class="student-name">${studentName}</div>
        <div class="papua-divider">
          <div class="papua-divider-line"></div>
          <div class="papua-diamond"></div>
          <div class="papua-divider-line right"></div>
        </div>
      </div>

      <p class="citation-text">
        For outstanding performance, dedication, and oral reading fluency in completing the
        <strong>Papuan Reading Aloud & Cultural Discovery Program</strong>,
        demonstrating mastery in English pronunciation and deep appreciation for local Papuan heritage storytelling.
      </p>

      <div class="competency-grid">
        <div class="competency-card">
          <div class="competency-icon">🎧</div>
          <div>
            <div class="competency-title">Pronunciation & Diction</div>
            <div class="competency-desc">Mastered clear phonetic articulation & stress.</div>
          </div>
        </div>
        <div class="competency-card">
          <div class="competency-icon">📖</div>
          <div>
            <div class="competency-title">Oral Reading Fluency</div>
            <div class="competency-desc">Achieved expressive reading aloud confidence.</div>
          </div>
        </div>
        <div class="competency-card">
          <div class="competency-icon">🏝️</div>
          <div>
            <div class="competency-title">Papuan Heritage Stories</div>
            <div class="competency-desc">Explored 26 regional folktales & traditions.</div>
          </div>
        </div>
      </div>

      <!-- Bottom Validation: Frameless / No Box -->
      <div class="validation-row">
        <!-- Left: ReadLocal Kids App Icon Badge (Larger, No Box) -->
        <div class="app-badge-section">
          <div class="app-badge-icon-box">
            ${badgeIconSvg}
            <div class="app-badge-icon-dot"></div>
          </div>
          <div>
            <div class="app-badge-text-title">Official ReadLocal Kids Badge</div>
            <div class="app-badge-text-sub">Verified Reading Aloud Achievement</div>
            <div class="app-badge-text-certified">ReadLocal Kids Certified Learner</div>
          </div>
        </div>

        <!-- Right: Signatory + QR Code (Frameless / No Box) -->
        <div class="signatory-section">
          <div class="qr-box">
            <img src="${qrCodeDataUrl}" alt="QR Verification" class="qr-img" />
            <span class="qr-label">Scan Verifikasi</span>
          </div>
          <div class="sign-content">
            <div class="sign-name">Dr. Yulini Rinantanti, M. Ed.</div>
            <div class="sign-role">Research Lead & Author · ReadLocal Kids</div>
            <div class="sign-inst">Universitas Cenderawasih · Program Literasi Papua</div>
          </div>
        </div>
      </div>

      <div class="footer-bar">
        <div>Date Issued: <span>${certDate}</span></div>
        <div>Credential ID: <span style="font-family:monospace;font-weight:bold;color:#B45309;">${certId}</span></div>
        <div>Verification: <span style="font-family:monospace;font-weight:bold;">readlocal-kids-nu.vercel.app</span></div>
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

  // 1. Direct browser print
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
        bgBase64: CERTIFICATE_BG_BASE64,
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
        <DialogContent className="w-full p-3 sm:p-5 overflow-hidden rounded-3xl max-w-4xl">
          {/* Modal Header & Actions */}
          <div data-print-hide="true" className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 sm:px-4 pt-1 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500 shrink-0" />
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-800">Pratinjau Sertifikat Resmi (Papua Edition)</h3>
                <p className="text-[11px] text-slate-500">Sertifikat kelulusan membaca berlatar ilustrasi budaya Papua resmi.</p>
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
          <div className="p-1 sm:p-2 max-h-[74vh] overflow-y-auto overflow-x-auto">
            <div
              id="certificate-preview-box"
              className="relative mx-auto w-full min-w-[680px] max-w-4xl aspect-[1024/724] rounded-2xl border-2 border-amber-400/60 text-center shadow-2xl overflow-hidden select-none"
              style={{
                backgroundImage: `url(${CERTIFICATE_BG_BASE64})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Top-Left Official Application Logo */}
              <div
                style={{
                  position: "absolute",
                  top: "5%",
                  left: "6%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
                    border: "1.8px solid #BAE6FD",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    boxShadow: "0 2px 8px rgba(2, 132, 199, 0.15)",
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      top: "-3px",
                      right: "-3px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "#F59E0B",
                      border: "2.2px solid #FFFFFF",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
                    }}
                  />
                </div>
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: "22px",
                      fontWeight: 800,
                      color: "#0F172A",
                      lineHeight: 1.1,
                      letterSpacing: "-0.3px",
                    }}
                  >
                    ReadLocal <span style={{ color: "#0EA5E9" }}>Kids</span>
                  </div>
                  <div
                    style={{
                      fontSize: "9.5px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      color: "#D97706",
                      marginTop: "1.5px",
                    }}
                  >
                    READ ENGLISH · DISCOVER CULTURE
                  </div>
                </div>
              </div>

              {/* Main Certificate Content - Full page layout */}
              <div
                style={{
                  position: "absolute",
                  top: "23.5%",
                  bottom: "7%",
                  left: "26%",
                  right: "14%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                {/* 1. Header & Recipient */}
                <div style={{ marginBottom: "2px" }}>
                  <h1
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: "32px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      color: "#0F172A",
                      lineHeight: 1.1,
                      margin: 0,
                    }}
                  >
                    Certificate of Accomplishment
                  </h1>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "2.5px",
                      color: "#B45309",
                      marginTop: "2px",
                      display: "block",
                    }}
                  >
                    Papuan Reading Aloud & Cultural Discovery Program
                  </span>
                  <p
                    style={{
                      fontSize: "13.5px",
                      fontStyle: "italic",
                      fontWeight: 600,
                      color: "#64748B",
                      marginTop: "2px",
                    }}
                  >
                    This certificate is proudly awarded to
                  </p>

                  <div
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: "46px",
                      fontWeight: 800,
                      color: "#D97706",
                      lineHeight: 1.1,
                      letterSpacing: "-0.5px",
                      marginTop: "3px",
                      textShadow: "0 2px 6px rgba(217, 119, 6, 0.2)",
                    }}
                  >
                    {studentName}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      margin: "4px auto 0 auto",
                      maxWidth: "420px",
                    }}
                  >
                    <div style={{ flex: 1, height: "2.5px", background: "linear-gradient(to right, transparent, #F59E0B)", borderRadius: "9999px" }} />
                    <div style={{ width: "11px", height: "11px", transform: "rotate(45deg)", background: "#D97706", border: "2px solid #FEF3C7" }} />
                    <div style={{ flex: 1, height: "2.5px", background: "linear-gradient(to left, transparent, #F59E0B)", borderRadius: "9999px" }} />
                  </div>
                </div>

                {/* 2. Full-width Citation Text */}
                <p
                  style={{
                    width: "100%",
                    margin: "6px auto 0 auto",
                    fontSize: "12.8px",
                    lineHeight: 1.55,
                    color: "#334155",
                    fontWeight: 500,
                  }}
                >
                  For outstanding performance, dedication, and oral reading fluency in completing the{" "}
                  <strong style={{ color: "#0F172A", fontWeight: 700 }}>Papuan Reading Aloud & Cultural Discovery Program</strong>,
                  demonstrating mastery in English pronunciation and deep appreciation for local Papuan heritage storytelling.
                </p>

                {/* 3. Three Competency Badges */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "14px",
                    width: "100%",
                    margin: "8px auto 0 auto",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.96)",
                      border: "1.5px solid #FCD34D",
                      borderLeft: "4px solid #F59E0B",
                      borderRadius: "10px",
                      padding: "8px 12px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "9px",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <div style={{ fontSize: "19px", lineHeight: 1, paddingTop: "2px" }}>🎧</div>
                    <div>
                      <div style={{ fontSize: "11.5px", fontWeight: 800, color: "#92400E", lineHeight: 1.25 }}>
                        Pronunciation & Diction
                      </div>
                      <div style={{ fontSize: "9px", color: "#475569", lineHeight: 1.35, marginTop: "2px" }}>
                        Mastered clear phonetic articulation & stress.
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.96)",
                      border: "1.5px solid #FCD34D",
                      borderLeft: "4px solid #F59E0B",
                      borderRadius: "10px",
                      padding: "8px 12px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "9px",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <div style={{ fontSize: "19px", lineHeight: 1, paddingTop: "2px" }}>📖</div>
                    <div>
                      <div style={{ fontSize: "11.5px", fontWeight: 800, color: "#92400E", lineHeight: 1.25 }}>
                        Oral Reading Fluency
                      </div>
                      <div style={{ fontSize: "9px", color: "#475569", lineHeight: 1.35, marginTop: "2px" }}>
                        Achieved expressive reading aloud confidence.
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.96)",
                      border: "1.5px solid #FCD34D",
                      borderLeft: "4px solid #F59E0B",
                      borderRadius: "10px",
                      padding: "8px 12px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "9px",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <div style={{ fontSize: "19px", lineHeight: 1, paddingTop: "2px" }}>🏝️</div>
                    <div>
                      <div style={{ fontSize: "11.5px", fontWeight: 800, color: "#92400E", lineHeight: 1.25 }}>
                        Papuan Heritage Stories
                      </div>
                      <div style={{ fontSize: "9px", color: "#475569", lineHeight: 1.35, marginTop: "2px" }}>
                        Explored 26 regional folktales & traditions.
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Bottom Validation: Official App Badge (Left, No Box) + Signatory & QR (Right, No Box) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "8px",
                    width: "100%",
                  }}
                >
                  {/* Left: Official ReadLocal Kids App Icon Badge (Larger, No enclosing box) */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        width: "66px",
                        height: "66px",
                        borderRadius: "18px",
                        background: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
                        border: "2.2px solid #BAE6FD",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        boxShadow: "0 4px 14px rgba(2, 132, 199, 0.22)",
                      }}
                    >
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                      <div
                        style={{
                          position: "absolute",
                          top: "-4px",
                          right: "-4px",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          backgroundColor: "#F59E0B",
                          border: "3px solid #FFFFFF",
                          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.18)",
                        }}
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Fredoka', sans-serif",
                          fontSize: "13.5px",
                          fontWeight: 700,
                          color: "#B45309",
                          textTransform: "uppercase",
                          lineHeight: 1.15,
                        }}
                      >
                        Official ReadLocal Kids Badge
                      </div>
                      <div style={{ fontSize: "9.5px", color: "#475569", fontWeight: 600, lineHeight: 1.3, marginTop: "2px" }}>
                        Verified Reading Aloud Achievement
                      </div>
                      <div style={{ fontSize: "9.5px", color: "#D97706", fontWeight: 800, lineHeight: 1.3, marginTop: "1.5px" }}>
                        ReadLocal Kids Certified Learner
                      </div>
                    </div>
                  </div>

                  {/* Right: Single Signatory + QR Code (No enclosing box) */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                      {qrCodeDataUrl ? (
                        <img
                          src={qrCodeDataUrl}
                          alt="QR Code Verification"
                          style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "6px",
                            border: "1.5px solid #CBD5E1",
                            background: "#FFFFFF",
                            padding: "1px",
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
                          }}
                        />
                      ) : (
                        <div style={{ width: "52px", height: "52px", background: "#F1F5F9", borderRadius: "6px" }} />
                      )}
                      <span style={{ fontSize: "7px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748B" }}>
                        Scan Verifikasi
                      </span>
                    </div>

                    <div style={{ borderLeft: "1.5px solid #CBD5E1", paddingLeft: "12px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <div style={{ fontSize: "13px", fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                        Dr. Yulini Rinantanti, M. Ed.
                      </div>
                      <div style={{ fontSize: "9.5px", fontWeight: 700, color: "#B45309", lineHeight: 1.25, marginTop: "2px" }}>
                        Research Lead & Author · ReadLocal Kids
                      </div>
                      <div style={{ fontSize: "8.5px", fontWeight: 600, color: "#64748B", lineHeight: 1.25, marginTop: "1px" }}>
                        Universitas Cenderawasih · Program Literasi Papua
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Footer Bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1.5px solid rgba(245, 158, 11, 0.35)",
                    paddingTop: "4px",
                    fontSize: "9px",
                    fontWeight: 700,
                    color: "#475569",
                    marginTop: "4px",
                  }}
                >
                  <div>Date Issued: <span style={{ color: "#0F172A" }}>{certDate}</span></div>
                  <div>Credential ID: <span style={{ fontFamily: "monospace", fontWeight: "bold", color: "#B45309" }}>{certId}</span></div>
                  <div>Verification: <span style={{ fontFamily: "monospace", fontWeight: "bold", color: "#0F172A" }}>readlocal-kids-nu.vercel.app</span></div>
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
              width: "297mm",
              height: "210mm",
              position: "relative",
              backgroundImage: `url(${CERTIFICATE_BG_BASE64})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              margin: 0,
              padding: 0,
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            {/* Top-Left Official Application Logo */}
            <div
              style={{
                position: "absolute",
                top: "5%",
                left: "6%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
                  border: "1.8px solid #BAE6FD",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  boxShadow: "0 2px 8px rgba(2, 132, 199, 0.15)",
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <div
                  style={{
                    position: "absolute",
                    top: "-3px",
                    right: "-3px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#F59E0B",
                    border: "2.2px solid #FFFFFF",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
                  }}
                />
              </div>
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "#0F172A",
                    lineHeight: 1.1,
                    letterSpacing: "-0.3px",
                  }}
                >
                  ReadLocal <span style={{ color: "#0EA5E9" }}>Kids</span>
                </div>
                <div
                  style={{
                    fontSize: "9.5px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    color: "#D97706",
                    marginTop: "1.5px",
                  }}
                >
                  READ ENGLISH · DISCOVER CULTURE
                </div>
              </div>
            </div>

            {/* Main Certificate Content (Full page layout) */}
            <div
              style={{
                position: "absolute",
                top: "23.5%",
                bottom: "7%",
                left: "26%",
                right: "14%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              {/* 1. Header & Recipient */}
              <div style={{ marginBottom: "2px" }}>
                <h1
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: "32px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: "#0F172A",
                    lineHeight: 1.1,
                    margin: 0,
                  }}
                >
                  Certificate of Accomplishment
                </h1>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "2.5px",
                    color: "#B45309",
                    marginTop: "2px",
                    display: "block",
                  }}
                >
                  Papuan Reading Aloud & Cultural Discovery Program
                </span>
                <p
                  style={{
                    fontSize: "13.5px",
                    fontStyle: "italic",
                    fontWeight: 600,
                    color: "#64748B",
                    marginTop: "2px",
                  }}
                >
                  This certificate is proudly awarded to
                </p>

                <div
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: "46px",
                    fontWeight: 800,
                    color: "#D97706",
                    lineHeight: 1.1,
                    letterSpacing: "-0.5px",
                    marginTop: "3px",
                    textShadow: "0 2px 6px rgba(217, 119, 6, 0.2)",
                  }}
                >
                  {studentName}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    margin: "4px auto 0 auto",
                    maxWidth: "420px",
                  }}
                >
                  <div style={{ flex: 1, height: "2.5px", background: "linear-gradient(to right, transparent, #F59E0B)", borderRadius: "9999px" }} />
                  <div style={{ width: "11px", height: "11px", transform: "rotate(45deg)", background: "#D97706", border: "2px solid #FEF3C7" }} />
                  <div style={{ flex: 1, height: "2.5px", background: "linear-gradient(to left, transparent, #F59E0B)", borderRadius: "9999px" }} />
                </div>
              </div>

              {/* 2. Full-width Citation Text */}
              <p
                style={{
                  width: "100%",
                  margin: "6px auto 0 auto",
                  fontSize: "12.8px",
                  lineHeight: 1.55,
                  color: "#334155",
                  fontWeight: 500,
                }}
              >
                For outstanding performance, dedication, and oral reading fluency in completing the{" "}
                <strong style={{ color: "#0F172A", fontWeight: 700 }}>Papuan Reading Aloud & Cultural Discovery Program</strong>,
                demonstrating mastery in English pronunciation and deep appreciation for local Papuan heritage storytelling.
              </p>

              {/* 3. Three Competency Badges */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "14px",
                  width: "100%",
                  margin: "8px auto 0 auto",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.96)",
                    border: "1.5px solid #FCD34D",
                    borderLeft: "4px solid #F59E0B",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "9px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div style={{ fontSize: "19px", lineHeight: 1, paddingTop: "2px" }}>🎧</div>
                  <div>
                    <div style={{ fontSize: "11.5px", fontWeight: 800, color: "#92400E", lineHeight: 1.25 }}>
                      Pronunciation & Diction
                    </div>
                    <div style={{ fontSize: "9px", color: "#475569", lineHeight: 1.35, marginTop: "2px" }}>
                      Mastered clear phonetic articulation & stress.
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.96)",
                    border: "1.5px solid #FCD34D",
                    borderLeft: "4px solid #F59E0B",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "9px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div style={{ fontSize: "19px", lineHeight: 1, paddingTop: "2px" }}>📖</div>
                  <div>
                    <div style={{ fontSize: "11.5px", fontWeight: 800, color: "#92400E", lineHeight: 1.25 }}>
                      Oral Reading Fluency
                    </div>
                    <div style={{ fontSize: "9px", color: "#475569", lineHeight: 1.35, marginTop: "2px" }}>
                      Achieved expressive reading aloud confidence.
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.96)",
                    border: "1.5px solid #FCD34D",
                    borderLeft: "4px solid #F59E0B",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "9px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div style={{ fontSize: "19px", lineHeight: 1, paddingTop: "2px" }}>🏝️</div>
                  <div>
                    <div style={{ fontSize: "11.5px", fontWeight: 800, color: "#92400E", lineHeight: 1.25 }}>
                      Papuan Heritage Stories
                    </div>
                    <div style={{ fontSize: "9px", color: "#475569", lineHeight: 1.35, marginTop: "2px" }}>
                      Explored 26 regional folktales & traditions.
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Bottom Validation: Official App Badge (Left, No Box) + Signatory & QR (Right, No Box) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "8px",
                  width: "100%",
                }}
              >
                {/* Left: Official ReadLocal Kids App Icon Badge (Larger, No enclosing box) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      width: "66px",
                      height: "66px",
                      borderRadius: "18px",
                      background: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
                      border: "2.2px solid #BAE6FD",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      boxShadow: "0 4px 14px rgba(2, 132, 199, 0.22)",
                    }}
                  >
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    <div
                      style={{
                        position: "absolute",
                        top: "-4px",
                        right: "-4px",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        backgroundColor: "#F59E0B",
                        border: "3px solid #FFFFFF",
                        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.18)",
                      }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: "13.5px",
                        fontWeight: 700,
                        color: "#B45309",
                        textTransform: "uppercase",
                        lineHeight: 1.15,
                      }}
                    >
                      Official ReadLocal Kids Badge
                    </div>
                    <div style={{ fontSize: "9.5px", color: "#475569", fontWeight: 600, lineHeight: 1.3, marginTop: "2px" }}>
                      Verified Reading Aloud Achievement
                    </div>
                    <div style={{ fontSize: "9.5px", color: "#D97706", fontWeight: 800, lineHeight: 1.3, marginTop: "1.5px" }}>
                      ReadLocal Kids Certified Learner
                    </div>
                  </div>
                </div>

                {/* Right: Single Signatory + QR Code (No enclosing box) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                    {qrCodeDataUrl ? (
                      <img
                        src={qrCodeDataUrl}
                        alt="QR Code Verification"
                        style={{
                          width: "52px",
                          height: "52px",
                          borderRadius: "6px",
                          border: "1.5px solid #CBD5E1",
                          background: "#FFFFFF",
                          padding: "1px",
                          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
                        }}
                      />
                    ) : (
                      <div style={{ width: "52px", height: "52px", background: "#F1F5F9", borderRadius: "6px" }} />
                    )}
                    <span style={{ fontSize: "7px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748B" }}>
                      Scan Verifikasi
                    </span>
                  </div>

                    <div style={{ borderLeft: "1.5px solid #CBD5E1", paddingLeft: "12px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <div style={{ fontSize: "13px", fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                        Dr. Yulini Rinantanti, M. Ed.
                      </div>
                      <div style={{ fontSize: "9.5px", fontWeight: 700, color: "#B45309", lineHeight: 1.25, marginTop: "2px" }}>
                        Research Lead & Author · ReadLocal Kids
                      </div>
                      <div style={{ fontSize: "8.5px", fontWeight: 600, color: "#64748B", lineHeight: 1.25, marginTop: "1px" }}>
                        Universitas Cenderawasih · Program Literasi Papua
                      </div>
                    </div>
                </div>
              </div>

              {/* 5. Footer Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1.5px solid rgba(245, 158, 11, 0.35)",
                  paddingTop: "4px",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#475569",
                  marginTop: "4px",
                }}
              >
                <div>Date Issued: <span style={{ color: "#0F172A" }}>{certDate}</span></div>
                <div>Credential ID: <span style={{ fontFamily: "monospace", fontWeight: "bold", color: "#B45309" }}>{certId}</span></div>
                <div>Verification: <span style={{ fontFamily: "monospace", fontWeight: "bold", color: "#0F172A" }}>readlocal-kids-nu.vercel.app</span></div>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
