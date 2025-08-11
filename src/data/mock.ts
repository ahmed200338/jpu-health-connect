export type Governorate =
  | "دمشق"
  | "ريف دمشق"
  | "حلب"
  | "حمص"
  | "حماة"
  | "اللاذقية"
  | "طرطوس"
  | "إدلب"
  | "دير الزور"
  | "الرقة"
  | "الحسكة"
  | "درعا"
  | "السويداء"
  | "القنيطرة";

export const GOVERNORATES: Governorate[] = [
  "دمشق",
  "ريف دمشق",
  "حلب",
  "حمص",
  "حماة",
  "اللاذقية",
  "طرطوس",
  "إدلب",
  "دير الزور",
  "الرقة",
  "الحسكة",
  "درعا",
  "السويداء",
  "القنيطرة",
];

export interface SectionItem {
  name: string;
  description: string;
  address: string;
  phone: string;
  region: Governorate;
  image?: string;
}

// Mock data aligned with Supabase-like schema fields
export const doctorsMock: SectionItem[] = [
  {
    name: "د. سامر خليل",
    description: "اختصاصي طب عام وخبرة في رعاية الطلاب",
    address: "دمشق - المزة",
    phone: "+963 11 123 4567",
    region: "دمشق",
  },
  {
    name: "د. ليلى منصور",
    description: "طبيبة أسنان - عيادة الجامعة",
    address: "حلب - شارع الجامعة",
    phone: "+963 21 234 5678",
    region: "حلب",
  },
  {
    name: "د. وائل درويش",
    description: "أخصائي عظام ومعالجة فيزيائية",
    address: "حمص - حي الإنشاءات",
    phone: "+963 31 345 6789",
    region: "حمص",
  },
];

export const hospitalsMock: SectionItem[] = [
  {
    name: "مستشفى الشفاء",
    description: "خدمات طبية شاملة على مدار الساعة",
    address: "دمشق - أبو رمانة",
    phone: "+963 11 555 1111",
    region: "دمشق",
  },
  {
    name: "مستشفى الرازي",
    description: "قسم طوارئ متطور وغرف عمليات مجهزة",
    address: "حماة - مركز المدينة",
    phone: "+963 33 444 2222",
    region: "حماة",
  },
  {
    name: "مستشفى الجامعة",
    description: "شراكة مع الجامعة لخدمة الطلاب",
    address: "اللاذقية - مشروع دمسرخو",
    phone: "+963 41 777 3333",
    region: "اللاذقية",
  },
];

export const pharmaciesMock: SectionItem[] = [
  {
    name: "صيدلية الجامعة",
    description: "أدوية أصلية واستشارات دوائية",
    address: "دمشق - الميدان",
    phone: "+963 11 666 9999",
    region: "دمشق",
  },
  {
    name: "صيدلية الصحة",
    description: "تخفيضات للطلاب على الأدوية",
    address: "إدلب - الحي الغربي",
    phone: "+963 23 111 2222",
    region: "إدلب",
  },
  {
    name: "صيدلية الأمل",
    description: "توفير مستلزمات طبية متنوعة",
    address: "درعا - شارع القوتلي",
    phone: "+963 15 333 4444",
    region: "درعا",
  },
];

export const laboratoriesMock: SectionItem[] = [
  {
    name: "مختبر التحاليل الحديثة",
    description: "تحاليل مخبرية شاملة",
    address: "حمص - شارع الحضارة",
    phone: "+963 31 999 0000",
    region: "حمص",
  },
  {
    name: "مختبر الجامعة",
    description: "نتائج دقيقة وسريعة",
    address: "الرقة - حي المشلب",
    phone: "+963 22 888 7777",
    region: "الرقة",
  },
  {
    name: "مختبر الشفاء",
    description: "تحاليل ميكروبيولوجية",
    address: "الحسكة - حي الصالحية",
    phone: "+963 52 111 0000",
    region: "الحسكة",
  },
];

export const dentalClinicsMock: SectionItem[] = [
  {
    name: "عيادة لؤلؤة الأسنان",
    description: "تقويم وتجميل وزراعة أسنان",
    address: "دمشق - المالكي",
    phone: "+963 11 999 8888",
    region: "دمشق",
  },
  {
    name: "عيادة الابتسامة",
    description: "علاجات حشو وعصب",
    address: "درعا - مركز المدينة",
    phone: "+963 15 222 1111",
    region: "درعا",
  },
  {
    name: "عيادة سنابل",
    description: "علاج أسنان الأطفال",
    address: "حلب - السبع بحرات",
    phone: "+963 21 777 1212",
    region: "حلب",
  },
];

export const radiologyCentersMock: SectionItem[] = [
  {
    name: "مركز الرنين",
    description: "رنين مغناطيسي وتصوير طبقي",
    address: "دمشق - البرامكة",
    phone: "+963 11 121 2121",
    region: "دمشق",
  },
  {
    name: "مركز الأشعة الحديث",
    description: "تصوير سونار وأشعة سينية",
    address: "السويداء - شارع القصور",
    phone: "+963 16 343 5656",
    region: "السويداء",
  },
  {
    name: "مركز رؤية",
    description: "تشخيصات دقيقة",
    address: "طرطوس - الكورنيش",
    phone: "+963 43 989 8989",
    region: "طرطوس",
  },
];

export const opticalClinicsMock: SectionItem[] = [
  {
    name: "مركز نور للعيون",
    description: "فحوصات نظر وقياس عدسات",
    address: "دمشق - كفرسوسة",
    phone: "+963 11 454 5454",
    region: "دمشق",
  },
  {
    name: "مركز البصر",
    description: "عمليات ليزك وتبديل عدسات",
    address: "حلب - العزيزية",
    phone: "+963 21 212 3434",
    region: "حلب",
  },
  {
    name: "مركز رؤية بصري",
    description: "عدسات لاصقة طبية",
    address: "اللاذقية - الصليبة",
    phone: "+963 41 878 7878",
    region: "اللاذقية",
  },
];

export const physicalTherapyCentersMock: SectionItem[] = [
  {
    name: "مركز العلاج الفيزيائي المتكامل",
    description: "إعادة تأهيل وإصابات رياضية",
    address: "دمشق - المزرعة",
    phone: "+963 11 989 3434",
    region: "دمشق",
  },
  {
    name: "مركز توازن",
    description: "جلسات علاج طبيعي فردية",
    address: "حماة - طريق حمص",
    phone: "+963 33 676 5656",
    region: "حماة",
  },
  {
    name: "مركز صحة الحركة",
    description: "علاج يدوي وتمارين علاجية",
    address: "درعا - نوى",
    phone: "+963 15 767 7676",
    region: "درعا",
  },
];
