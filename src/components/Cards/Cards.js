import React from 'react'
import Card from './Card/Card'
import classes from './Cards.module.css'

const cards = props => {
	const cardArr = props.cardsData.map((card, index) => {
		if (card.show) {
			return (
				// <Card key={index} id={card.id} value={card.value} click={() => props.clicked(index)} />
				<Card key={index} id={card.id} value={card.value} />
			)
		} else {
			return null
		}
	})

	return <div className={classes.Cards}>{cardArr}</div>
}

export default cards
