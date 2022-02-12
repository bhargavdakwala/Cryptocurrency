import React from 'react'
import classes from './SpanChangeDeco.module.css'

const SpanChangeDeco = props => {
	const assignedClasses = [classes.Change]
	if (Number(props.text) < 0) {
		assignedClasses.push(classes.Red)
	} else if (Number(props.text) > 0) {
		assignedClasses.push(classes.Green)
	}
	return <span className={assignedClasses.join(' ')}>{props.text} %</span>
}

export default SpanChangeDeco
