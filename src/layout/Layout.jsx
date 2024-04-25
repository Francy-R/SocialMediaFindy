import "../layout/layout.scss";
import circle from "../assets/circle.png"
import plus from "../assets/plus.png"
import Footer from "../components/Footer";
import { useState } from "react";
import Home from "../pages/home/Home";
import Modal from "../components/Modal";

export default function Layout() {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
      };
    return (
        <div>
            <div className="addPublic">
                <button className="addPublic__button" onClick={toggleModal} >
                    <figure ><img src={circle} alt="circle" className="addPublic__img" /></figure>
                    <figure ><img src={plus} alt="plus" className="addPublic__plus" /></figure>
                    {modalOpen ? 'Cerrar Modal' : 'Abrir Modal'}
                </button>
                <Modal isOpen={modalOpen} onClose={toggleModal}></Modal>
            </div>
            
            <Footer />
        </div >
    );
}
