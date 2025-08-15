import SectionPage from "@/components/sections/SectionPage";
import doctorsHero from "@/assets/sections/doctors-hero.jpg";

const Doctors = () => (
  <SectionPage title="تعرّف إلى خبرائنا" disc="قائمة الأطباء المعتمدين الذين لديهم سنوات من الخبرة المهنية ." backgroundImage={doctorsHero} pageKey="doctors" tableName="doctors" />
);

export default Doctors;