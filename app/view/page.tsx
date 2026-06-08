"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type ConditionData = {
  name?: string;
  moveIn?: string;
  rentMax?: string;
  layouts?: string[];
  areas?: string[];
  walkMax?: string;
  ageMax?: string;
  floor?: string;
  separateBath?: boolean;
  pet?: boolean;
  parking?: boolean;
  twoPersonOk?: boolean;
  notes?: string;
};

function ViewContent() {
  const params = useSearchParams();
  const d = params.get("d");

  if (!d) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">URLが正しくありません</p>
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">データを読み込めませんでした</p>
      </div>
    );
  }

  const options: { label: string; value: string }[] = [];
  if (data.separateBath) options.push({ label: "✓", value: "バス・トイレ別" });
  if (data.pet) options.push({ label: "✓", value: "ペット可" });
  if (data.parking) options.push({ label: "✓", value: "駐車場あり" });
  if (data.twoPersonOk) options.push({ label: "✓", value: "二人入居可" });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ヘッダー */}
      <div className="bg-blue-600 px-5 py-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-blue-200 font-medium tracking-widest uppercase">RoomPass</div>
          <div className="text-xl font-bold">
            {data.name ? `${data.name} 様の希望条件` : "お客様の希望条件"}
          </div>
        </div>
        <a
          href="/"
          className="text-xs text-blue-200 underline"
        >
          自分のRoomPassを作る
        </a>
      </div>

      <div className="px-5 py-6 space-y-4 max-w-xl mx-auto">
        {/* 入居時期・家賃（大きく） */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-2xl p-5">
            <div className="text-xs text-gray-400 mb-1">入居希望時期</div>
            <div className="text-2xl font-bold text-yellow-400">{data.moveIn || "未入力"}</div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-5">
            <div className="text-xs text-gray-400 mb-1">賃料上限（管理費込）</div>
            <div className="text-2xl font-bold text-yellow-400">
              {data.rentMax
                ? `${Number(data.rentMax).toLocaleString()}円`
                : "未入力"}
            </div>
          </div>
        </div>

        {/* 間取り */}
        <div className="bg-gray-800 rounded-2xl p-5">
          <div className="text-xs text-gray-400 mb-2">間取り</div>
          <div className="flex flex-wrap gap-2">
            {data.layouts && data.layouts.length > 0 ? (
              data.layouts.map((l) => (
                <span key={l} className="bg-blue-600 text-white px-4 py-1 rounded-full text-lg font-semibold">
                  {l}
                </span>
              ))
            ) : (
              <span className="text-gray-500">未入力</span>
            )}
          </div>
        </div>

        {/* 希望エリア */}
        <div className="bg-gray-800 rounded-2xl p-5">
          <div className="text-xs text-gray-400 mb-2">希望エリア</div>
          <div className="flex flex-wrap gap-2">
            {data.areas && data.areas.length > 0 ? (
              data.areas.map((a) => (
                <span key={a} className="bg-gray-700 text-white px-4 py-1 rounded-full text-base font-medium">
                  {a}
                </span>
              ))
            ) : (
              <span className="text-gray-500">未入力</span>
            )}
          </div>
        </div>

        {/* 詳細条件 */}
        <div className="bg-gray-800 rounded-2xl p-5">
          <div className="text-xs text-gray-400 mb-3">詳細条件</div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <div className="text-xs text-gray-500">駅徒歩</div>
              <div className="text-base font-semibold">{data.walkMax || "問わない"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">築年数</div>
              <div className="text-base font-semibold">{data.ageMax || "問わない"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">階数</div>
              <div className="text-base font-semibold">{data.floor || "問わない"}</div>
            </div>
          </div>
        </div>

        {/* こだわり */}
        {options.length > 0 && (
          <div className="bg-gray-800 rounded-2xl p-5">
            <div className="text-xs text-gray-400 mb-2">こだわり条件</div>
            <div className="flex flex-wrap gap-2">
              {options.map(({ value }) => (
                <span key={value} className="bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {value}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* フリーコメント */}
        {data.notes && (
          <div className="bg-gray-800 rounded-2xl p-5">
            <div className="text-xs text-gray-400 mb-2">その他・一言メモ</div>
            <div className="text-base leading-relaxed">{data.notes}</div>
          </div>
        )}

        <p className="text-center text-xs text-gray-600 pt-2">
          このページはRoomPassで生成されました
        </p>
      </div>
    </div>
  );
}

export default function ViewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">読み込み中...</div>}>
      <ViewContent />
    </Suspense>
  );
}
