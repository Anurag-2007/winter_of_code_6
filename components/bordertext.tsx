
import Image from 'next/image'
import register from '../public/register.svg'
import wocg from '../public/wocg.svg'
import React from 'react'
import Link from 'next/link'
import JumbleText from '@/components/jumble'
import site from '../data/site.json'

const BorderText = () => {
  const text = Array.from("WINTEROFCODE")

  const x = [
    0, 90, 180, 270, 360, 450,
    0, 85, 195, 280, 365, 450
  ]

  return (
    <div className="flex flex-col items-left w-full h-fit overflow-hidden">

      {/* Desktop Winter of Code Heading */}
      <div className="hidden sm:block w-full h-fit relative">

        <div className="hidden sm:flex absolute w-full font-kleemax text-scale-310 text-[#D9D9D910] justify-center overflow-hidden top-[65%] translate-y-[-50%] left-0">
          WOC
        </div>

        <svg
          className="z-[1000] h-[40vh] max-h-[40vh] w-auto max-w-[75%] mx-auto"
          viewBox="0 0 570 190"
        >
          {text.map((letter, index) => (
            <text
              key={index}
              x={x[index] + 20}
              y={index > 5 ? 170 : 80}
              className="text-trace font-kleemax"
              stroke="#609CFF"
              fill="#151D2F"
              strokeWidth="0.5%"
            >
              {letter}
            </text>
          ))}
        </svg>

      </div>

      {/* Progress Bar - Fixed Overflow */}
      <div className="hidden sm:block ml-[22.4%] w-[35.6%] max-w-[35.6%] overflow-hidden 2xl:hidden">
        <Image
          src={register}
          alt="Registration progress bar"
          className="block w-full max-w-full h-auto max-h-[16vh] object-contain object-left"
        />
      </div>

      {/* Mobile Artwork */}
      <Image
        src={wocg}
        alt="Winter of Code"
        className="sm:hidden w-full h-auto"
      />

      {/* Register Now Button */}
      <div className="hidden sm:flex justify-center items-center w-full 2xl:pt-[2.5%] overflow-hidden">

        <hr className="flex-1 min-w-0 max-w-[625px] h-[0.25vw] bg-gradient-to-l from-brand border-0" />

        <Link
          href={site.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative shrink-0 flex justify-center items-center text-scale-30-5 bg-black drop-shadow-blue px-[1.5%] border-[0.25vw] text-brand hover:scale-105 duration-500 cursor-pointer"
        >
          <div className="absolute top-right-arrow right-[0.375vw] top-[0.3vw] sm:top-[0.45vw]" />

          <div className="whitespace-nowrap pt-[1.5%] font-kleemax">
            <JumbleText
              text="REGISTRATIONS STARTING SOON"
              id="registerhere"
            />
          </div>
        </Link>

        <hr className="flex-1 min-w-0 h-[0.25vw] bg-gradient-to-r from-brand border-0" />

      </div>

    </div>
  )
}

export default BorderText
