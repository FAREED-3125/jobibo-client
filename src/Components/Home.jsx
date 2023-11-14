import React, { useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Partner from "./Partner";
import Recomended from "./Recomended";

const Home = () => {
  const userAlerted = JSON.parse(localStorage.getItem("alertUser"));

  useEffect(() => {
    if (!userAlerted) {
      const alertUser = () => {
        alert(
          "Hey there! Our backend is on a free host, so occasional server restarts happen. It'll take a max of 2 mins. Thanks for your patience!"
        );
      };

      alertUser();

      localStorage.setItem("alertUser", JSON.stringify(true));
    }
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <Partner />
      <Recomended />
    </>
  );
};

export default Home;
