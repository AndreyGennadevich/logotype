/* eslint-disable @next/next/no-img-element */
import styles from "./Card.module.css";

export const Card = ({ item }) => {

  return (
		<div className={styles.card}>
			<img
				src={ item.img }
				srcSet={ item.img_2x }
				alt={item.title}
				className={styles.image}
			/>
			<p className={styles.tag}>
				{ item.tags }
			</p>
			<h4 className={styles.title}>
				{ item.title }
			</h4>
			<ul className={styles.desc}>
				<li className={styles.author}>
					{ item.autor }
				</li>
				<li className={styles.date}>
					{ item.date }
				</li>
				<li className={styles.views}>
					{ item.views }
				</li>
			</ul>
			<p className={styles.article}>
				{ item.text }
			</p>
		</div>
  )
}