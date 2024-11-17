import { ContactContent } from "@/components/Contact/ContactContent";
import BgGlow from "@/components/ui/BgGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full font-inter relative pt-24">
      <ScrollProgress />
      <BgGlow />
      <ContactContent />
    </div>
  );
}
