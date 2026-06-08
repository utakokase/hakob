"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

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
  // マンション/アパート
  floorMin?: string;
  direction?: string;
  // 一戸建て
  parking?: string;
  hasGarden?: boolean;
  hasGarage?: boolean;
  // こだわり
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

const LABEL_MAP: Record<string, string> = {
  separateBath: "バス・トイレ別",
  pet: "ペット可",
  instrument: "楽器可",
  twoPersonOk: "二人入居可",
  reikinNone: "礼金なし",
  shikikinNone: "敷金なし",
  freeRent: "フリーレント",
  internetFree: "ネット無料",
  washerIndoor: "室内洗濯機置き場",
  aircon: "エアコン付き",
  autolock: "オートロック",
  deliveryBox: "宅配ボックス",
  bathDryer: "浴室乾燥機",
  floorHeating: "床暖房",
  reheating: "追い焚き",
  washlet: "ウォシュレット",
  systemKitchen: "システムキッチン",
  ihCooktop: "IHコンロ",
  guarantorFree: "保証人不要",
  diy: "DIY可",
  hasGarden: "庭あり",
  hasGarage: "ガレージ付き",
};

function Badge({ children, color = "blue" }: { children: React.ReactNode; color?: "blue" | "yellow" | "green" | "gray" }) {
  const colors = {
    blue: "bg-blue-600 text-white",
    yellow: "bg-yellow-400 text-gray-900",
    green: "bg-green-700 text-white",
    gray: "bg-gray-700 text-white",
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-5">
      <div className="text-xs text-gray-400 mb-2 font-semibold tracking-wide uppercase">{title}</div>
      {children}
    </div>
  );
}

function ViewContent() {
  const params = useSearchParams();
  const d = params.get("d");

  if (!d) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-gray-400">URLが正しくありません</p>
      </div>
    );
  }

  let data: ConditionData;
  try {
    const binary = atob(d);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    data = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-gray-400">データを読み込めませんでした</p>
      </div>
    );
  }

  // こだわり条件を収集
  const checkedOptions = Object.entries(LABEL_MAP)
    .filter(([key]) => data[key as keyof ConditionData] === true)
    .map(([, label]) => label);

  const isMansionOrApart = data.buildingType === "マンション" || data.buildingType === "アパート";
  const isHouse = data.buildingType === "一戸建て";

  const rentDisplay = (() => {
    if (data.rentMin && data.rentMax) return `${Number(data.rentMin).toLocaleString()}〜${Number(data.rentMax).toLocaleString()}円`;
    if (data.rentMax) return `〜${Number(data.rentMax).toLocaleString()}円`;
    return "未入力";
  })();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ヘッダー */}
      <div className="bg-blue-600 px-5 py-4 flex items-start justify-between">
        <div>
          <div className="text-xs text-blue-200 font-semibold tracking-widest uppercase mb-0.5">RoomPass</div>
          <div className="text-xl font-bold leading-snug">
            {data.name ? `${data.name} 様の希望条件` : "お客様の希望条件"}
          </div>
          {data.buildingType && (
            <div className="mt-1">
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">{data.buildingType}</span>
            </div>
          )}
        </div>
        <a href="/" className="text-xs text-blue-200 underline mt-1 whitespace-nowrap">自分のを作る</a>
      </div>

      <div className="px-4 py-5 space-y-4 max-w-xl mx-auto">

        {/* 入居時期・家賃 */}
        <div className="grid grid-cols-2 gap-3">
          <Card title="入居希望時期">
            <div className="text-2xl font-bold text-yellow-400 leading-tight">{data.moveIn || "未入力"}</div>
          </Card>
          <Card title="家賃上限（管理費込）">
            <div className="text-xl font-bold text-yellow-400 leading-tight">{rentDisplay}</div>
          </Card>
        </div>

        {/* 間取り・面積 */}
        {(data.layouts?.length || data.areaMin) && (
          <Card title="間取り・面積">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {data.layouts?.map((l) => <Badge key={l} color="blue">{l}</Badge>)}
            </div>
            {data.areaMin && data.areaMin !== "問わない" && (
              <div className="text-sm text-gray-300">面積 {data.areaMin} 以上</div>
            )}
          </Card>
        )}

        {/* 希望エリア */}
        {data.areas?.length ? (
          <Card title="希望エリア・路線・駅">
            <div className="flex flex-wrap gap-1.5">
              {data.areas.map((a) => <Badge key={a} color="gray">{a}</Badge>)}
            </div>
          </Card>
        ) : null}

        {/* 詳細条件 */}
        <Card title="詳細条件">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <div className="text-xs text-gray-500">駅徒歩</div>
              <div className="text-sm font-semibold">{data.walkMax || "問わない"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">築年数</div>
              <div className="text-sm font-semibold">{data.ageMax || "問わない"}</div>
            </div>
            {isMansionOrApart && (
              <>
                <div>
                  <div className="text-xs text-gray-500">階数</div>
                  <div className="text-sm font-semibold">{data.floorMin || "問わない"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">向き</div>
                  <div className="text-sm font-semibold">{data.direction || "問わない"}</div>
                </div>
              </>
            )}
            {isHouse && (
              <div>
                <div className="text-xs text-gray-500">駐車場</div>
                <div className="text-sm font-semibold">{data.parking || "問わない"}</div>
              </div>
            )}
          </div>
        </Card>

        {/* こだわり条件 */}
        {checkedOptions.length > 0 && (
          <Card title="こだわり条件">
            <div className="flex flex-wrap gap-1.5">
              {checkedOptions.map((v) => <Badge key={v} color="green">{v}</Badge>)}
            </div>
          </Card>
        )}

        {/* フリーコメント */}
        {data.notes && (
          <Card title="その他・メモ">
            <div className="text-sm leading-relaxed">{data.notes}</div>
          </Card>
        )}

        <p className="text-center text-xs text-gray-600 pt-1 pb-4">
          このページはRoomPassで生成されました
        </p>
      </div>
    </div>
  );
}

export default function ViewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        読み込み中...
      </div>
    }>
      <ViewContent />
    </Suspense>
  );
}
