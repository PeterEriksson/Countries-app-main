import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Spinner() {
  return (
    <div className="absolute w-20 h-20">
      <LazyLoadImage className="" src="/spinner2.svg" alt="" />
    </div>
  );
}

export default Spinner;
