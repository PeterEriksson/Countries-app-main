import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Nav from "../components/Nav";
import Head from "next/head";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { Context } from "../Context";
import Router from "next/router";
import Spinner from "../components/Spinner";

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

function CountryDetail({ data }) {
  const [loading, setLoading] = useState(false);
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

  const router = useRouter();
  let countryId = router.query.countryId;

  const [allCountries, setAllCountries] = useState([]);

  const { darkTheme } = useContext(Context);

  /* Try getting data from getServerSideProps >>> */
  let __country = data.find((item) => item.name.common === countryId);

  const handleNewCountryClick = (string) => {
    const getCountry = data?.find((item) => item.name.common === string);
    router.replace(`/${getCountry.name.common}`);
  };

  /* Works BUT bugs when i go back and into a country */
  /* let arr = [];
  for (let i = 0; i < borderCountries?.length; i++) {
    allCountries.map((item) => {
      if (item.alpha3Code === borderCountries[i]) {
        return arr.push(item.name);
      }
    });
  } */

  /* issue solved with Next.js data fetching. */
  let boardersArr = [];
  for (let i = 0; i < __country.borders?.length; i++) {
    data.map((item) => {
      if (item.cca3 === __country.borders[i]) {
        return boardersArr.push(item.name.common);
      }
    });
  }

  /* Utility funciton */
  /* https://www.codegrepper.com/code-examples/javascript/javascript+add+comma+to+large+numbers */
  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /* Utility funciton */
  function removeLastComma(str) {
    return str.replace(/,(\s+)?$/, "");
  }

  const displayLanguages = () => {
    let string = "";
    for (let i = 0; i < __languages?.length; i++) {
      string += __languages[i] + ", ";
    }
    string = removeLastComma(string);
    return <p className="text-gray-400">{string}</p>;
  };

  return (
    <div className="font-mainFont">
      <Head>
        <title>{countryId}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main
        className={`px-5 flex flex-col  items-center h-screen overflow-y-auto pt-28  ${
          darkTheme ? "bg-mainDark text-white" : "bg-mainLightBg text-black"
        }  transition duration-200 ease-in`}
      >
        {loading && <Spinner />}
        <section className="flex flex-col w-full items-center">
          {/* BACK BUTTON */}
          {/* set div w-60 -> positions button at right place. */}
          <div className="w-60 mb-5 flex flex-col smallMediumBreakpoint:mr-auto ">
            <section
              onClick={() => router.push("/")}
              className={`w-2/5  cursor-pointer space-x-2 ${
                darkTheme
                  ? "text-gray-300 bg-mainDarkGrayish border-borderColor"
                  : "text-gray-800 bg-whiteSmokeBg border-borderLightTest"
              }   py-2 rounded-sm flex flex-row justify-center border-2 items-center `}
            >
              <ArrowLeftIcon className={`w-4 h-4  `} />
              <button>Back</button>
            </section>
          </div>

          {/* DIV FOR FLAG DOWN TO BORDER CTRIES */}
          <div className="flex flex-col items-center smallMediumBreakpoint:flex-row">
            <div className="w-3/4 smallMediumBreakpoint:w-2/4">
              <LazyLoadImage
                src={__country?.flags.png}
                alt=""
                effect=""
                className="rounded-md smallMediumBreakpoint:mr-12 "
                /* height={320}
              width={250} */
              />
            </div>
            {/* Country Name */}
            {/* DIV FOR NAME DOWN TO BORDERS  */}
            <div className="flex flex-col smallMediumBreakpoint:ml-20 ">
              <div className="w-60">
                <h2 className="mt-5 mb-5 font-extrabold text-xl">
                  {__country?.name.common}
                </h2>
                {/* Official name */}
                <section className="flex flex-row py-1.5">
                  <p>Official name:&nbsp;</p>
                  <p
                    className={`${
                      darkTheme ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {" "}
                    {__country?.name.official}
                  </p>
                </section>
                {/* Pupulation */}
                <section className="flex flex-row  py-1.5">
                  <p>Population:&nbsp;</p>
                  <p
                    className={`${
                      darkTheme ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {/* {numberWithCommas(__country?.population)} */}
                    {numberWithCommas(__country?.population)}
                  </p>
                </section>
                {/* Region */}
                <section className="flex flex-row py-1.5">
                  <p>Region:&nbsp;</p>
                  <p
                    className={`${
                      darkTheme ? "text-gray-400" : "text-gray-600"
                    } `}
                  >
                    {__country?.region}
                  </p>
                </section>
                {/* Sub Region */}
                <section className="flex flex-row  py-1.5">
                  <p>Sub Region:&nbsp;</p>
                  <p
                    className={`${
                      darkTheme ? "text-gray-400" : "text-gray-600"
                    } `}
                  >
                    {__country?.subregion}
                  </p>
                </section>
                {/* Capital */}
                <section className="flex flex-row  py-1.5 mb-4">
                  <p>Capital:&nbsp;</p>
                  <p
                    className={`${
                      darkTheme ? "text-gray-400" : "text-gray-600"
                    } `}
                  >
                    {__country?.capital}
                  </p>
                </section>

                {/* Top Level Domain + Currencies + Languages (new api weird >>> commented out) */}
                {/*  <section className="flex-row flex py-1.5">
              <p>Top Level Domain: </p>
              <p className="text-gray-400"></p>
            </section>
             
            <section className="flex flex-row py-1.5">
              <p>Currencies: </p>
              <p className="text-gray-400"></p>
            </section>
            
            <section className="flex flex-row py-1.5 mb-8">
              <p>Languages: </p>
            </section> */}

                {/* Border Coutnries-> */}
                <p className="py-1.5">Border Countries:</p>
                <div className="flex  w-96   flex-wrap mb-6">
                  {/* buttons for border countries */}
                  {boardersArr.length > 0 ? (
                    boardersArr.map((item, i) => (
                      <div
                        onClick={() => handleNewCountryClick(item)}
                        key={i}
                        className={`  mr-2 mb-2 cursor-pointer flex w-28 border-2 rounded-md  ${
                          darkTheme
                            ? "border-gray-800 bg-mainDarkGrayish hover:bg-borderColor "
                            : "bg-whiteSmokeBg border-borderLightTest hover:bg-gray-200  "
                        } flex-col justify-center items-center  px-10 py-2 transition duration-200 ease-in`}
                      >
                        <p
                          className={`font-extralight ${
                            darkTheme ? "text-gray-400" : "text-gray-600"
                          }  transition duration-200 ease-in text-sm`}
                        >
                          {item}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">(no borders)</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CountryDetail;
