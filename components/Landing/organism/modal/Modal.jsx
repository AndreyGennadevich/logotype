/* eslint-disable @next/next/no-img-element */
import { useRef, useEffect } from "react";
import { Card } from "../../moleculas/card";
import styles from "./Modal.module.css";

export const Modal = ({ item, modal, setModal }) => {
	const modalRef = useRef(null);

	const closePopup = (e)=>{
    if(modalRef.current && modal.state && !modalRef.current.contains(e.target)){
      setModal({ state: false })
    }
  };

	useEffect(() => {
    document.addEventListener("mousedown", closePopup);
    return () => {
      document.removeEventListener("mousedown", closePopup);
    };
  });

  return (
		<div
			className={styles.modal}
			ref={modalRef}
		>
			<button
				className={styles.close}
				onClick={() => setModal({ state: false })}
			>
				<img
					src="/icons/x.svg"
					alt="x"
					className={styles.closeIcon}
				/>
			</button>
			<Card item={item}/>
		</div>
  )
}