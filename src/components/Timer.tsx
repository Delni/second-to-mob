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

export const Timer: FunctionComponent<TimerProps> = ({ seconds }) => {
	const [state, setState] = useState<TimerState>(initWith(seconds))
	const { currentTime, running } = state

	const toggleRunning = () => {
		setState({
			...state,
			running: !running
		})
	}

	const reset = () => {
		setState(initWith(seconds))
	}

	useEffect(() => {
		let timer: number | undefined;
		if (currentTime > 0 && running) {
			timer = window.setInterval(() => setState({
				running,
				currentTime: currentTime - 1
			}), 1000);
		} else {
			setState({
				...state,
				running: false
			})
		}
		return () => window.clearInterval(timer)
	}, [currentTime, running]);

	return (
		<div>
			<div>{currentTime}</div>
			<button onClick={toggleRunning}>{running ? 'Stop' : 'Play'}</button>
			<button onClick={reset}>Reset</button>
		</div>
	)
}