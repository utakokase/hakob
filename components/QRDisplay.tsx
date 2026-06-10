"use client";

import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { useLang } from "@/lib/i18n/context";

export default function QRDisplay({ url }: { url: string }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
      <h2 className="text-lg font-bold text-gray-800 mb-1">{t.qr.title}</h2>
      <p className="text-sm text-gray-500 mb-5">{t.qr.subtitle}</p>

      <div className="flex justify-center mb-5">
        <div className="p-3 bg-white border-2 border-gray-200 rounded-xl inline-block">
          <QRCodeSVG value={url} size={200} />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-4 break-all text-xs text-gray-500 text-left">
        {url}
      </div>

      <div className="flex gap-3">
        <button onClick={copy}
          className="flex-1 py-3 rounded-xl border border-blue-500 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors">
          {copied ? t.qr.copied : t.qr.copyUrl}
        </button>
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center">
          {t.qr.viewPage}
        </a>
      </div>
    </div>
  );
}
