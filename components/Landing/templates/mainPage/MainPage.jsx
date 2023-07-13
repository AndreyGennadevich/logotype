import { useState } from "react";
import { Header } from "../../organism/header";
import { Body } from "../../organism/body";
import styles from "./MainPage.module.css";


export const MainPage = () => {

	const [filter, setFilter] = useState("");

	const inputValue = (value) => {
		setFilter(value)
	}

  return (
		<div className={styles.page}>
			<Header filter={filter} inputValue={inputValue}/>
			<Body filter={filter}/>
		</div>
  )
}