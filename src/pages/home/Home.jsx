import "../home/home.scss";
import { PiChatsCircleBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import findyLogo from "../../assets/findyLogo.png"
import Carousel from "../../components/Carousel";

export default function Home() {


  return (
    <div>
      <div className="home__header">
        <img src={findyLogo} alt="logo" className="home__header-logo"/>
        <div className="home__header-icons">
          <FaRegHeart className="home__header-icons-icon" />
          <PiChatsCircleBold className="home__header-icons-icon" />
        </div>
      </div>

      <Carousel></Carousel>
    </div>
  );
}
