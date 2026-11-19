import Image from "next/image";
import projectbanner from "../../public/projectbanner.svg";

// Community Partners will be announced soon. The partner list still lives in
// data/partners.json and components/partners.tsx, untouched, ready to be wired
// back in once partners are announced.
export default function CommunityPartners() {
  return (
    <main>
      <section
        className="w-full min-h-screen mx-auto pt-[10%] pb-[10%] bg-black"
        id="partners"
      >
        <div className="px-[5%]">
          <div className="text-center text-brand font-kleemax text-scale-50 drop-shadow-blue mb-12">
            COMMUNITY PARTNERS
            <div className="-z-10 w-[25%] absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-40.5%]">
              <Image
                className="mx-auto w-full"
                src={projectbanner}
                alt="community partners banner"
              />
            </div>
          </div>
          <div className="w-full text-center py-24">
            <p className="text-brand font-kleemax text-scale-40 drop-shadow-blue mb-4">
              COMING SOON
            </p>
            <p className="text-[#CADEFF] font-chakra">
              Our community partners will be announced here. Stay tuned!
            </p>
          </div>
        </div>
        <hr className="flex mt-[10%] w-full flex-grow bg-gradient-to-r from-black via-[#CCCCCC50] to-black" />
      </section>
    </main>
  );
}
