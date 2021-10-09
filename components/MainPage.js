import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Select from "react-select";
import Image from "next/image";
import Country from "./Country";
/* import { LazyLoadImage } from "react-lazy-load-image-component"; */
import Link from "next/link";

function MainPage() {
  const [areaSelected, setAreaSelected] = useState("Select a region");
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    const getAllCountries = async () => {
      try {
        const res = await fetch("https://restcountries.eu/rest/v2/all");
        const data = await res.json();
        setAllCountries(data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllCountries();
  }, []);

  return (
    <div className="px-5 flex flex-col  items-center h-screen overflow-y-auto pt-28 bg-mainDark text-white">
      {/* div for (inner)body */}
      <div className="flex flex-col w-full items-center">
        {/* FORM */}
        <form className="flex mb-8 flex-row items-center h-12 w-80 py-6  bg-mainDarkGrayish border-8 border-borderColor rounded-lg">
          <SearchIcon className="h-5 w-5 ml-8 cursor-pointer" />
          <input
            type="text"
            className="font-medium text-sm  w-full flex-grow pl-8 outline-none bg-mainDarkGrayish"
            placeholder="Search for a country..."
          />
        </form>

        {/* FILTER */}

        {/* same w as form container */}
        <div className="w-80 mb-8">
          <select
            value={areaSelected}
            onChange={(e) => setAreaSelected(e.target.value)}
            className=""
          >
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>

        {/* Country Component */}
        {/* flag, name, ...population, region, capital... */}
        {allCountries.map((item, i) => (
          /*   <Link href={`/countries/${item.name}`} key={i}> */
          <Country
            key={i}
            flag={item.flag}
            name={item.name}
            population={item.population}
            region={item.region}
            capital={item.capital}
          />
          /*   </Link> */
        ))}

        {/* When user starts scrolling -> take me to top-button displayed */}
      </div>
    </div>
  );
}

export default MainPage;
