import React, { useContext } from "react";
import { MoonIcon } from "@heroicons/react/solid";
import { MoonIcon as MoonIconOutline } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { Context } from "../Context";

function Nav() {
  const router = useRouter();

  const { toggleTheme } = useContext(Context);
  const { darkTheme } = useContext(Context);

  /* console.log(darkTheme); */

  return (
    /* margin on the sides: 10 on each side. */
    <div
      className={`w-screen h-20 border-b-4 ${
        darkTheme
          ? "border-borderColor bg-mainDarkGrayish"
          : "border-borderLightTest bg-whiteSmokeBg"
      }   z-50 fixed top-0 flex flex-row justify-between items-center transition duration-200 ease-in`}
    >
      <h3
        onClick={() => router.push("/")}
        className={`${
          darkTheme ? "text-white" : "text-black"
        }  font-extrabold cursor-pointer text-lg ml-5 transition duration-200 ease-in`}
      >
        Where in the world?
      </h3>

      <div
        onClick={toggleTheme}
        className="flex flex-row mr-5 items-center cursor-pointer"
      >
        {darkTheme ? (
          <MoonIcon className="h-5 w-5 text-white  ease-in" />
        ) : (
          <MoonIconOutline className="h-5 w-5 text-black  ease-in" />
        )}
        <h4
          className={`font-semibold ${
            darkTheme ? "text-white" : "text-black"
          }  ml-2 text-sm transition duration-200 ease-in`}
        >
          Dark Mode
        </h4>
      </div>
    </div>
  );
}

export default Nav;
