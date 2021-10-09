import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";
import Link from "next/link";
import { Context } from "../Context";

function Country({ currency, item }) {
  const router = useRouter();
  const { darkTheme } = useContext(Context);

  const handleCountryClick = () => {
    router.push("/" + item.name.common);
  };

  /* Utility funciton */
  /* https://www.codegrepper.com/code-examples/javascript/javascript+add+comma+to+large+numbers */
  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div
      onClick={() => handleCountryClick()}
      className={`cursor-pointer flex flex-col mx-4 transition duration-200 hover:scale-105 mb-7 ${
        darkTheme
          ? "bg-mainDarkGrayish border-borderColor border-4  text-white"
          : "bg-whiteSmokeBg text-black border-4 border-borderLightTest"
      }   h-80 w-64  rounded-md  `}
    >
      <div className=" flex justify-center">
        <LazyLoadImage
          src={item.flags.png}
          effect=""
          alt=""
          className="rounded-t-sm object-cover w-64 h-32"
          /* height={400}
          width={250} */
        />
      </div>
      <div className="flex flex-col ml-6">
        <h2 className="mt-5 mb-5 font-extrabold text-xl">{item.name.common}</h2>
        <div className="flex ">
          <p className="font-bold">Population:&nbsp;</p>
          {"  "}
          <p className="font-extralight">
            {" "}
            {numberWithCommas(item.population)}
          </p>
        </div>
        <div className="flex ">
          <p className="font-bold">Region:&nbsp;</p>
          <p className="font-extralight"> {item.region}</p>
        </div>
        <div className="flex ">
          <p className="font-bold">Capital:&nbsp;</p>
          <p className="font-extralight">{item.capital}</p>
        </div>
      </div>
    </div>
  );
}

export default Country;
