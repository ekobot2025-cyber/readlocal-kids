import React, { useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Printer, Award } from "lucide-react";

export function CertificateModal({ open, onClose, studentName = "Maria Papuana", stats = {} }) {
  const printRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const certDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const certId = `RLK-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => { if (!o) onClose(); }}
      maxWidth="max-w-4xl"
      portalClassName="rlk-cert-portal"
    >
      <DialogContent className="w-full p-2 sm:p-6 overflow-hidden rounded-3xl">
        <style>{`
          @media print {
            @page {
              size: landscape;
              margin: 0;
            }

            html, body {
              width: 100% !important;
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              background: #FFFDF8 !important;
              overflow: hidden !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            /* Hide all page content outside certificate modal */
            body > *:not(.rlk-cert-portal) {
              display: none !important;
            }

            .rlk-cert-portal {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100vw !important;
              height: 100vh !important;
              margin: 0 !important;
              padding: 0 !important;
              background: #FFFDF8 !important;
            }

            /* Hide modal backdrop overlay, close buttons, action bar */
            .rlk-cert-portal [data-print-hide="true"],
            .rlk-cert-portal button,
            .rlk-cert-portal .bg-black\/60,
            .rlk-cert-portal .border-b {
              display: none !important;
            }

            /* Reset outer dialog content wrapper */
            .rlk-cert-portal .relative.z-10 {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100vw !important;
              height: 100vh !important;
              max-width: none !important;
              max-height: none !important;
              margin: 0 !important;
              padding: 0 !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              background: #FFFDF8 !important;
            }

            .rlk-cert-portal .overflow-y-auto {
              overflow: visible !important;
              max-height: none !important;
              padding: 0 !important;
            }

            /* Main Printable Certificate Container */
            #certificate-printable {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100vw !important;
              height: 100vh !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 10mm 15mm !important;
              box-sizing: border-box !important;
              border: 12px solid #F59E0B !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              background-color: #FFFDF8 !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-between !important;
            }

            #certificate-printable .inner-frame {
              height: 100% !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-between !important;
              padding: 6mm 10mm !important;
              box-sizing: border-box !important;
              border: 2px dashed #FCD34D !important;
              border-radius: 12px !important;
            }
          }
        `}</style>

        {/* Modal Action Bar (Hidden during print) */}
        <div data-print-hide="true" className="flex items-center justify-between px-4 pt-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            <h3 className="font-heading text-lg font-bold text-slate-800">Official Certificate Preview</h3>
          </div>
          <div className="flex items-center gap-2 pr-8">
            <Button
              onClick={handlePrint}
              className="rounded-full bg-amber-500 hover:bg-amber-600 font-bold text-white shadow-md text-xs sm:text-sm px-4 py-2"
            >
              <Printer className="mr-1.5 h-4 w-4" /> Print / Save as PDF
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
