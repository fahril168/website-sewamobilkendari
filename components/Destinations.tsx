import pool from "@/lib/db";
import { destinations as defaultDestinations, Destination } from "@/data/destinations";
import { getContactSettings } from "@/lib/settings";
import DestinationSlider from "@/components/DestinationSlider";
import { ScrollFadeUp } from "@/components/ScrollAnimation";

export default async function Destinations() {
  let destinationList: Destination[] = [];
  let contact = { whatsapp_number: "" };

  try {
    contact = await getContactSettings();
    const result = await pool.query(
      `SELECT id, name, description, image, recommended_car as "recommendedCar" FROM destinations ORDER BY created_at DESC`
    );
    if (result.rows.length > 0) {
      destinationList = result.rows;
    } else {
      destinationList = defaultDestinations;
    }
  } catch (error) {
    console.error("Error fetching destinations:", error);
    destinationList = defaultDestinations;
  }

  return (
    <section id="destinasi" className="bg-[#F8FAFC] py-12 sm:py-16 px-0 sm:px-6 lg:px-8 border-t border-slate-200 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <ScrollFadeUp>
          <div className="text-center mb-6 sm:mb-10 px-4 sm:px-0">
            <span className="inline-block rounded bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-500/20">
              Jelajahi Kendari
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[#223A50] sm:text-3xl">
              Destinasi Wisata Kendari
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
              Jelajahi keindahan alam Sulawesi Tenggara dengan armada kendaraan nyaman dan prima dari kami.
            </p>
          </div>
        </ScrollFadeUp>

        <div className="w-full rounded-none sm:rounded-2xl overflow-hidden shadow-xl border-y sm:border border-slate-200/80">
          <DestinationSlider
            destinations={destinationList}
            whatsappNumber={contact.whatsapp_number}
          />
        </div>
      </div>
    </section>
  );
}
