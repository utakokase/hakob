"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { decodeData } from "@/lib/codec";
import { useLang } from "@/lib/i18n/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type ConditionData = {
  name?: string;
  buildingType?: string;
  moveIn?: string;
  rentMax?: string;
  rentMin?: string;
  layouts?: string[];
  areaMin?: string;
  areas?: string[];
  walkMax?: string;
  ageMax?: string;
  floorMin?: string;
  direction?: string;
  parking?: string;
  hasGarden?: boolean;
  hasGarage?: boolean;
  separateBath?: boolean;
  pet?: boolean;
  instrument?: boolean;
  twoPersonOk?: boolean;
  reikinNone?: boolean;
  shikikinNone?: boolean;
  freeRent?: boolean;
  internetFree?: boolean;
  washerIndoor?: boolean;
  aircon?: boolean;
  autolock?: boolean;
  deliveryBox?: boolean;
  bathDryer?: boolean;
  floorHeating?: boolean;
  reheating?: boolean;
  washlet?: boolean;
  systemKitchen?: boolean;
  ihCooktop?: boolean;
  guarantorFree?: boolean;
  diy?: boolean;
  notes?: string;
};

const PREF_KEYS = [
  "separateBath","pet","instrument","twoPersonOk","reikinNone","shikikinNone",
  "freeRent","internetFree","washerIndoor","aircon","autolock","deliveryBox",
  "bathDryer","floorHeating","reheating","washlet","systemKitchen","ihCooktop",
  "guarantorFree","diy","hasGarden","hasGarage",
];

function Badge({ children, color = "blue" }: { children: React.ReactNode; color?: "blue"|"green"|"gray" }) {
  const cls = { blue: "bg-blue-600 text-white", green: "bg-green-700 text-white", gray: "bg-gray-700 text-white" };
  return <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${cls[color]}`}>{children}</span>;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-5">
      <div className="text-xs text-gray-400 mb-2 font-semibold tracking-wide uppercase">{title}</div>
      {children}
    </div>
  );
}

// 入居時期キー → 表示文字列
function formatMoveIn(key: string, asapLabel: string, undecidedLabel: string, lang: string): string {
  if (!key) return "—";
  if (key === "asap") return asapLabel;
  if (key === "undecided") return undecidedLabel;
  const [year, month] = key.split("-");
  if (lang === "en") return `${new Date(Number(year), Number(month)-1).toLocaleString("en", { month: "long" })} ${year}`;
  if (lang === "zh") return `${year}年${month}月`;
  return `${year}年${month}月`;
}

function ViewContent() {
  const params = useSearchParams();
  const d = params.get("d");
  const { t, lang } = useLang();
  const [data, setData] = useState<ConditionData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!d) { setError(true); return; }
    decodeData<ConditionData>(d).then(setData).catch(() => setError(true));
  }, [d]);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <p className="text-gray-400">{!d ? t.view.errorUrl : t.view.errorData}</p>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {t.common.loading}
    </div>
  );

  const checkedOptions = PREF_KEYS
    .filter((k) => data[k as keyof ConditionData] === true)
    .map((k) => t.view.pLabels[k])
    .filter(Boolean);

  const isMansionOrApart = data.buildingType === "mansion" || data.buildingType === "apartment";
  const isHouse = data.buildingType === "house";

  const rentDisplay = (() => {
    const fmt = (n: string) => Number(n).toLocaleString();
    if (data.rentMin && data.rentMax) return `${fmt(data.rentMin)} ~ ${fmt(data.rentMax)}¥`;
    if (data.rentMax) return `~ ${fmt(data.rentMax)}¥`;
    return "—";
  })();

  const buildingLabel = data.buildingType
    ? t.view.buildingTypes[data.buildingType as keyof typeof t.view.buildingTypes]
    : undefined;

  const moveInLabel = data.moveIn
    ? formatMoveIn(data.moveIn, t.view.moveInAsap, t.view.moveInUndecided, lang)
    : "—";

  const opt = (map: Record<string, string>, key?: string) => key ? (map[key] ?? key) : "—";

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ヘッダー */}
      <div className="bg-blue-600 px-5 py-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="text-xs text-blue-200 font-semibold tracking-widest uppercase mb-0.5">Hakob</div>
            <div className="text-xl font-bold leading-snug">
              {data.name ? `${data.name}${t.view.conditions}` : t.view.guestConditions}
            </div>
            {buildingLabel && (
              <div className="mt-1">
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">{buildingLabel}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <LanguageSwitcher />
            <a href="/" className="text-xs text-blue-200 underline">{t.view.createOwn}</a>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 space-y-4 max-w-xl mx-auto">
        {/* 入居時期・家賃 */}
        <div className="grid grid-cols-2 gap-3">
          <Card title={t.view.moveIn}>
            <div className="text-2xl font-bold text-yellow-400 leading-tight">{moveInLabel}</div>
          </Card>
          <Card title={t.view.rent}>
            <div className="text-xl font-bold text-yellow-400 leading-tight">{rentDisplay}</div>
          </Card>
        </div>

        {/* 間取り・面積 */}
        {(data.layouts?.length || (data.areaMin && data.areaMin !== "any")) && (
          <Card title={t.view.layoutArea}>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {data.layouts?.map((l) => <Badge key={l} color="blue">{l}</Badge>)}
            </div>
            {data.areaMin && data.areaMin !== "any" && (
              <div className="text-sm text-gray-300">
                {opt(t.view.areaOptions, data.areaMin)} {t.view.areaAbove}
              </div>
            )}
          </Card>
        )}

        {/* 希望エリア */}
        {data.areas?.length ? (
          <Card title={t.view.desiredArea}>
            <div className="flex flex-wrap gap-1.5">
              {data.areas.map((a) => <Badge key={a} color="gray">{a}</Badge>)}
            </div>
          </Card>
        ) : null}

        {/* 詳細条件 */}
        <Card title={t.view.details}>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <div className="text-xs text-gray-500">{t.view.walk}</div>
              <div className="text-sm font-semibold">{opt(t.view.walkOptions, data.walkMax)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">{t.view.age}</div>
              <div className="text-sm font-semibold">{opt(t.view.ageOptions, data.ageMax)}</div>
            </div>
            {isMansionOrApart && (
              <>
                <div>
                  <div className="text-xs text-gray-500">{t.view.floorMin}</div>
                  <div className="text-sm font-semibold">{opt(t.view.floorOptions, data.floorMin)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">{t.view.direction}</div>
                  <div className="text-sm font-semibold">{opt(t.view.directionOptions, data.direction)}</div>
                </div>
              </>
            )}
            {isHouse && (
              <div>
                <div className="text-xs text-gray-500">{t.view.parking}</div>
                <div className="text-sm font-semibold">{opt(t.view.parkingOptions, data.parking)}</div>
              </div>
            )}
          </div>
        </Card>

        {/* こだわり条件 */}
        {checkedOptions.length > 0 && (
          <Card title={t.view.preferences}>
            <div className="flex flex-wrap gap-1.5">
              {checkedOptions.map((v) => <Badge key={v} color="green">{v}</Badge>)}
            </div>
          </Card>
        )}

        {/* フリーコメント */}
        {data.notes && (
          <Card title={t.view.notes}>
            <div className="text-sm leading-relaxed">{data.notes}</div>
          </Card>
        )}

        <p className="text-center text-xs text-gray-600 pt-1 pb-4">{t.view.footer}</p>
      </div>
    </div>
  );
}

export default function ViewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    }>
      <ViewContent />
    </Suspense>
  );
}
