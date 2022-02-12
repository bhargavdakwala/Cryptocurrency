import React from 'react'
import { Avatar } from 'antd'
import coinLogo from '../../assets/logo.png'
import classes from './Navbar.module.css'

const Navbar = () => {
	function gotoHomePage(){
		window.location.href= "http://localhost:3000/"
	}
	return (
		<div className={classes.Navbar} >
			<img
				src={coinLogo} 
				alt='Frontend Developer-Bhargav'
				onClick={() => {
					gotoHomePage()
				}}
			/>
			<div className={classes.Actions}>
				<Avatar size='large' icon='user' />
			</div>
		</div>
	)
}

export default Navbar
