import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBanner from "@/components/StatsBanner";
import CarCatalog from "@/components/CarCatalog";
import ServicesSection from "@/components/ServicesSection";
import Destinations from "@/components/Destinations";
import Advantages from "@/components/Advantages";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { getContactSettings } from "@/lib/settings";

export default async function Home() {
  const contact = await getContactSettings();

  return (
    <>
      <Navbar whatsappNumber={contact.whatsapp_number} />
      <main className="flex-1">
        <Hero />
        <StatsBanner />
        <CarCatalog />
        <ServicesSection />
        <Destinations />
        <Advantages />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp whatsappNumber={contact.whatsapp_number} />
    </>
  );
}
