"use client";

import { useState } from "react";
import QRDisplay from "@/components/QRDisplay";

// ---- 型定義 ----
type BuildingType = "マンション" | "アパート" | "一戸建て" | "";

type FormData = {
  name: string;
  buildingType: BuildingType;
  moveIn: string;
  rentMax: string;
  rentMin: string;
  layouts: string[];
  areaMin: string;
  areas: string[];
  walkMax: string;
  ageMax: string;
  // マンション/アパート専用
  floorMin: string;
  direction: string;
  // 一戸建て専用
  parking: string;
  hasGarden: boolean;
  hasGarage: boolean;
  // 共通こだわり
  separateBath: boolean;
  pet: boolean;
  instrument: boolean;
  twoPersonOk: boolean;
  reikinNone: boolean;
  shikikinNone: boolean;
  freeRent: boolean;
  internetFree: boolean;
  washerIndoor: boolean;
  aircon: boolean;
  autolock: boolean;
  deliveryBox: boolean;
  bathDryer: boolean;
  floorHeating: boolean;
  reheating: boolean;
  washlet: boolean;
  systemKitchen: boolean;
  ihCooktop: boolean;
  guarantorFree: boolean;
  diy: boolean;
  notes: string;
};

// ---- 選択肢定数 ----
const LAYOUTS_MANSION = ["ワンルーム", "1K", "1DK", "1LDK", "2K", "2DK", "2LDK", "3K", "3DK", "3LDK", "4LDK以上"];
const LAYOUTS_HOUSE = ["1DK", "1LDK", "2DK", "2LDK", "3DK", "3LDK", "4LDK", "5K以上"];
const WALK_OPTIONS = ["3分以内", "5分以内", "7分以内", "10分以内", "15分以内", "20分以内", "問わない"];
const AGE_OPTIONS = ["新築", "〜3年", "〜5年", "〜10年", "〜15年", "〜20年", "〜30年", "問わない"];
const AREA_OPTIONS = ["〜20㎡", "〜25㎡", "〜30㎡", "〜40㎡", "〜50㎡", "〜60㎡", "〜80㎡", "問わない"];
const FLOOR_OPTIONS = ["2階以上", "3階以上", "4階以上", "最上階", "問わない"];
const DIRECTION_OPTIONS = ["南向き", "東向き", "西向き", "南東向き", "南西向き", "問わない"];
const PARKING_OPTIONS = ["不要", "1台", "2台以上", "問わない"];

const generateMoveInOptions = () => {
  const options: string[] = ["できるだけ早く"];
  const now = new Date();
  for (let i = 0; i <= 8; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    options.push(`${d.getFullYear()}年${d.getMonth() + 1}月`);
  }
  options.push("未定");
  return options;
};

const INITIAL_FORM: FormData = {
  name: "",
  buildingType: "",
  moveIn: "",
  rentMax: "",
  rentMin: "",
  layouts: [],
  areaMin: "問わない",
  areas: [],
  walkMax: "10分以内",
  ageMax: "問わない",
  floorMin: "問わない",
  direction: "問わない",
  parking: "問わない",
  hasGarden: false,
  hasGarage: false,
  separateBath: false,
  pet: false,
  instrument: false,
  twoPersonOk: false,
  reikinNone: false,
  shikikinNone: false,
  freeRent: false,
  internetFree: false,
  washerIndoor: false,
  aircon: false,
  autolock: false,
  deliveryBox: false,
  bathDryer: false,
  floorHeating: false,
  reheating: false,
  washlet: false,
  systemKitchen: false,
  ihCooktop: false,
  guarantorFree: false,
  diy: false,
  notes: "",
};

// ---- UIパーツ ----
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 mt-6 border-b border-blue-100 pb-1">{children}</h2>;
}

function ChipButton({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
        selected
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
      }`}
    >
      {label}
    </button>
  );
}

function CheckItem({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-blue-600 rounded"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

// ---- メインコンポーネント ----
export default function Home() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [areaInput, setAreaInput] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const moveInOptions = generateMoveInOptions();

  const isMansionOrApart = form.buildingType === "マンション" || form.buildingType === "アパート";
  const isHouse = form.buildingType === "一戸建て";
  const layoutOptions = isHouse ? LAYOUTS_HOUSE : LAYOUTS_MANSION;

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleLayout = (v: string) =>
    setForm((f) => ({
      ...f,
      layouts: f.layouts.includes(v) ? f.layouts.filter((l) => l !== v) : [...f.layouts, v],
    }));

  const addArea = () => {
    const t = areaInput.trim();
    if (t && !form.areas.includes(t)) setForm((f) => ({ ...f, areas: [...f.areas, t] }));
    setAreaInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bytes = new TextEncoder().encode(JSON.stringify(form));
    const encoded = btoa(String.fromCharCode(...bytes));
    const url = `${window.location.origin}/view?d=${encodeURIComponent(encoded)}`;
    setGeneratedUrl(url);
    setTimeout(() => document.getElementById("qr-section")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* ヘッダー */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-1">RoomPass</h1>
        <p className="text-gray-500 text-sm">希望条件を入力 → QRを不動産屋に見せるだけ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-1">

        {/* ── 基本情報 ── */}
        <SectionTitle>基本情報</SectionTitle>

        {/* お名前 */}
        <div className="mb-3">
          <label className="block text-sm font-semibold text-gray-700 mb-1">お名前（任意）</label>
          <input
            type="text" placeholder="例：田中 太郎" value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* 物件タイプ */}
        <div className="mb-3">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            物件タイプ <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {(["マンション", "アパート", "一戸建て"] as BuildingType[]).map((t) => (
              <ChipButton
                key={t} label={t} selected={form.buildingType === t}
                onClick={() => {
                  setForm({ ...INITIAL_FORM, name: form.name, buildingType: t });
                  setGeneratedUrl(null);
                }}
              />
            ))}
          </div>
        </div>

        {/* タイプ選択後だけ表示 */}
        {form.buildingType && (
          <>
            {/* ── 物件条件 ── */}
            <SectionTitle>物件条件</SectionTitle>

            {/* 入居希望時期 */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                入居希望時期 <span className="text-red-500">*</span>
              </label>
              <select
                required value={form.moveIn} onChange={(e) => set("moveIn", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">選択してください</option>
                {moveInOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            {/* 家賃 */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                家賃（管理費込） <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="number" placeholder="下限なし" value={form.rentMin}
                    onChange={(e) => set("rentMin", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="absolute right-3 top-2 text-gray-400 text-xs">円〜</span>
                </div>
                <div className="relative flex-1">
                  <input
                    required type="number" placeholder="上限（必須）" value={form.rentMax}
                    onChange={(e) => set("rentMax", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="absolute right-3 top-2 text-gray-400 text-xs">円</span>
                </div>
              </div>
            </div>

            {/* 間取り */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">間取り</label>
              <div className="flex flex-wrap gap-1.5">
                {layoutOptions.map((o) => (
                  <ChipButton key={o} label={o} selected={form.layouts.includes(o)} onClick={() => toggleLayout(o)} />
                ))}
              </div>
            </div>

            {/* 専有面積 */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isHouse ? "延床面積" : "専有面積"}（下限）
              </label>
              <div className="flex flex-wrap gap-1.5">
                {AREA_OPTIONS.map((o) => (
                  <ChipButton key={o} label={o} selected={form.areaMin === o} onClick={() => set("areaMin", o)} />
                ))}
              </div>
            </div>

            {/* 希望エリア */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                希望エリア・路線・駅 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text" placeholder="例：渋谷区、目黒駅、東横線沿い"
                  value={areaInput} onChange={(e) => setAreaInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addArea(); } }}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button type="button" onClick={addArea}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-200 text-sm">追加</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.areas.map((a) => (
                  <span key={a} className="flex items-center gap-1 bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                    {a}
                    <button type="button" onClick={() => setForm((f) => ({ ...f, areas: f.areas.filter((x) => x !== a) }))}
                      className="ml-1 text-blue-400 hover:text-blue-700 leading-none">×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* 駅徒歩 */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">駅徒歩</label>
              <div className="flex flex-wrap gap-1.5">
                {WALK_OPTIONS.map((o) => (
                  <ChipButton key={o} label={o} selected={form.walkMax === o} onClick={() => set("walkMax", o)} />
                ))}
              </div>
            </div>

            {/* 築年数 */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">築年数</label>
              <div className="flex flex-wrap gap-1.5">
                {AGE_OPTIONS.map((o) => (
                  <ChipButton key={o} label={o} selected={form.ageMax === o} onClick={() => set("ageMax", o)} />
                ))}
              </div>
            </div>

            {/* ── マンション/アパート専用 ── */}
            {isMansionOrApart && (
              <>
                <SectionTitle>マンション・アパート条件</SectionTitle>

                <div className="mb-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">階数（下限）</label>
                  <div className="flex flex-wrap gap-1.5">
                    {FLOOR_OPTIONS.map((o) => (
                      <ChipButton key={o} label={o} selected={form.floorMin === o} onClick={() => set("floorMin", o)} />
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">向き</label>
                  <div className="flex flex-wrap gap-1.5">
                    {DIRECTION_OPTIONS.map((o) => (
                      <ChipButton key={o} label={o} selected={form.direction === o} onClick={() => set("direction", o)} />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── 一戸建て専用 ── */}
            {isHouse && (
              <>
                <SectionTitle>一戸建て条件</SectionTitle>

                <div className="mb-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">駐車場</label>
                  <div className="flex flex-wrap gap-1.5">
                    {PARKING_OPTIONS.map((o) => (
                      <ChipButton key={o} label={o} selected={form.parking === o} onClick={() => set("parking", o)} />
                    ))}
                  </div>
                </div>

                <div className="mb-3 flex flex-col gap-2">
                  <CheckItem label="庭あり" checked={form.hasGarden} onChange={(v) => set("hasGarden", v)} />
                  <CheckItem label="ガレージ付き" checked={form.hasGarage} onChange={(v) => set("hasGarage", v)} />
                </div>
              </>
            )}

            {/* ── こだわり条件 ── */}
            <SectionTitle>こだわり条件</SectionTitle>

            {/* 初期費用 */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">初期費用</p>
              <div className="grid grid-cols-2 gap-2">
                <CheckItem label="礼金なし" checked={form.reikinNone} onChange={(v) => set("reikinNone", v)} />
                <CheckItem label="敷金なし" checked={form.shikikinNone} onChange={(v) => set("shikikinNone", v)} />
                <CheckItem label="フリーレント" checked={form.freeRent} onChange={(v) => set("freeRent", v)} />
                <CheckItem label="保証人不要" checked={form.guarantorFree} onChange={(v) => set("guarantorFree", v)} />
              </div>
            </div>

            {/* 入居条件 */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">入居条件</p>
              <div className="grid grid-cols-2 gap-2">
                <CheckItem label="ペット可" checked={form.pet} onChange={(v) => set("pet", v)} />
                <CheckItem label="楽器可" checked={form.instrument} onChange={(v) => set("instrument", v)} />
                <CheckItem label="二人入居可" checked={form.twoPersonOk} onChange={(v) => set("twoPersonOk", v)} />
                <CheckItem label="DIY可" checked={form.diy} onChange={(v) => set("diy", v)} />
              </div>
            </div>

            {/* 設備 */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">設備</p>
              <div className="grid grid-cols-2 gap-2">
                <CheckItem label="バス・トイレ別" checked={form.separateBath} onChange={(v) => set("separateBath", v)} />
                <CheckItem label="室内洗濯機置き場" checked={form.washerIndoor} onChange={(v) => set("washerIndoor", v)} />
                <CheckItem label="エアコン付き" checked={form.aircon} onChange={(v) => set("aircon", v)} />
                <CheckItem label="インターネット無料" checked={form.internetFree} onChange={(v) => set("internetFree", v)} />
                {isMansionOrApart && (
                  <>
                    <CheckItem label="オートロック" checked={form.autolock} onChange={(v) => set("autolock", v)} />
                    <CheckItem label="宅配ボックス" checked={form.deliveryBox} onChange={(v) => set("deliveryBox", v)} />
                  </>
                )}
                <CheckItem label="システムキッチン" checked={form.systemKitchen} onChange={(v) => set("systemKitchen", v)} />
                <CheckItem label="IHコンロ" checked={form.ihCooktop} onChange={(v) => set("ihCooktop", v)} />
                <CheckItem label="追い焚き" checked={form.reheating} onChange={(v) => set("reheating", v)} />
                <CheckItem label="浴室乾燥機" checked={form.bathDryer} onChange={(v) => set("bathDryer", v)} />
                <CheckItem label="床暖房" checked={form.floorHeating} onChange={(v) => set("floorHeating", v)} />
                <CheckItem label="ウォシュレット" checked={form.washlet} onChange={(v) => set("washlet", v)} />
                {!isHouse && (
                  <CheckItem label="駐車場あり" checked={form.parking !== "不要" && form.parking !== "問わない"} onChange={(v) => set("parking", v ? "1台" : "問わない")} />
                )}
              </div>
            </div>

            {/* フリーコメント */}
            <SectionTitle>その他</SectionTitle>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">一言メモ（任意）</label>
              <textarea
                placeholder="例：日当たり重視、南向き希望、静かな環境希望"
                value={form.notes} onChange={(e) => set("notes", e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-colors shadow-md"
            >
              QRコードを生成する
            </button>
          </>
        )}
      </form>

      {generatedUrl && (
        <div id="qr-section" className="mt-10">
          <QRDisplay url={generatedUrl} />
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-8">
        入力した条件はサーバーに保存されません。URLのみで条件を共有します。
      </p>
    </div>
  );
}
