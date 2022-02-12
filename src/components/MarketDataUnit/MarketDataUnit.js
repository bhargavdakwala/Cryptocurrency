import React from 'react'

const MarketDataUnit = props => {
	const denominator = props.data > 1e9 ? 1e9 : 1e6
	const unit = props.data > 1e9 ? 'B' : 'M'
	return (
		<span>
			{(props.data / denominator).toFixed(2)} {unit}
		</span>
	)
}
export default MarketDataUnit
