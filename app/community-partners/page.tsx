"use client";
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
        {/* JOIN COMMUNITY BUTTON */}
        <div className="flex w-full justify-center mt-[5%] px-4">
          <a
            href="https://forms.gle/JYchGpsm9vbtZYe17"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex justify-center"
          >
            <button
              className="glow-button w-full sm:w-auto"
              style={{
                "--glow-color": "#44A7F0",
                "--glow-spread-color": "rgba(68, 167, 240, 0.781)",
                "--enhanced-glow-color": "rgb(100, 186, 245)",
                "--btn-color": "rgb(25, 80, 120)",
              } as React.CSSProperties}
            >
              JOIN THE COMMUNITY
            </button>
          </a>
        </div>

        <style jsx>{`
                .glow-button {
                    border: 0.25em solid var(--glow-color);
                    padding: 0.8em 1.5em;
                    color: var(--glow-color);
                    font-size: 12px;
                    font-weight: bold;
                    font-family: 'Chakra Petch', sans-serif;
                    cursor: pointer;
                    background-color: var(--btn-color);
                    border-radius: 1em;
                    outline: none;
                    box-shadow: 0 0 1em 0.25em var(--glow-color),
                        0 0 4em 1em var(--glow-spread-color),
                        inset 0 0 0.74em 0.25em var(--glow-color);
                    text-shadow: 0 0 0.5em var(--glow-color);
                    position: relative;
                    transition: all 0.3s;
                }
                
                @media (min-width: 640px) {
                    .glow-button {
                        padding: 1em 3em;
                        font-size: 15px;
                    }
                }
                
                .glow-button::after {
                    pointer-events: none;
                    content: "";
                    position: absolute;
                    top: 120%;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    background-color: var(--glow-spread-color);
                    filter: blur(2em);
                    opacity: 0.7;
                    transform: perspective(1.5em) rotateX(35deg) scale(1, 0.6);
                }
                
                .glow-button:hover {
                    color: var(--btn-color);
                    background-color: var(--glow-color);
                    box-shadow: 0 0 1em 0.25em var(--glow-color),
                        0 0 4em 2em var(--glow-spread-color),
                        inset 0 0 0.75em 0.25em var(--glow-color);
                }
                
                .glow-button:active {
                    box-shadow: 0 0 0.6em 0.25em var(--glow-color),
                        0 0 2.5em 2em var(--glow-spread-color),
                        inset 0 0 0.5em 0.25em var(--glow-color);
                }
            `}</style>

        <hr className="flex mt-[10%] w-full flex-grow bg-gradient-to-r from-black via-[#CCCCCC50] to-black" />
      </section>
    </main>
  );
}
