import React from "react";
import zoho from "../Assets/zoho.png";
import tcs from "../Assets/tcs.png";
import google from "../Assets/google.png";
import infosys from "../Assets/infosys.png";

const Partner = () => {
  const images = [zoho, tcs, infosys, google];
  return (
    <div className="w-screen pt-[50px] text-gray-00 pb-[50px]">
      <div className="resCont">
        <h3 className="text-[22px] font-[600] text-center text-gray-600">
          Companies Partners
        </h3>
        <div className=" mt-[30px] w-full make-center overflow-auto h-[150px]">
          <div className="flex items-center justify-start gap-5 w-max px-5 ">
            {images.map((img, index) => (
              <img
                src={img}
                key={index}
                className="w-[200px] h-[100px] shrink-0 object-contain shadow-lg ring-[1px] ring-gray-300 rounded-lg"
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
