import React, { useContext, useEffect, useState } from "react";
import "../home/home.scss";
import { PiChatsCircleBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import findyLogo from "../../assets/findyLogo.png"
import Carousel from "../../components/Carousel";
import Posts from "../../components/Posts";
import { AppContext } from "../../router/AppRouter";

export default function Home() {

  const { user } = useContext(AppContext);
  return (
    
    <div>

<div>
      {user ? (
        <div>
          <h2>Bienvenido, {user.id}!</h2>
        </div>
      ) : (
        <h2>No estás logueado</h2>
      )}
    </div>


      <div className="home__header">
        <img src={findyLogo} alt="logo" className="home__header-logo"/>
        <div className="home__header-icons">
          <FaRegHeart className="home__header-icons-icon" />
          <PiChatsCircleBold className="home__header-icons-icon" />
        </div>
      </div>
      <Carousel />
      <Posts />
    </div>
  );
}
