import React, { useEffect, useState } from "react";
import UseFetch from "../Utils/UseFetch";
import { Swiper, SwiperSlide } from "swiper/react";

import UseDimension from "../Utils/UseDimension";
import { JobDetailsConponent } from "./SearchPage";
import { baseUrl } from "../App";

export const calculateDayDiffernce = (dateOne, dateTwo) => {
  // Define two date objects
  var date1 = new Date(dateOne);
  var date2 = new Date(dateTwo);
  // "2023-10-30";
  // Calculate the time difference in milliseconds
  var timeDifference = date2 - date1;

  // Convert the time difference to days
  var daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  return daysDifference;
};
const Recomended = () => {
  const {
    data: productdata,
    loading: productLoading,
    err: producterr,
  } = UseFetch(baseUrl + "/Search/getalljobs?limit=4");

  const innerwidth = UseDimension();

  return (
    <div className="w-screen mb-[100px]">
      <div className="resCont">
        <h3 className="text-[25px] text-gray-600 font-[600] mb-5">
          Recommended for you
        </h3>
        <Swiper
          spaceBetween={15}
          slidesPerView={innerwidth < 740 ? 1 : innerwidth < 1184 ? 3 : 4}
        >
          {productdata?.result?.map((product, index) => (
            <SwiperSlide key={index}>
              <JobDetailsConponent product={product} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Recomended;
