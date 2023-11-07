import React, { useEffect, useState } from "react";
import UseFetch from "../Utils/UseFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { format } from "date-fns";
import { HiClock } from "react-icons/hi";
import UseDimension from "../Utils/UseDimension";

const Recomended = () => {
  const {
    data: productdata,
    loading: productLoading,
    err: producterr,
  } = UseFetch("/Search/getalljobs?limit=4");

  const innerwidth = UseDimension();

  const calculateDayDiffernce = (dateOne, dateTwo) => {
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
              <div className="bg-blue-50 p-5 rounded-lg min-h-[280px]   flex flex-col">
                {/* heading container starts  */}
                <div>
                  <h3 className=" capitalize font-[600] text-[18px]">
                    {product?.Job_title}
                  </h3>
                  <h3 className="text-gray-600 text-[15px]">
                    {product?.company_id?.company_name}
                  </h3>
                </div>
                {/* heading container ends */}
                <div>
                  <div className="px-3 py-2 bg-blue-200 text-slate-600 w-max rounded-md mt-2 text-[15px]">
                    {product?.job_mode}
                  </div>

                  {/* stipend container starts  */}
                  <h3 className="flex items-center gap-2 text-[15px] text-gray-500 mt-3">
                    <span className="text-[18px]">
                      <FaRegMoneyBillAlt />
                    </span>
                    <span>
                      {product?.job_type !== "Job" ? "stipend" : "salary"}
                    </span>
                    <span>
                      {product?.salary?.min} - {product?.salary?.max} rs
                    </span>
                  </h3>
                  {/* stipend container ends */}

                  <p
                    className=" w-max rounded-full  text-[14px] mt-3 flex gap-1 items-center"
                    style={{
                      color:
                        calculateDayDiffernce(
                          format(new Date(product?.createdAt), "yyyy-MM-dd"),
                          format(new Date(Date.now()), "yyyy-MM-dd")
                        ) > 3
                          ? "#b5b5b5"
                          : "rgb(34 197 94)",
                    }}
                  >
                    <span className="text-[18px]">
                      <HiClock />
                    </span>
                    <span className="mt-[1px]">
                      {calculateDayDiffernce(
                        format(new Date(product?.createdAt), "yyyy-MM-dd"),
                        format(new Date(Date.now()), "yyyy-MM-dd")
                      )}{" "}
                      days
                    </span>
                  </p>
                </div>
                {/* details container start  */}
                <div className="flex-grow flex items-end justify-end">
                  <h3 className="ring-[2px] ring-blue-400 rounded-md text-blue-400 w-max px-4 py-3  cursor-pointer">
                    view details
                  </h3>
                </div>
                {/* details container ends */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Recomended;
