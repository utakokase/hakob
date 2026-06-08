"use client";

import { useState } from "react";
import QRDisplay from "@/components/QRDisplay";

type FormData = {
  name: string;
  moveIn: string;
  rentMax: string;
  layouts: string[];
  areas: string[];
  walkMax: string;
  ageMax: string;
  floor: string;
  separateBath: boolean;
  pet: boolean;
  parking: boolean;
  twoPersonOk: boolean;
  notes: string;
};

const LAYOUT_OPTIONS = ["1R/1K", "1DK/1LDK", "2DK/2LDK", "3DK以上"];
const WALK_OPTIONS = ["5分以内", "10分以内", "15分以内", "問わない"];
const AGE_OPTIONS = ["〜5年", "〜10年", "〜20年", "問わない"];
const FLOOR_OPTIONS = ["2階以上", "3階以上", "問わない"];

const generateMoveInOptions = () => {
  const options: string[] = [];
  const now = new Date();
  for (let i = 0; i <= 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    options.push(`${d.getFullYear()}年${d.getMonth() + 1}月`);
  }
  options.push("できるだけ早く", "未定");
  return options;
};

export default function Home() {
  const [form, setForm] = useState<FormData>({
    name: "",
    moveIn: "",
    rentMax: "",
    layouts: [],
    areas: [],
    walkMax: "10分以内",
    ageMax: "問わない",
    floor: "問わない",
    separateBath: false,
    pet: false,
    parking: false,
    twoPersonOk: false,
    notes: "",
  });
  const [areaInput, setAreaInput] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const toggleLayout = (v: string) => {
    setForm((f) => ({
      ...f,
      layouts: f.layouts.includes(v)
        ? f.layouts.filter((l) => l !== v)
        : [...f.layouts, v],
    }));
  };

  const addArea = () => {
    const trimmed = areaInput.trim();
    if (trimmed && !form.areas.includes(trimmed)) {
      setForm((f) => ({ ...f, areas: [...f.areas, trimmed] }));
    }
    setAreaInput("");
  };

  const removeArea = (area: string) => {
    setForm((f) => ({ ...f, areas: f.areas.filter((a) => a !== area) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bytes = new TextEncoder().encode(JSON.stringify(form));
    const encoded = btoa(String.fromCharCode(...bytes));
    const url = `${window.location.origin}/view?d=${encodeURIComponent(encoded)}`;
    setGeneratedUrl(url);
    setTimeout(() => {
      document.getElementById("qr-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const moveInOptions = generateMoveInOptions();

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-1">RoomPass</h1>
        <p className="text-gray-500 text-sm">希望条件を入力 → QRコードを不動産屋に見せるだけ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* お名前 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            お名前（任意）
          </label>
          <input
            type="text"
            placeholder="例：田中 太郎"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* 入居希望時期 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            入居希望時期 <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={form.moveIn}
            onChange={(e) => setForm({ ...form, moveIn: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">選択してください</option>
            {moveInOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* 賃料上限 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            賃料上限（管理費込） <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              required
              placeholder="80000"
              value={form.rentMax}
              onChange={(e) => setForm({ ...form, rentMax: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute right-3 top-2 text-gray-500 text-sm">円</span>
          </div>
        </div>

        {/* 間取り */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            間取り <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {LAYOUT_OPTIONS.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => toggleLayout(o)}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  form.layouts.includes(o)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        {/* 希望エリア */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            希望エリア（駅・区など） <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="例：渋谷区、目黒駅"
              value={areaInput}
              onChange={(e) => setAreaInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") { e.preventDefault(); addArea(); }
              }}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={addArea}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-200 text-sm"
            >
              追加
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.areas.map((a) => (
              <span key={a} className="flex items-center gap-1 bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                {a}
                <button type="button" onClick={() => removeArea(a)} className="ml-1 text-blue-400 hover:text-blue-700">×</button>
              </span>
            ))}
          </div>
        </div>

        {/* 駅徒歩 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">最寄り駅からの徒歩</label>
          <div className="flex flex-wrap gap-2">
            {WALK_OPTIONS.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setForm({ ...form, walkMax: o })}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  form.walkMax === o
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        {/* 築年数 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">築年数</label>
          <div className="flex flex-wrap gap-2">
            {AGE_OPTIONS.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setForm({ ...form, ageMax: o })}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  form.ageMax === o
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        {/* 階数 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">階数</label>
          <div className="flex flex-wrap gap-2">
            {FLOOR_OPTIONS.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setForm({ ...form, floor: o })}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  form.floor === o
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        {/* こだわり条件 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">こだわり条件</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: "separateBath", label: "バス・トイレ別" },
              { key: "pet", label: "ペット可" },
              { key: "parking", label: "駐車場あり" },
              { key: "twoPersonOk", label: "二人入居可" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[key as keyof FormData] as boolean}
                  onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* フリーコメント */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            その他・一言メモ（任意）
          </label>
          <textarea
            placeholder="例：楽器可希望、日当たり重視、騒音が少ない環境を希望"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-colors shadow-md"
        >
          QRコードを生成する
        </button>
      </form>

      {generatedUrl && (
        <div id="qr-section" className="mt-10">
          <QRDisplay url={generatedUrl} />
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-10">
        入力した条件はサーバーに保存されません。URLのみで条件を共有します。
      </p>
    </div>
  );
}
