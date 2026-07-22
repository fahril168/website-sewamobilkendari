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

export default function Home() {
  return (
    <>
      <Navbar />
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
      <FloatingWhatsApp />
    </>
  );
}
