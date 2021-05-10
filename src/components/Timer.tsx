import React, { FunctionComponent, useEffect, useState } from 'react'

type TimerProps = {
	seconds: number
}

type TimerState = {
	currentTime: number,
	running: boolean
}

const initWith = (seconds: number): TimerState => ({
	currentTime: seconds,
	running: false
})

export const Timer: FunctionComponent<TimerProps> = ({seconds}) => {
	const [state, setState] = useState<TimerState>(initWith(seconds))
	const {currentTime, running} = state

	const toggleRunning = () => {
		setState({
			...state,
			running: !running
		})
	}
	return (
		<div>
			<div>{currentTime}</div>
			<button onClick={toggleRunning}>{running ? 'Stop' : 'Play'}</button>
		</div>
	)
}