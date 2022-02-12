import React from 'react'
import classes from './Card.module.css'

const card = props => {
	const { id, value, click } = props

	let cardClass = [classes.card]
	let title = ''
	let unit = ''

	switch (id) {
		case 'market_cap_usd':
			cardClass.push(classes.mcap)
			title = 'total market cap'
			unit = ' B $'
			break
		case 'volume24':
			cardClass.push(classes.vol)
			title = '24h volume'
			unit = ' B $'
			break
		case 'price_usd':
			cardClass.push(classes.dom)
			title = 'Price USD'
			unit = ' $'
			break
		case 'percent_change_24h':
			cardClass.push(classes.avgChange)
			title = 'average market cap change'
			unit = ' %'
			break
		case 'rank':
			cardClass.push(classes.volChange)
			title = 'Market Rank'
			unit = ' '
			break
		case 'name':
				cardClass.push(classes.namecrypto)
				title = 'Name'
				unit = ' '
				break
		default:
			cardClass.push(classes.default)
	}
	return (
		<div className={cardClass.join(' ')} onClick={click}>
			<h5>{title}</h5>
			<p>{value ? value.toString() + unit : null}</p>
		</div>
	)
}

export default card
