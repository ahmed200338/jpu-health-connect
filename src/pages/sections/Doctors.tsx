import SectionPage from "@/components/sections/SectionPage";
import doctorsHero from "@/assets/sections/doctors-hero.jpg";
import { doctorsMock } from "@/data/mock";

const Doctors = () => (
  <SectionPage title="تعرّف إلى خبرائنا" disc="قائمة الأطباء المعتمدين الذين لديهم سنوات من الخبرة المهنية ." backgroundImage={doctorsHero} items={doctorsMock} pageKey="doctors" />
);

export default Doctors;