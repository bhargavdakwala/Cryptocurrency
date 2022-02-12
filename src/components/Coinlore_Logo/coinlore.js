import React from 'react'
import { Divider } from 'antd'
import reactLogo from '../../assets/react-logo.png'
import clLogo from '../../assets/cl_logo.png'
import classes from './coinlore.module.css'

const Credits = () => {
	return (
		<div className={classes.Credits}>
			Powered by
			<a href='https://reactjs.org/'>
				<img src={reactLogo} alt='React Logo' />
			</a>
			{/* <Divider type='vertical' />
			<a href='https://ant.design/'>
				<img src={antdLogo} alt='Ant Design Logo' />
			</a> */}
			<Divider type='vertical' />
			<a href='https://www.coinlore.com/cryptocurrency-data-api'>
				<img src={clLogo} alt='Coin Lore Logo' />
			</a>
		</div>
	)
}

export default Credits
