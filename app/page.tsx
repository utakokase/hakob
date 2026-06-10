"use client";

import { useState } from "react";
import QRDisplay from "@/components/QRDisplay";
import { encodeData } from "@/lib/codec";
import { useLang } from "@/lib/i18n/context";

type BuildingType = "mansion" | "house" | "";

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
  floorMin: string;
  directions: string[];
  parking: string;
  hasGarden: boolean;
  hasGarage: boolean;
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

const LAYOUTS_MANSION = ["1R", "1K", "1DK", "1LDK", "2K", "2DK", "2LDK", "3K", "3DK", "3LDK", "4LDK+"];
const LAYOUTS_HOUSE   = ["1DK", "1LDK", "2DK", "2LDK", "3DK", "3LDK", "4LDK", "5K+"];

const INITIAL_FORM: FormData = {
  name: "", buildingType: "", moveIn: "", rentMax: "", rentMin: "",
  layouts: [], areaMin: "any", areas: [], walkMax: "10min", ageMax: "any",
  floorMin: "any", directions: [], parking: "any",
  hasGarden: false, hasGarage: false, separateBath: false, pet: false,
  instrument: false, twoPersonOk: false, reikinNone: false, shikikinNone: false,
  freeRent: false, internetFree: false, washerIndoor: false, aircon: false,
  autolock: false, deliveryBox: false, bathDryer: false, floorHeating: false,
  reheating: false, washlet: false, systemKitchen: false, ihCooktop: false,
  guarantorFree: false, diy: false, notes: "",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 mt-6 border-b border-blue-100 pb-1">
      {children}
    </h2>
  );
}

function ChipButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
        selected ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
      }`}>
      {label}
    </button>
  );
}

function CheckItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-blue-600 rounded" />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

export default function Home() {
  const { t } = useLang();
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [areaInput, setAreaInput] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const isMansionOrApart = form.buildingType === "mansion";
  const isHouse = form.buildingType === "house";

  const toggleDirection = (v: string) =>
    setForm((f) => ({
      ...f,
      directions: f.directions.includes(v) ? f.directions.filter((d) => d !== v) : [...f.directions, v],
    }));
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

  // 入居時期の選択肢を動的生成
  const moveInOptions = (() => {
    const opts: { key: string; label: string }[] = [
      { key: "asap", label: t.form.moveInAsap },
    ];
    const now = new Date();
    for (let i = 0; i <= 8; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      // 表示はロケール対応
      const label = t === undefined ? key :
        t.form === undefined ? key :
        // 日本語・中文は「年月」、英語は "Month Year"
        key; // 実際の表示はviewで行う（keyのまま保存）
      opts.push({ key, label: formatMoveIn(key, t.form.moveInAsap, t.form.moveInUndecided) });
    }
    opts.push({ key: "undecided", label: t.form.moveInUndecided });
    return opts;
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = await encodeData(form);
    const url = `${window.location.origin}/view?d=${encoded}`;
    setGeneratedUrl(url);
    setTimeout(() => document.getElementById("qr-section")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div className="max-w-lg mx-auto px-4 pb-8">
      <div className="text-center mb-6 pt-2">
        <h1 className="text-3xl font-bold text-blue-600 mb-1">Hakob</h1>
        <p className="text-gray-500 text-sm">{t.common.tagline}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-1">
        <SectionTitle>{t.form.sBasic}</SectionTitle>

        {/* 名前 */}
        <div className="mb-3">
          <label className="block text-sm font-semibold text-gray-700 mb-1">{t.form.name}</label>
          <input type="text" placeholder={t.form.namePlaceholder} value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        {/* 物件タイプ */}
        <div className="mb-3">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t.form.buildingType} <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            {(["mansion", "house"] as BuildingType[]).map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="buildingType"
                  value={type}
                  checked={form.buildingType === type}
                  onChange={() => { setForm({ ...INITIAL_FORM, name: form.name, buildingType: type }); setGeneratedUrl(null); }}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">
                  {t.form.buildingTypes[type as keyof typeof t.form.buildingTypes]}
                </span>
              </label>
            ))}
          </div>
        </div>

        {form.buildingType && (
          <>
            <SectionTitle>{t.form.sProperty}</SectionTitle>

            {/* 入居希望時期 */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t.form.moveIn} <span className="text-red-500">*</span>
              </label>
              <select required value={form.moveIn} onChange={(e) => set("moveIn", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">{t.form.moveInPlaceholder}</option>
                {moveInOptions.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
              </select>
            </div>

            {/* 家賃 */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t.form.rent} <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input type="number" placeholder={t.form.rentMinPlaceholder} value={form.rentMin}
                    onChange={(e) => set("rentMin", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  <span className="absolute right-2 top-2 text-gray-400 text-xs">{t.form.rentUnit}</span>
                </div>
                <div className="relative flex-1">
                  <input required type="number" placeholder={t.form.rentMaxPlaceholder} value={form.rentMax}
                    onChange={(e) => set("rentMax", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-6 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  <span className="absolute right-2 top-2 text-gray-400 text-xs">{t.form.rentSuffix}</span>
                </div>
              </div>
            </div>

            {/* 間取り */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.form.layouts}</label>
              <div className="flex flex-wrap gap-1.5">
                {layoutOptions.map((o) => (
                  <ChipButton key={o} label={o} selected={form.layouts.includes(o)} onClick={() => toggleLayout(o)} />
                ))}
              </div>
            </div>

            {/* 専有面積 */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isHouse ? t.form.areaHouse : t.form.area}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(t.form.areaOptions).map(([key, label]) => (
                  <ChipButton key={key} label={label} selected={form.areaMin === key} onClick={() => set("areaMin", key)} />
                ))}
              </div>
            </div>

            {/* 希望エリア */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t.form.areas} <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 mb-2">
                <input type="text" placeholder={t.form.areasPlaceholder} value={areaInput}
                  onChange={(e) => setAreaInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addArea(); } }}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button type="button" onClick={addArea}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-200 text-sm">
                  {t.form.areasAdd}
                </button>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.form.walk}</label>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(t.form.walkOptions).map(([key, label]) => (
                  <ChipButton key={key} label={label} selected={form.walkMax === key} onClick={() => set("walkMax", key)} />
                ))}
              </div>
            </div>

            {/* 築年数 */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.form.age}</label>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(t.form.ageOptions).map(([key, label]) => (
                  <ChipButton key={key} label={label} selected={form.ageMax === key} onClick={() => set("ageMax", key)} />
                ))}
              </div>
            </div>

            {/* マンション/アパート専用 */}
            {isMansionOrApart && (
              <>
                <SectionTitle>{t.form.sMansion}</SectionTitle>
                <div className="mb-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.form.floorMin}</label>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(t.form.floorOptions).map(([key, label]) => (
                      <ChipButton key={key} label={label} selected={form.floorMin === key} onClick={() => set("floorMin", key)} />
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.form.direction}</label>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(t.form.directionOptions).map(([key, label]) => (
                      <ChipButton key={key} label={label} selected={form.directions.includes(key)} onClick={() => toggleDirection(key)} />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* 一戸建て専用 */}
            {isHouse && (
              <>
                <SectionTitle>{t.form.sHouse}</SectionTitle>
                <div className="mb-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.form.parking}</label>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(t.form.parkingOptions).map(([key, label]) => (
                      <ChipButton key={key} label={label} selected={form.parking === key} onClick={() => set("parking", key)} />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-3">
                  <CheckItem label={t.form.garden} checked={form.hasGarden} onChange={(v) => set("hasGarden", v)} />
                  <CheckItem label={t.form.garage} checked={form.hasGarage} onChange={(v) => set("hasGarage", v)} />
                </div>
              </>
            )}

            {/* こだわり条件 */}
            <SectionTitle>{t.form.sPreferences}</SectionTitle>

            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">{t.form.pInitialCost}</p>
              <div className="grid grid-cols-2 gap-2">
                <CheckItem label={t.form.reikinNone} checked={form.reikinNone} onChange={(v) => set("reikinNone", v)} />
                <CheckItem label={t.form.shikikinNone} checked={form.shikikinNone} onChange={(v) => set("shikikinNone", v)} />
                <CheckItem label={t.form.freeRent} checked={form.freeRent} onChange={(v) => set("freeRent", v)} />
                <CheckItem label={t.form.guarantorFree} checked={form.guarantorFree} onChange={(v) => set("guarantorFree", v)} />
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">{t.form.pEntry}</p>
              <div className="grid grid-cols-2 gap-2">
                <CheckItem label={t.form.pet} checked={form.pet} onChange={(v) => set("pet", v)} />
                <CheckItem label={t.form.instrument} checked={form.instrument} onChange={(v) => set("instrument", v)} />
                <CheckItem label={t.form.twoPersonOk} checked={form.twoPersonOk} onChange={(v) => set("twoPersonOk", v)} />
                <CheckItem label={t.form.diy} checked={form.diy} onChange={(v) => set("diy", v)} />
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">{t.form.pFacilities}</p>
              <div className="grid grid-cols-2 gap-2">
                <CheckItem label={t.form.separateBath} checked={form.separateBath} onChange={(v) => set("separateBath", v)} />
                <CheckItem label={t.form.washerIndoor} checked={form.washerIndoor} onChange={(v) => set("washerIndoor", v)} />
                <CheckItem label={t.form.aircon} checked={form.aircon} onChange={(v) => set("aircon", v)} />
                <CheckItem label={t.form.internetFree} checked={form.internetFree} onChange={(v) => set("internetFree", v)} />
                {isMansionOrApart && (
                  <>
                    <CheckItem label={t.form.autolock} checked={form.autolock} onChange={(v) => set("autolock", v)} />
                    <CheckItem label={t.form.deliveryBox} checked={form.deliveryBox} onChange={(v) => set("deliveryBox", v)} />
                  </>
                )}
                <CheckItem label={t.form.systemKitchen} checked={form.systemKitchen} onChange={(v) => set("systemKitchen", v)} />
                <CheckItem label={t.form.ihCooktop} checked={form.ihCooktop} onChange={(v) => set("ihCooktop", v)} />
                <CheckItem label={t.form.reheating} checked={form.reheating} onChange={(v) => set("reheating", v)} />
                <CheckItem label={t.form.bathDryer} checked={form.bathDryer} onChange={(v) => set("bathDryer", v)} />
                <CheckItem label={t.form.floorHeating} checked={form.floorHeating} onChange={(v) => set("floorHeating", v)} />
                <CheckItem label={t.form.washlet} checked={form.washlet} onChange={(v) => set("washlet", v)} />
                {isMansionOrApart && (
                  <CheckItem label={t.form.parkingAvailable}
                    checked={form.parking !== "none" && form.parking !== "any"}
                    onChange={(v) => set("parking", v ? "1car" : "any")} />
                )}
              </div>
            </div>

            <SectionTitle>{t.form.sOther}</SectionTitle>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.form.notes}</label>
              <textarea placeholder={t.form.notesPlaceholder} value={form.notes}
                onChange={(e) => set("notes", e.target.value)} rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
            </div>

            <button type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-colors shadow-md">
              {t.form.submit}
            </button>
          </>
        )}
      </form>

      {generatedUrl && (
        <div id="qr-section" className="mt-10">
          <QRDisplay url={generatedUrl} />
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-8">{t.common.privacy}</p>
    </div>
  );
}

// 入居時期キー → 表示文字列
function formatMoveIn(key: string, asapLabel: string, undecidedLabel: string): string {
  if (key === "asap") return asapLabel;
  if (key === "undecided") return undecidedLabel;
  const [year, month] = key.split("-");
  return `${year}年${month}月`;
}
