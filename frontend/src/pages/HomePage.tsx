// import React from "react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import landingImage from "../assets/landingImage.png";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 ">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-blue-950">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl">Food is just a click away!!</span>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md mx-auto border border-gray-300 rounded-tl-lg overflow-hidden">
          <Input
            type="text"
            placeholder="Search for food, restaurants..."
            className="w-full px-4 py-2 outline-none border-none placeholder-gray-400"
          />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Search
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="Landing" className="w-full rounded-lg" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>Download the App for a faster and personalized experience</span>
        </div>
      </div>
    </div>
  );
}
