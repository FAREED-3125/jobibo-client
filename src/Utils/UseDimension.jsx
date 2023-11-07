import React, { useEffect, useState } from "react";

export const UseDimension = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const detectInnerWidth = (e) => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", detectInnerWidth);

    return () => {
      window.removeEventListener("resize", detectInnerWidth);
    };
  });
  return width;
};

export default UseDimension;
