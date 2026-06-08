import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoomPass - 賃貸希望条件をQRで伝える",
  description: "希望条件を入力してQRコードを生成。不動産屋に見せるだけで条件が伝わります。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 min-h-screen font-sans">{children}</body>
    </html>
  );
}
