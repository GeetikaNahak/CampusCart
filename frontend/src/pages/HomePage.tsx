// import React from "react";
import {  useNavigate } from "react-router-dom";
import landingImage from "../assets/landingImage.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";

export default function HomePage() {
  const navigate=useNavigate();
  const handleSearchSubmit=(searchFromValues:SearchForm)=>{
    navigate({
      pathname:`/search/${searchFromValues.searchQuery}`,
    })
  }
  return (
    <div className="flex flex-col gap-12 ">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-blue-950">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl">Food is just a click away!!</span>

        <SearchBar  placeHolder="Search by Store Name " onSubmit={handleSearchSubmit}/>
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
