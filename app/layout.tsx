import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "RoomPass - 賃貸希望条件をQRで伝える",
  description: "希望条件を入力してQRコードを生成。不動産屋に見せるだけで条件が伝わります。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 min-h-screen font-sans">
        <LanguageProvider>
          <div className="flex justify-end px-4 pt-3 max-w-lg mx-auto">
            <LanguageSwitcher />
          </div>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
