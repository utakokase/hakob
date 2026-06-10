export type Lang = "ja" | "en" | "zh";

export type Translations = {
  common: {
    tagline: string;
    privacy: string;
    loading: string;
  };
  lang: {
    ja: string;
    en: string;
    zh: string;
  };
  form: {
    // sections
    sBasic: string;
    sProperty: string;
    sMansion: string;
    sHouse: string;
    sPreferences: string;
    sOther: string;
    // basic
    name: string;
    namePlaceholder: string;
    buildingType: string;
    buildingTypes: { mansion: string; apartment: string; house: string };
    moveIn: string;
    moveInPlaceholder: string;
    moveInAsap: string;
    moveInUndecided: string;
    // rent
    rent: string;
    rentMinPlaceholder: string;
    rentMaxPlaceholder: string;
    rentUnit: string;
    rentSuffix: string;
    // layout
    layouts: string;
    // area
    area: string;
    areaHouse: string;
    areaOptions: Record<string, string>;
    // location
    areas: string;
    areasPlaceholder: string;
    areasAdd: string;
    // walk
    walk: string;
    walkOptions: Record<string, string>;
    // age
    age: string;
    ageOptions: Record<string, string>;
    // mansion-specific
    floorMin: string;
    floorOptions: Record<string, string>;
    direction: string;
    directionOptions: Record<string, string>;
    // house-specific
    parking: string;
    parkingOptions: Record<string, string>;
    garden: string;
    garage: string;
    // preferences
    pInitialCost: string;
    pEntry: string;
    pFacilities: string;
    reikinNone: string;
    shikikinNone: string;
    freeRent: string;
    guarantorFree: string;
    pet: string;
    instrument: string;
    twoPersonOk: string;
    diy: string;
    separateBath: string;
    washerIndoor: string;
    aircon: string;
    internetFree: string;
    autolock: string;
    deliveryBox: string;
    systemKitchen: string;
    ihCooktop: string;
    reheating: string;
    bathDryer: string;
    floorHeating: string;
    washlet: string;
    parkingAvailable: string;
    // notes
    notes: string;
    notesPlaceholder: string;
    submit: string;
  };
  qr: {
    title: string;
    subtitle: string;
    copyUrl: string;
    copied: string;
    viewPage: string;
  };
  view: {
    conditions: string;
    guestConditions: string;
    createOwn: string;
    moveIn: string;
    rent: string;
    moveInAsap: string;
    moveInUndecided: string;
    layoutArea: string;
    areaAbove: string;
    desiredArea: string;
    details: string;
    walk: string;
    age: string;
    floorMin: string;
    direction: string;
    parking: string;
    preferences: string;
    notes: string;
    footer: string;
    errorUrl: string;
    errorData: string;
    // preference labels
    pLabels: Record<string, string>;
    // option labels (for display from stored keys)
    buildingTypes: { mansion: string; apartment: string; house: string };
    walkOptions: Record<string, string>;
    ageOptions: Record<string, string>;
    areaOptions: Record<string, string>;
    floorOptions: Record<string, string>;
    directionOptions: Record<string, string>;
    parkingOptions: Record<string, string>;
  };
};

// ─── 日本語 ───────────────────────────────────────────
const ja: Translations = {
  common: {
    tagline: "希望条件を入力 → QRを不動産屋に見せるだけ",
    privacy: "入力した条件はサーバーに保存されません。URLのみで条件を共有します。",
    loading: "読み込み中...",
  },
  lang: { ja: "日本語", en: "English", zh: "中文" },
  form: {
    sBasic: "基本情報",
    sProperty: "物件条件",
    sMansion: "マンション・アパート条件",
    sHouse: "一戸建て条件",
    sPreferences: "こだわり条件",
    sOther: "その他",
    name: "お名前（任意）",
    namePlaceholder: "例：田中 太郎",
    buildingType: "物件タイプ",
    buildingTypes: { mansion: "マンション", apartment: "アパート", house: "一戸建て" },
    moveIn: "入居希望時期",
    moveInPlaceholder: "選択してください",
    moveInAsap: "できるだけ早く",
    moveInUndecided: "未定",
    rent: "家賃（管理費込）",
    rentMinPlaceholder: "下限なし",
    rentMaxPlaceholder: "上限（必須）",
    rentUnit: "円〜",
    rentSuffix: "円",
    layouts: "間取り",
    area: "専有面積（下限）",
    areaHouse: "延床面積（下限）",
    areaOptions: { "20m2": "〜20㎡", "25m2": "〜25㎡", "30m2": "〜30㎡", "40m2": "〜40㎡", "50m2": "〜50㎡", "60m2": "〜60㎡", "80m2": "〜80㎡", any: "問わない" },
    areas: "希望エリア・路線・駅",
    areasPlaceholder: "例：渋谷区、目黒駅、東横線沿い",
    areasAdd: "追加",
    walk: "駅徒歩",
    walkOptions: { "3min": "3分以内", "5min": "5分以内", "7min": "7分以内", "10min": "10分以内", "15min": "15分以内", "20min": "20分以内", any: "問わない" },
    age: "築年数",
    ageOptions: { new: "新築", "3y": "〜3年", "5y": "〜5年", "10y": "〜10年", "15y": "〜15年", "20y": "〜20年", "30y": "〜30年", any: "問わない" },
    floorMin: "階数（下限）",
    floorOptions: { "2f": "2階以上", "3f": "3階以上", "4f": "4階以上", top: "最上階", any: "問わない" },
    direction: "向き",
    directionOptions: { south: "南向き", east: "東向き", west: "西向き", se: "南東向き", sw: "南西向き", any: "問わない" },
    parking: "駐車場",
    parkingOptions: { none: "不要", "1car": "1台", "2cars": "2台以上", any: "問わない" },
    garden: "庭あり",
    garage: "ガレージ付き",
    pInitialCost: "初期費用",
    pEntry: "入居条件",
    pFacilities: "設備",
    reikinNone: "礼金なし",
    shikikinNone: "敷金なし",
    freeRent: "フリーレント",
    guarantorFree: "保証人不要",
    pet: "ペット可",
    instrument: "楽器可",
    twoPersonOk: "二人入居可",
    diy: "DIY可",
    separateBath: "バス・トイレ別",
    washerIndoor: "室内洗濯機置き場",
    aircon: "エアコン付き",
    internetFree: "インターネット無料",
    autolock: "オートロック",
    deliveryBox: "宅配ボックス",
    systemKitchen: "システムキッチン",
    ihCooktop: "IHコンロ",
    reheating: "追い焚き",
    bathDryer: "浴室乾燥機",
    floorHeating: "床暖房",
    washlet: "ウォシュレット",
    parkingAvailable: "駐車場あり",
    notes: "一言メモ（任意）",
    notesPlaceholder: "例：日当たり重視、静かな環境希望、収納多め",
    submit: "QRコードを生成する",
  },
  qr: {
    title: "あなたのRoomPassが完成しました",
    subtitle: "このQRコードを不動産屋に見せてください",
    copyUrl: "URLをコピー",
    copied: "コピーしました！",
    viewPage: "表示画面を確認",
  },
  view: {
    conditions: "様の希望条件",
    guestConditions: "お客様の希望条件",
    createOwn: "自分のを作る",
    moveIn: "入居希望時期",
    rent: "家賃（管理費込）",
    moveInAsap: "できるだけ早く",
    moveInUndecided: "未定",
    layoutArea: "間取り・面積",
    areaAbove: "以上",
    desiredArea: "希望エリア・路線・駅",
    details: "詳細条件",
    walk: "駅徒歩",
    age: "築年数",
    floorMin: "階数",
    direction: "向き",
    parking: "駐車場",
    preferences: "こだわり条件",
    notes: "その他・メモ",
    footer: "このページはRoomPassで生成されました",
    errorUrl: "URLが正しくありません",
    errorData: "データを読み込めませんでした",
    pLabels: {
      separateBath: "バス・トイレ別", pet: "ペット可", instrument: "楽器可",
      twoPersonOk: "二人入居可", reikinNone: "礼金なし", shikikinNone: "敷金なし",
      freeRent: "フリーレント", internetFree: "ネット無料", washerIndoor: "室内洗濯機置き場",
      aircon: "エアコン付き", autolock: "オートロック", deliveryBox: "宅配ボックス",
      bathDryer: "浴室乾燥機", floorHeating: "床暖房", reheating: "追い焚き",
      washlet: "ウォシュレット", systemKitchen: "システムキッチン", ihCooktop: "IHコンロ",
      guarantorFree: "保証人不要", diy: "DIY可", hasGarden: "庭あり", hasGarage: "ガレージ付き",
    },
    buildingTypes: { mansion: "マンション", apartment: "アパート", house: "一戸建て" },
    walkOptions: { "3min": "3分以内", "5min": "5分以内", "7min": "7分以内", "10min": "10分以内", "15min": "15分以内", "20min": "20分以内", any: "問わない" },
    ageOptions: { new: "新築", "3y": "〜3年", "5y": "〜5年", "10y": "〜10年", "15y": "〜15年", "20y": "〜20年", "30y": "〜30年", any: "問わない" },
    areaOptions: { "20m2": "〜20㎡", "25m2": "〜25㎡", "30m2": "〜30㎡", "40m2": "〜40㎡", "50m2": "〜50㎡", "60m2": "〜60㎡", "80m2": "〜80㎡", any: "問わない" },
    floorOptions: { "2f": "2階以上", "3f": "3階以上", "4f": "4階以上", top: "最上階", any: "問わない" },
    directionOptions: { south: "南向き", east: "東向き", west: "西向き", se: "南東向き", sw: "南西向き", any: "問わない" },
    parkingOptions: { none: "不要", "1car": "1台", "2cars": "2台以上", any: "問わない" },
  },
};

// ─── English ──────────────────────────────────────────
const en: Translations = {
  common: {
    tagline: "Fill in your requirements → Show QR to any agent",
    privacy: "Your conditions are not stored on any server. Shared via URL only.",
    loading: "Loading...",
  },
  lang: { ja: "日本語", en: "English", zh: "中文" },
  form: {
    sBasic: "Basic Info",
    sProperty: "Property Conditions",
    sMansion: "Apartment Conditions",
    sHouse: "House Conditions",
    sPreferences: "Preferences",
    sOther: "Other",
    name: "Your name (optional)",
    namePlaceholder: "e.g. Taro Tanaka",
    buildingType: "Property Type",
    buildingTypes: { mansion: "Apartment/Mansion", apartment: "Apartment (木造)", house: "House" },
    moveIn: "Desired Move-in Date",
    moveInPlaceholder: "Select...",
    moveInAsap: "As soon as possible",
    moveInUndecided: "Undecided",
    rent: "Rent (incl. maintenance fee)",
    rentMinPlaceholder: "No minimum",
    rentMaxPlaceholder: "Max (required)",
    rentUnit: "¥ ~",
    rentSuffix: "¥",
    layouts: "Floor Plan",
    area: "Floor Area (minimum)",
    areaHouse: "Total Floor Area (minimum)",
    areaOptions: { "20m2": "~20m²", "25m2": "~25m²", "30m2": "~30m²", "40m2": "~40m²", "50m2": "~50m²", "60m2": "~60m²", "80m2": "~80m²", any: "Any" },
    areas: "Desired Area / Line / Station",
    areasPlaceholder: "e.g. Shibuya, Meguro Station, Tokyu Line",
    areasAdd: "Add",
    walk: "Walk from Station",
    walkOptions: { "3min": "3 min", "5min": "5 min", "7min": "7 min", "10min": "10 min", "15min": "15 min", "20min": "20 min", any: "Any" },
    age: "Building Age",
    ageOptions: { new: "Brand new", "3y": "≤3 yrs", "5y": "≤5 yrs", "10y": "≤10 yrs", "15y": "≤15 yrs", "20y": "≤20 yrs", "30y": "≤30 yrs", any: "Any" },
    floorMin: "Floor (minimum)",
    floorOptions: { "2f": "2F+", "3f": "3F+", "4f": "4F+", top: "Top floor", any: "Any" },
    direction: "Facing Direction",
    directionOptions: { south: "South", east: "East", west: "West", se: "Southeast", sw: "Southwest", any: "Any" },
    parking: "Parking",
    parkingOptions: { none: "Not needed", "1car": "1 car", "2cars": "2+ cars", any: "Any" },
    garden: "Garden",
    garage: "Garage",
    pInitialCost: "Initial Costs",
    pEntry: "Entry Conditions",
    pFacilities: "Facilities",
    reikinNone: "No key money",
    shikikinNone: "No deposit",
    freeRent: "Free rent period",
    guarantorFree: "No guarantor needed",
    pet: "Pets allowed",
    instrument: "Instruments allowed",
    twoPersonOk: "Couples/2 persons OK",
    diy: "DIY allowed",
    separateBath: "Separate bath/toilet",
    washerIndoor: "Indoor washer hookup",
    aircon: "Air conditioner included",
    internetFree: "Free internet",
    autolock: "Auto-lock entrance",
    deliveryBox: "Delivery box",
    systemKitchen: "System kitchen",
    ihCooktop: "IH cooktop",
    reheating: "Bath reheating",
    bathDryer: "Bathroom dryer",
    floorHeating: "Floor heating",
    washlet: "Washlet toilet",
    parkingAvailable: "Parking available",
    notes: "Additional notes (optional)",
    notesPlaceholder: "e.g. Lots of sunlight, quiet area, plenty of storage",
    submit: "Generate QR Code",
  },
  qr: {
    title: "Your RoomPass is ready!",
    subtitle: "Show this QR code to any real estate agent",
    copyUrl: "Copy URL",
    copied: "Copied!",
    viewPage: "Preview page",
  },
  view: {
    conditions: "'s Requirements",
    guestConditions: "Client Requirements",
    createOwn: "Create your own",
    moveIn: "Desired Move-in",
    rent: "Max Rent (incl. fee)",
    moveInAsap: "As soon as possible",
    moveInUndecided: "Undecided",
    layoutArea: "Floor Plan / Area",
    areaAbove: "or more",
    desiredArea: "Desired Area / Line / Station",
    details: "Details",
    walk: "Walk from Station",
    age: "Building Age",
    floorMin: "Floor",
    direction: "Facing",
    parking: "Parking",
    preferences: "Preferences",
    notes: "Additional Notes",
    footer: "Generated by RoomPass",
    errorUrl: "Invalid URL",
    errorData: "Could not load data",
    pLabels: {
      separateBath: "Sep. bath/toilet", pet: "Pets OK", instrument: "Instruments OK",
      twoPersonOk: "2 persons OK", reikinNone: "No key money", shikikinNone: "No deposit",
      freeRent: "Free rent", internetFree: "Free internet", washerIndoor: "Indoor washer",
      aircon: "A/C included", autolock: "Auto-lock", deliveryBox: "Delivery box",
      bathDryer: "Bath dryer", floorHeating: "Floor heating", reheating: "Bath reheat",
      washlet: "Washlet", systemKitchen: "Sys. kitchen", ihCooktop: "IH cooktop",
      guarantorFree: "No guarantor", diy: "DIY OK", hasGarden: "Garden", hasGarage: "Garage",
    },
    buildingTypes: { mansion: "Apartment/Mansion", apartment: "Apartment (木造)", house: "House" },
    walkOptions: { "3min": "3 min", "5min": "5 min", "7min": "7 min", "10min": "10 min", "15min": "15 min", "20min": "20 min", any: "Any" },
    ageOptions: { new: "Brand new", "3y": "≤3 yrs", "5y": "≤5 yrs", "10y": "≤10 yrs", "15y": "≤15 yrs", "20y": "≤20 yrs", "30y": "≤30 yrs", any: "Any" },
    areaOptions: { "20m2": "~20m²", "25m2": "~25m²", "30m2": "~30m²", "40m2": "~40m²", "50m2": "~50m²", "60m2": "~60m²", "80m2": "~80m²", any: "Any" },
    floorOptions: { "2f": "2F+", "3f": "3F+", "4f": "4F+", top: "Top floor", any: "Any" },
    directionOptions: { south: "South", east: "East", west: "West", se: "Southeast", sw: "Southwest", any: "Any" },
    parkingOptions: { none: "Not needed", "1car": "1 car", "2cars": "2+ cars", any: "Any" },
  },
};

// ─── 中文（简体） ─────────────────────────────────────
const zh: Translations = {
  common: {
    tagline: "填写条件 → 向中介出示二维码即可",
    privacy: "您的条件不会存储在服务器上，仅通过URL共享。",
    loading: "加载中...",
  },
  lang: { ja: "日本語", en: "English", zh: "中文" },
  form: {
    sBasic: "基本信息",
    sProperty: "房源条件",
    sMansion: "公寓条件",
    sHouse: "独栋条件",
    sPreferences: "偏好条件",
    sOther: "其他",
    name: "姓名（可选）",
    namePlaceholder: "例：田中 太郎",
    buildingType: "房源类型",
    buildingTypes: { mansion: "高层公寓/Mansion", apartment: "公寓(木造)", house: "独栋住宅" },
    moveIn: "希望入住时间",
    moveInPlaceholder: "请选择",
    moveInAsap: "尽快入住",
    moveInUndecided: "未定",
    rent: "租金上限（含管理费）",
    rentMinPlaceholder: "不限下限",
    rentMaxPlaceholder: "上限（必填）",
    rentUnit: "日元〜",
    rentSuffix: "日元",
    layouts: "户型",
    area: "专有面积（下限）",
    areaHouse: "建筑面积（下限）",
    areaOptions: { "20m2": "~20㎡", "25m2": "~25㎡", "30m2": "~30㎡", "40m2": "~40㎡", "50m2": "~50㎡", "60m2": "~60㎡", "80m2": "~80㎡", any: "不限" },
    areas: "希望区域・路线・车站",
    areasPlaceholder: "例：涩谷区、目黑站、东横线沿线",
    areasAdd: "添加",
    walk: "距车站步行",
    walkOptions: { "3min": "3分钟以内", "5min": "5分钟以内", "7min": "7分钟以内", "10min": "10分钟以内", "15min": "15分钟以内", "20min": "20分钟以内", any: "不限" },
    age: "建筑年数",
    ageOptions: { new: "新建", "3y": "3年以内", "5y": "5年以内", "10y": "10年以内", "15y": "15年以内", "20y": "20年以内", "30y": "30年以内", any: "不限" },
    floorMin: "楼层（下限）",
    floorOptions: { "2f": "2楼以上", "3f": "3楼以上", "4f": "4楼以上", top: "顶层", any: "不限" },
    direction: "朝向",
    directionOptions: { south: "朝南", east: "朝东", west: "朝西", se: "东南朝向", sw: "西南朝向", any: "不限" },
    parking: "停车场",
    parkingOptions: { none: "不需要", "1car": "1辆", "2cars": "2辆以上", any: "不限" },
    garden: "带庭院",
    garage: "带车库",
    pInitialCost: "初始费用",
    pEntry: "入住条件",
    pFacilities: "设施",
    reikinNone: "无礼金",
    shikikinNone: "无押金",
    freeRent: "免租期",
    guarantorFree: "无需担保人",
    pet: "可养宠物",
    instrument: "可演奏乐器",
    twoPersonOk: "可两人同住",
    diy: "可DIY",
    separateBath: "浴室与厕所分离",
    washerIndoor: "室内洗衣机接口",
    aircon: "含空调",
    internetFree: "免费网络",
    autolock: "自动门锁",
    deliveryBox: "快递收件箱",
    systemKitchen: "整体厨房",
    ihCooktop: "IH电磁炉",
    reheating: "浴缸追加热功能",
    bathDryer: "浴室烘干机",
    floorHeating: "地暖",
    washlet: "温水马桶",
    parkingAvailable: "有停车位",
    notes: "备注（可选）",
    notesPlaceholder: "例：采光好、安静环境、收纳空间大",
    submit: "生成二维码",
  },
  qr: {
    title: "您的RoomPass已生成！",
    subtitle: "将此二维码出示给中介即可",
    copyUrl: "复制链接",
    copied: "已复制！",
    viewPage: "查看展示页面",
  },
  view: {
    conditions: " 的希望条件",
    guestConditions: "客户希望条件",
    createOwn: "创建自己的",
    moveIn: "希望入住时间",
    rent: "租金上限（含管理费）",
    moveInAsap: "尽快入住",
    moveInUndecided: "未定",
    layoutArea: "户型・面积",
    areaAbove: "以上",
    desiredArea: "希望区域・路线・车站",
    details: "详细条件",
    walk: "距车站步行",
    age: "建筑年数",
    floorMin: "楼层",
    direction: "朝向",
    parking: "停车场",
    preferences: "偏好条件",
    notes: "其他备注",
    footer: "由RoomPass生成",
    errorUrl: "URL无效",
    errorData: "无法加载数据",
    pLabels: {
      separateBath: "浴厕分离", pet: "可养宠物", instrument: "可演奏乐器",
      twoPersonOk: "可两人同住", reikinNone: "无礼金", shikikinNone: "无押金",
      freeRent: "免租期", internetFree: "免费网络", washerIndoor: "室内洗衣机接口",
      aircon: "含空调", autolock: "自动门锁", deliveryBox: "快递收件箱",
      bathDryer: "浴室烘干机", floorHeating: "地暖", reheating: "追加热功能",
      washlet: "温水马桶", systemKitchen: "整体厨房", ihCooktop: "IH电磁炉",
      guarantorFree: "无需担保人", diy: "可DIY", hasGarden: "带庭院", hasGarage: "带车库",
    },
    buildingTypes: { mansion: "高层公寓/Mansion", apartment: "公寓(木造)", house: "独栋住宅" },
    walkOptions: { "3min": "3分钟以内", "5min": "5分钟以内", "7min": "7分钟以内", "10min": "10分钟以内", "15min": "15分钟以内", "20min": "20分钟以内", any: "不限" },
    ageOptions: { new: "新建", "3y": "3年以内", "5y": "5年以内", "10y": "10年以内", "15y": "15年以内", "20y": "20年以内", "30y": "30年以内", any: "不限" },
    areaOptions: { "20m2": "~20㎡", "25m2": "~25㎡", "30m2": "~30㎡", "40m2": "~40㎡", "50m2": "~50㎡", "60m2": "~60㎡", "80m2": "~80㎡", any: "不限" },
    floorOptions: { "2f": "2楼以上", "3f": "3楼以上", "4f": "4楼以上", top: "顶层", any: "不限" },
    directionOptions: { south: "朝南", east: "朝东", west: "朝西", se: "东南朝向", sw: "西南朝向", any: "不限" },
    parkingOptions: { none: "不需要", "1car": "1辆", "2cars": "2辆以上", any: "不限" },
  },
};

export const translations: Record<Lang, Translations> = { ja, en, zh };
