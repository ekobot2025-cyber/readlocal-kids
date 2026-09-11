import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CANVA_PANEL_BASE64, CANVA_STAMP_BASE64 } from "./canvaBadgeAssets";
import { Printer, Award, ExternalLink, Sparkles } from "lucide-react";

/**
 * Generate a standalone, self-contained HTML string adhering to the modern Canva Design School certificate standard.
 * Perfectly calibrated for A4 Landscape (297mm x 210mm).
 */
function generatePrintHtml({ studentName, certDate, certId, qrCodeDataUrl }) {
  const topBadgeIconSvg = `<svg width="22" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    <polygon points="12 4 13.5 7 17 7.5 14.5 10 15 13.5 12 11.8 9 13.5 9.5 10 7 7.5 10.5 7 12 4" fill="#EA580C"></polygon>
  </svg>`;

  const logoIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>`;

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <title>Certificate of Completion - ${studentName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700;800&family=Montserrat:wght@400;500;600;700;800;900&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 landscape;
      margin: 0;
    }}
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
      background: #FFFFFF;
      font-family: 'Montserrat', 'Nunito', system-ui, sans-serif;
      overflow: hidden;
      -webkit-font-smoothing: antialiased;
    }
    .cert-container {
      width: 297mm;
      height: 210mm;
      position: relative;
      display: flex;
      background: #FFFFFF;
      overflow: hidden;
    }
    
    /* Left Section: 64% width */
    .left-section {
      width: 64%;
      height: 100%;
      padding: 46px 52px 36px 56px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
    }
    
    /* Top Category Badge */
    .top-badge-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .top-badge-text {
      font-size: 11.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #EA580C;
    }
    
    /* Course / Program Title */
    .program-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 42px;
      font-weight: 800;
      color: #0F172A;
      line-height: 1.15;
      letter-spacing: -0.8px;
      margin-top: 14px;
    }
    
    /* Recipient Name */
    .recipient-block {
      margin-top: 38px;
    }
    .recipient-name {
      font-family: 'Montserrat', sans-serif;
      font-size: 34px;
      font-weight: 700;
      color: #0F172A;
      line-height: 1.2;
      letter-spacing: -0.4px;
    }
    
    /* Citation & Stamp Row */
    .citation-stamp-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-top: 24px;
    }
    .citation-text {
      font-size: 12px;
      line-height: 1.55;
      color: #475569;
      font-weight: 500;
      max-width: 395px;
    }
    .citation-text strong {
      color: #0F172A;
      font-weight: 700;
    }
    .certified-stamp-img {
      width: 116px;
      height: 116px;
      object-fit: contain;
      flex-shrink: 0;
      filter: drop-shadow(0 4px 14px rgba(59, 130, 246, 0.22));
    }
    
    /* Horizontal Divider */
    .divider-line {
      width: 100%;
      height: 1.5px;
      background-color: #E2E8F0;
      margin-top: 22px;
      margin-bottom: 16px;
    }
    
    /* Footer Metadata: 3 Columns */
    .footer-meta-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1.6fr;
      gap: 16px;
      align-items: center;
    }
    .meta-col {
      display: flex;
      flex-direction: column;
    }
    .meta-label {
      font-size: 10px;
      font-weight: 600;
      color: #64748B;
      text-transform: capitalize;
      margin-bottom: 3px;
    }
    .meta-value {
      font-size: 13.5px;
      font-weight: 700;
      color: #0F172A;
      line-height: 1.2;
    }
    .meta-value.mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12.5px;
    }
    
    /* Signatory Block with mini QR */
    .signatory-box {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .mini-qr {
      width: 44px;
      height: 44px;
      border-radius: 5px;
      border: 1.2px solid #CBD5E1;
      padding: 1px;
      background: #FFFFFF;
      flex-shrink: 0;
    }
    .sign-titles {
      display: flex;
      flex-direction: column;
      white-space: nowrap;
    }
    .sign-person-name {
      font-size: 12.8px;
      font-weight: 800;
      color: #0F172A;
      line-height: 1.2;
    }
    .sign-person-role {
      font-size: 8.8px;
      font-weight: 700;
      color: #B45309;
      line-height: 1.2;
      margin-top: 1.5px;
    }
    .sign-person-inst {
      font-size: 7.8px;
      font-weight: 600;
      color: #64748B;
      line-height: 1.2;
    }
    
    /* Right Section: 36% width */
    .right-section {
      width: 36%;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      background: #FFFFFF;
    }
    
    /* Top Panel with 3D Badge (81% height) */
    .badge-panel-box {
      width: 100%;
      height: 81%;
      background-image: url('${CANVA_PANEL_BASE64}');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    
    /* Bottom Brand Logo Bar (19% height) */
    .brand-bar-box {
      width: 100%;
      height: 19%;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 16px;
      box-sizing: border-box;
    }
    .app-logo-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .app-logo-squircle {
      width: 44px;
      height: 44px;
      border-radius: 13px;
      background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
      border: 1.8px solid #BAE6FD;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.15);
      flex-shrink: 0;
    }
    .app-logo-dot {
      position: absolute;
      top: -3px;
      right: -3px;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background-color: #F59E0B;
      border: 2px solid #FFFFFF;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    }
    .app-logo-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 20px;
      font-weight: 800;
      color: #0F172A;
      line-height: 1.1;
      letter-spacing: -0.3px;
    }
    .app-logo-title span {
      color: #0EA5E9;
    }
    .app-logo-sub {
      font-size: 8.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #D97706;
      margin-top: 1.5px;
    }
  </style>
</head>
<body>
  <div class="cert-container">
    <!-- LEFT SECTION -->
    <div class="left-section">
      <div>
        <!-- Top Badge -->
        <div class="top-badge-row">
          ${topBadgeIconSvg}
          <span class="top-badge-text">Certificate of Completion</span>
        </div>

        <!-- Program Title -->
        <h1 class="program-title">
          Papuan Reading Aloud &amp;<br/>
          Cultural Discovery
        </h1>

        <!-- Recipient Name -->
        <div class="recipient-block">
          <div class="recipient-name">${studentName}</div>
        </div>

        <!-- Citation & Stamp Row -->
        <div class="citation-stamp-row">
          <p class="citation-text">
            The certificate holder has successfully completed the <strong>Papuan Reading Aloud &amp; Cultural Discovery Program</strong>, demonstrating exemplary dedication, oral reading fluency, and cultural appreciation.
          </p>
          <img src="${CANVA_STAMP_BASE64}" alt="ReadLocal Kids Certified" class="certified-stamp-img" />
        </div>
      </div>

      <!-- Divider & Footer -->
      <div>
        <div class="divider-line"></div>
        <div class="footer-meta-row">
          <!-- Issue Date -->
          <div class="meta-col">
            <span class="meta-label">Issue Date</span>
            <span class="meta-value">${certDate}</span>
          </div>
          <!-- Credential ID -->
          <div class="meta-col">
            <span class="meta-label">Credential ID</span>
            <span class="meta-value mono">${certId}</span>
          </div>
          <!-- Presented by -->
          <div class="meta-col">
            <span class="meta-label">Presented by</span>
            <div class="signatory-box">
              <img src="${qrCodeDataUrl}" alt="QR" class="mini-qr" />
              <div class="sign-titles">
                <span class="sign-person-name">Dr. Yulini Rinantanti, M. Ed.</span>
                <span class="sign-person-role">Research Lead &amp; Author · ReadLocal Kids</span>
                <span class="sign-person-inst">Universitas Cenderawasih</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT SECTION -->
    <div class="right-section">
      <!-- 3D Medal Badge Feature Panel -->
      <div class="badge-panel-box"></div>
      <!-- Brand Logo Bar -->
      <div class="brand-bar-box">
        <div class="app-logo-wrap">
          <div class="app-logo-squircle">
            ${logoIconSvg}
            <div class="app-logo-dot"></div>
          </div>
          <div>
            <div class="app-logo-title">ReadLocal <span>Kids</span></div>
            <div class="app-logo-sub">READ ENGLISH · DISCOVER CULTURE</div>
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
                <h3 className="font-heading text-lg font-bold text-slate-800">Pratinjau Sertifikat Resmi (Canva Standard)</h3>
                <p className="text-[11px] text-slate-500">Format sertifikat internasional modern, elegan, dan 100% aman cetak.</p>
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
              className="relative mx-auto w-full min-w-[700px] max-w-4xl aspect-[297/210] rounded-2xl border border-slate-200 shadow-2xl overflow-hidden select-none flex bg-white"
            >
              {/* Left Section (64%) */}
              <div
                style={{
                  width: "64%",
                  height: "100%",
                  padding: "4.5% 5.2% 3.6% 5.6%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxSizing: "border-box",
                  textAlign: "left",
                }}
              >
                <div>
                  {/* Top Badge Row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="20" height="22" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                      <polygon points="12 4 13.5 7 17 7.5 14.5 10 15 13.5 12 11.8 9 13.5 9.5 10 7 7.5 10.5 7 12 4" fill="#EA580C"></polygon>
                    </svg>
                    <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: "#EA580C" }}>
                      Certificate of Completion
                    </span>
                  </div>

                  {/* Program Title */}
                  <h1
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "36px",
                      fontWeight: 800,
                      color: "#0F172A",
                      lineHeight: 1.15,
                      letterSpacing: "-0.6px",
                      marginTop: "12px",
                      marginRight: "0",
                      marginBottom: "0",
                      marginLeft: "0",
                    }}
                  >
                    Papuan Reading Aloud &amp;<br />
                    Cultural Discovery
                  </h1>

                  {/* Recipient Name */}
                  <div style={{ marginTop: "32px" }}>
                    <div
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "30px",
                        fontWeight: 700,
                        color: "#0F172A",
                        lineHeight: 1.2,
                        letterSpacing: "-0.4px",
                      }}
                    >
                      {studentName}
                    </div>
                  </div>

                  {/* Citation & Stamp Row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", marginTop: "20px" }}>
                    <p
                      style={{
                        fontSize: "11.5px",
                        lineHeight: 1.55,
                        color: "#475569",
                        fontWeight: 500,
                        maxWidth: "340px",
                        margin: 0,
                      }}
                    >
                      The certificate holder has successfully completed the <strong style={{ color: "#0F172A", fontWeight: 700 }}>Papuan Reading Aloud &amp; Cultural Discovery Program</strong>, demonstrating exemplary dedication, oral reading fluency, and cultural appreciation.
                    </p>
                    <img
                      src={CANVA_STAMP_BASE64}
                      alt="ReadLocal Kids Certified"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                        flexShrink: 0,
                        filter: "drop-shadow(0 4px 12px rgba(59, 130, 246, 0.22))",
                      }}
                    />
                  </div>
                </div>

                {/* Divider & Footer Meta */}
                <div>
                  <div style={{ width: "100%", height: "1.5px", backgroundColor: "#E2E8F0", marginTop: "18px", marginBottom: "14px" }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.6fr", gap: "12px", alignItems: "center" }}>
                    {/* Issue Date */}
                    <div>
                      <div style={{ fontSize: "9.5px", fontWeight: 600, color: "#64748B", marginBottom: "2px" }}>Issue Date</div>
                      <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#0F172A" }}>{certDate}</div>
                    </div>
                    {/* Credential ID */}
                    <div>
                      <div style={{ fontSize: "9.5px", fontWeight: 600, color: "#64748B", marginBottom: "2px" }}>Credential ID</div>
                      <div style={{ fontSize: "11.5px", fontWeight: 700, color: "#0F172A", fontFamily: "monospace" }}>{certId}</div>
                    </div>
                    {/* Presented by */}
                    <div>
                      <div style={{ fontSize: "9.5px", fontWeight: 600, color: "#64748B", marginBottom: "2px" }}>Presented by</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {qrCodeDataUrl ? (
                          <img
                            src={qrCodeDataUrl}
                            alt="QR"
                            style={{ width: "38px", height: "38px", borderRadius: "4px", border: "1px solid #CBD5E1", padding: "1px", background: "#FFFFFF", flexShrink: 0 }}
                          />
                        ) : (
                          <div style={{ width: "38px", height: "38px", background: "#F1F5F9", borderRadius: "4px" }} />
                        )}
                        <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
                          <span style={{ fontSize: "11.8px", fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                            Dr. Yulini Rinantanti, M. Ed.
                          </span>
                          <span style={{ fontSize: "8.2px", fontWeight: 700, color: "#B45309", lineHeight: 1.2, marginTop: "1px" }}>
                            Research Lead &amp; Author · ReadLocal Kids
                          </span>
                          <span style={{ fontSize: "7.2px", fontWeight: 600, color: "#64748B", lineHeight: 1.2 }}>
                            Universitas Cenderawasih
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section (36%) */}
              <div
                style={{
                  width: "36%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxSizing: "border-box",
                  background: "#FFFFFF",
                }}
              >
                {/* 3D Medal Badge Feature Panel (81% height) */}
                <div
                  style={{
                    width: "100%",
                    height: "81%",
                    backgroundImage: `url(${CANVA_PANEL_BASE64})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />

                {/* Bottom Brand Logo Bar (19% height) */}
                <div
                  style={{
                    width: "100%",
                    height: "19%",
                    background: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 12px",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "11px",
                        background: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
                        border: "1.6px solid #BAE6FD",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        boxShadow: "0 2px 6px rgba(2, 132, 199, 0.15)",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                      <div
                        style={{
                          position: "absolute",
                          top: "-3px",
                          right: "-3px",
                          width: "9px",
                          height: "9px",
                          borderRadius: "50%",
                          backgroundColor: "#F59E0B",
                          border: "1.8px solid #FFFFFF",
                          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
                        }}
                      />
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div
                        style={{
                          fontFamily: "'Fredoka', sans-serif",
                          fontSize: "17px",
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
                          fontSize: "7.8px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "1.2px",
                          color: "#D97706",
                          marginTop: "1.5px",
                        }}
                      >
                        READ ENGLISH · DISCOVER CULTURE
                      </div>
                    </div>
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
              width: "297mm",
              height: "210mm",
              position: "relative",
              display: "flex",
              background: "#FFFFFF",
              margin: 0,
              padding: 0,
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            {/* LEFT SECTION (64%) */}
            <div
              style={{
                width: "64%",
                height: "100%",
                padding: "46px 52px 36px 56px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
                textAlign: "left",
              }}
            >
              <div>
                {/* Top Badge */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="22" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    <polygon points="12 4 13.5 7 17 7.5 14.5 10 15 13.5 12 11.8 9 13.5 9.5 10 7 7.5 10.5 7 12 4" fill="#EA580C"></polygon>
                  </svg>
                  <span style={{ fontSize: "11.5px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: "#EA580C" }}>
                    Certificate of Completion
                  </span>
                </div>

                {/* Program Title */}
                <h1
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "42px",
                    fontWeight: 800,
                    color: "#0F172A",
                    lineHeight: 1.15,
                    letterSpacing: "-0.8px",
                    marginTop: "14px",
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                  }}
                >
                  Papuan Reading Aloud &amp;<br />
                  Cultural Discovery
                </h1>

                {/* Recipient Name */}
                <div style={{ marginTop: "38px" }}>
                  <div
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "34px",
                      fontWeight: 700,
                      color: "#0F172A",
                      lineHeight: 1.2,
                      letterSpacing: "-0.4px",
                    }}
                  >
                    {studentName}
                  </div>
                </div>

                {/* Citation & Stamp Row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", marginTop: "24px" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      lineHeight: 1.55,
                      color: "#475569",
                      fontWeight: 500,
                      maxWidth: "395px",
                      margin: 0,
                    }}
                  >
                    The certificate holder has successfully completed the <strong style={{ color: "#0F172A", fontWeight: 700 }}>Papuan Reading Aloud &amp; Cultural Discovery Program</strong>, demonstrating exemplary dedication, oral reading fluency, and cultural appreciation.
                  </p>
                  <img
                    src={CANVA_STAMP_BASE64}
                    alt="ReadLocal Kids Certified"
                    style={{
                      width: "116px",
                      height: "116px",
                      objectFit: "contain",
                      flexShrink: 0,
                      filter: "drop-shadow(0 4px 14px rgba(59, 130, 246, 0.22))",
                    }}
                  />
                </div>
              </div>

              {/* Divider & Footer */}
              <div>
                <div style={{ width: "100%", height: "1.5px", backgroundColor: "#E2E8F0", marginTop: "22px", marginBottom: "16px" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.6fr", gap: "16px", alignItems: "center" }}>
                  {/* Issue Date */}
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: 600, color: "#64748B", marginBottom: "3px" }}>Issue Date</div>
                    <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#0F172A" }}>{certDate}</div>
                  </div>
                  {/* Credential ID */}
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: 600, color: "#64748B", marginBottom: "3px" }}>Credential ID</div>
                    <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#0F172A", fontFamily: "monospace" }}>{certId}</div>
                  </div>
                  {/* Presented by */}
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: 600, color: "#64748B", marginBottom: "3px" }}>Presented by</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {qrCodeDataUrl ? (
                        <img
                          src={qrCodeDataUrl}
                          alt="QR"
                          style={{ width: "44px", height: "44px", borderRadius: "5px", border: "1.2px solid #CBD5E1", padding: "1px", background: "#FFFFFF", flexShrink: 0 }}
                        />
                      ) : (
                        <div style={{ width: "44px", height: "44px", background: "#F1F5F9", borderRadius: "5px" }} />
                      )}
                      <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
                        <span style={{ fontSize: "12.8px", fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                          Dr. Yulini Rinantanti, M. Ed.
                        </span>
                        <span style={{ fontSize: "8.8px", fontWeight: 700, color: "#B45309", lineHeight: 1.2, marginTop: "1.5px" }}>
                          Research Lead &amp; Author · ReadLocal Kids
                        </span>
                        <span style={{ fontSize: "7.8px", fontWeight: 600, color: "#64748B", lineHeight: 1.2 }}>
                          Universitas Cenderawasih
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION (36%) */}
            <div
              style={{
                width: "36%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                background: "#FFFFFF",
              }}
            >
              {/* 3D Medal Badge Feature Panel (81% height) */}
              <div
                style={{
                  width: "100%",
                  height: "81%",
                  backgroundImage: `url(${CANVA_PANEL_BASE64})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />

              {/* Bottom Brand Logo Bar (19% height) */}
              <div
                style={{
                  width: "100%",
                  height: "19%",
                  background: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 16px",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "13px",
                      background: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
                      border: "1.8px solid #BAE6FD",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      boxShadow: "0 2px 8px rgba(2, 132, 199, 0.15)",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    <div
                      style={{
                        position: "absolute",
                        top: "-3px",
                        right: "-3px",
                        width: "11px",
                        height: "11px",
                        borderRadius: "50%",
                        backgroundColor: "#F59E0B",
                        border: "2px solid #FFFFFF",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
                      }}
                    />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: "20px",
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
                        fontSize: "8.5px",
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
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
