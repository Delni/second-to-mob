import React, { FunctionComponent, useEffect, useState } from "react";
import './Timer.scss'

type TimerProps = {
  time: number;
};
type Stopped = { tag: "stopped" };
type Paused = { tag: "paused"; timeRemaining: number };
type Playing = { tag: "playing"; timeRemaining: number };
type TimerState = Stopped | Paused | Playing;
function isStopped(t: TimerState): t is Stopped {
  return t.tag === "stopped";
}
function isPlaying(t: TimerState): t is Playing {
  return t.tag === "playing";
}


function timerString(seconds: number): string {
  const minutes = Math.floor(seconds / 60).toFixed(0).padStart(2, '0')
  const realSeconds = (seconds % 60).toFixed(2).padStart(5, '0')
  return `${minutes}:${realSeconds}`
}

export const Timer: FunctionComponent<TimerProps> = ({ time }) => {
  const STEP: number = .01;
  const [state, nextState] = useState<TimerState>({ tag: "stopped" });
  let interval: number;

  useEffect(() => {
    switch (state.tag) {
      case "stopped":
      case "paused":
        window.clearInterval(interval);
        return;
      case "playing": {
        interval = window.setInterval(() => {
          if (state.timeRemaining - STEP > 0) {
            nextState({
              tag: "playing",
              timeRemaining: state.timeRemaining - STEP,
            });
          } else {
            window.clearInterval(interval);
            nextState({ tag: "stopped" });
          }
        }, STEP * 1000);
        return () => window.clearInterval(interval);
      }
    }
  }, [state]);

  function playPause(state: TimerState) {
    if (isPlaying(state)) {
      nextState({ tag: "paused", timeRemaining: state.timeRemaining });
    } else {
      nextState({
        tag: "playing",
        timeRemaining: isStopped(state) ? time : state.timeRemaining,
      });
    }
  }

  const percent = isStopped(state) ? 100 : (state.timeRemaining ?? time) / time * 100

  return <div className={"timer" + (percent <= 10 ? ' outtatime' : '') }>
    <span>Remaining time:</span>
    {isStopped(state)
      ? timerString(time)
      : timerString(state.timeRemaining)}
    <div className="progress-wrapper">
      <div className={"progress"} style={{width: percent + '%', transitionDuration: STEP.toString()}}></div>
    </div>
    <div>
      <button
        id="play-pause"
        onClick={() => playPause(state)}
      >
        { state.tag === 'playing' ? '⏸' : '▶️' }
      </button>
      <button
        onClick={() => {
          nextState({ tag: "stopped" });
        }}
      >
        ⏹
      </button>

    </div>
  </div>;
};
