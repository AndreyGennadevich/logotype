/* eslint-disable @next/next/no-img-element */
import styles from "./Body.module.css";
import { useState, useEffect } from "react";
import { Card } from "../../moleculas/card";
import { Modal } from "../modal";

export const Body = ({ filter }) => {

  const [items, setItems] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
  const [modal, setModal] = useState({
		state: false,
		item: {},
	});

	useEffect(() => {
    fetch("https://cloud.codesupply.co/endpoint/react/data.json")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
        },
        (error) => {
					console.log(error);
        }
      )
  }, [])

	useEffect(() => {
    const results = items.filter(itemPost => {
      return itemPost.title.includes(filter) || itemPost.text.includes(filter)
		}
    );
    setSearchResults(results);
  }, [filter, items]);

	const openModal = (item) => {
		setModal({state: true, item})
	};

  return (
    <main className={styles.main}>
			<div className={styles.container}>
				{ modal.state && <Modal
					item={modal.item}
					modal={modal}
					setModal={setModal}
				/>}
				<ul className={styles.list}>
					{ searchResults.map((item, idx) => <li
						className={styles.item}
						key={item.tags + idx}
						onClick={() => openModal(item)}
					>
						<Card item={item}/>
					</li>) }
				</ul>
			</div>
    </main>
  )
}