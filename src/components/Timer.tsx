import React, { FunctionComponent, useEffect, useState } from 'react'
import '../resources/styles/Timer.sass'

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

	const reset = () => setState(initWith(seconds))

	useEffect(() => setState(initWith(seconds)), [seconds])

	useEffect(() => {
		if (currentTime > 0 && running) {
			const timer = window.setInterval(() => setState({
				running,
				currentTime: currentTime - 1
			}), 1000);
			return () => window.clearInterval(timer)
		} else {
			setState({
				...state,
				running: false
			})
		}
	}, [currentTime, running]);

	const progress = 137.5 * currentTime / seconds

	return (
		<div className="timer">
			<div className="clock">
				<svg viewBox="25 25 50 50">
				<circle cx="50" cy="50" r="21.75" strokeDasharray={`${progress}, 200`}></circle>
				</svg>
				<span>{currentTime}</span>
			</div>
			<div className="actions">
				<button onClick={toggleRunning}>{running ? 'Stop' : 'Play'}</button>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	)
}