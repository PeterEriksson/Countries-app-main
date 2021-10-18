import Head from "next/head";
import Nav from "../components/Nav";
import React, { useEffect, useState, useContext } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Country from "../components/Country";
import Link from "next/link";
import { useRouter } from "next/router";
import Select from "react-select";
import { Context } from "../Context";
import Router from "next/router";
import Spinner from "../components/Spinner";

/* https://www.youtube.com/watch?v=iW39Merz0zE */
const url = "https://restcountries.com/v3.1/all";
export async function getServerSideProps() {
  const res = await fetch(url);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { darkTheme } = useContext(Context);

  const [areaSelected, setAreaSelected] = useState("");
  const [searchText, setSearchText] = useState("");

  const options = [
    { label: "All", value: "All" },
    { label: "Africa", value: "Africa" },
    { label: "Americas", value: "America" },
    { label: "Asia", value: "Asia" },
    { label: "Europe", value: "Europe" },
    { label: "Oceania", value: "Oceania" },
  ];
  const [region, setRegion] = useState(options[0]);
  const [widthState, setWidthState] = useState(null);

  useEffect(() => {
    const start = () => {
      /* console.log("start"); */
      setLoading(true);
    };
    const end = () => {
      /*  console.log("findished"); */
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  useEffect(() => {
    setWidthState(window.innerWidth);
    function handleResize() {
      setWidthState(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const onchangeSelect = (item) => {
    setRegion(item);
    /* console.log(region.label); */
  };

  const customStylesSelectDark = {
    option: (provided, state) => ({
      ...provided,
      color: "white",
      backgroundColor: state.isSelected ? "#202C37" : "#333E48",
    }),
    control: (provided) => ({
      ...provided,
      /*  marginTop: "5%", */
      /* backgroundColor: "#90B5FE", */
      backgroundColor: "#333E48",
      border: "none",
      borderOutline: "none",
      paddingTop: "5px",
      paddingBottom: "5px",
    }),
    menu: (provided) => ({
      ...provided,
      height: "100%",
      backgroundColor: "#333E48",
    }),
    singleValue: () => ({
      color: "white",
    }),
  };

  const customStylesSelectLight = {
    option: (provided, state) => ({
      ...provided,
      color: "black",
      backgroundColor: state.isSelected ? "#d4d4d4" : "#f5f5f5",
    }),
    control: (provided) => ({
      ...provided,
      /*  marginTop: "5%", */
      /* backgroundColor: "#90B5FE", */
      backgroundColor: "#f5f5f5",
      border: "none",
      borderOutline: "none",
      paddingTop: "5px",
      paddingBottom: "5px",
    }),
    menu: (provided) => ({
      ...provided,
      height: "100%",
      backgroundColor: "#f5f5f5",
    }),
    singleValue: () => ({
      color: "black",
    }),
  };

  const handleForm = (e) => {
    e.preventDefault();
  };

  /* https://flexiple.com/javascript-capitalize-first-letter/ */
  const handleChangeUserInput = (e) => {
    let arr = e.target.value.split(" ");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    let result = arr.join(" ");
    setSearchText(result);
    /* console.log(result); */
  };

  return (
    <div className="font-mainFont">
      <Head>
        <title>Rest Countries</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Nav */}
      <Nav />
      {/* MainPage */}
      {/* <MainPage /> */}
      <div
        className={`px-5 flex flex-col items-center h-screen overflow-y-auto pt-28 ${
          darkTheme ? "bg-mainDark text-white" : "bg-mainLightBg text-black"
        }  transition duration-200 ease-in `}
      >
        {loading && <Spinner />}
        {/* div for (inner)body */}
        {/* Mobile/Smaller size */}
        {widthState <= 659 ? (
          <div className="flex flex-col w-full items-center">
            {/* FORM */}
            <form
              onSubmit={(e) => handleForm(e)}
              className={`flex mb-8 flex-row items-center h-12 w-80 py-6 ${
                darkTheme
                  ? "bg-mainDarkGrayish border-4 border-borderColor"
                  : "bg-whiteSmokeBg border-4 border-borderLightTest"
              }  rounded-lg transition duration-200 ease-in`}
            >
              <SearchIcon className="h-5 w-5 ml-8 " />
              <input
                value={searchText}
                onChange={(e) => handleChangeUserInput(e)}
                type="text"
                className={`font-medium text-sm  w-full flex-grow pl-8 ${
                  darkTheme ? "bg-mainDarkGrayish" : "bg-whiteSmokeBg"
                } outline-none transition duration-200 ease-in`}
                placeholder="Search for a country..."
              />
            </form>
            {/* FILTER */}
            {/* same w as form container */}
            <div className="w-80 mb-8">
              <Select
                className="w-1/2 "
                placeholder="Filter by region"
                styles={
                  darkTheme ? customStylesSelectDark : customStylesSelectLight
                }
                value={region}
                onChange={onchangeSelect}
                options={options}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.value}
                instanceId="1267"
              />
            </div>

            <div className="flex flex-col ">
              {/* search handler:>>> */}
              {searchText === ""
                ? region.label === "All"
                  ? data.map((item, i) => <Country key={i} item={item} />)
                  : data
                      .filter((item) => item.region === region.label)
                      .map((__item, i) => <Country key={i} item={__item} />)
                : data
                    .filter((item) => item.region === region.label)
                    .filter((item) => item.name.common === searchText)
                    .map((item, i) => <Country key={i} item={item} />)}

              {searchText !== "" &&
                region.label === "All" &&
                data
                  .filter((item) => item.name.common === searchText)
                  .map((item, i) => <Country key={i} item={item} />)}
            </div>
          </div>
        ) : (
          /* LARGER sizes: */ <div className="flex flex-col w-full">
            {/* DIV for SEARCH plus FILTER (desktop)  */}
            <div className="flex flex-row justify-between mb-5 items-center md:mx-8 lg:mx-10 mx-5">
              <form
                onSubmit={(e) => handleForm(e)}
                className={`flex flex-row items-center shadow-sm h-12 w-80 py-4  ${
                  darkTheme
                    ? "bg-mainDarkGrayish border-2 border-borderColor"
                    : "bg-whiteSmokeBg   border-lightBorderColor"
                }     rounded-lg transition duration-200 ease-in`}
              >
                <SearchIcon className="h-5 w-5 ml-8 " />
                <input
                  value={searchText}
                  /* onChange={(e) => setSearchText(e.target.value)} */
                  onChange={(e) => handleChangeUserInput(e)}
                  type="text"
                  className={`font-medium text-sm  w-full flex-grow pl-8 outline-none  ${
                    darkTheme ? "bg-mainDarkGrayish" : "bg-whiteSmokeBg"
                  } transition duration-200 ease-in`}
                  placeholder="Search for a country..."
                />
              </form>
              <div className="w-40">
                <Select
                  className="w-full"
                  placeholder="Filter by region"
                  styles={
                    darkTheme ? customStylesSelectDark : customStylesSelectLight
                  }
                  value={region}
                  onChange={onchangeSelect}
                  options={options}
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.value}
                  instanceId="123435567"
                />
              </div>
            </div>
            {/* search functionality. no eventFormHandler */}
            <div className="flex flex-wrap justify-center ">
              {/* search handler:>>> */}
              {searchText === ""
                ? region.label === "All"
                  ? data.map((item, i) => <Country key={i} item={item} />)
                  : data
                      .filter((item) => item.region === region.label)
                      .map((__item, i) => <Country key={i} item={__item} />)
                : data
                    .filter((item) => item.region === region.label)
                    .filter((item) => item.name.common === searchText)
                    .map((item, i) => <Country key={i} item={item} />)}

              {searchText !== "" &&
                region.label === "All" &&
                data
                  .filter((item) => item.name.common === searchText)
                  .map((item, i) => <Country key={i} item={item} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
