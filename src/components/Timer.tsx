import React, { FunctionComponent, useEffect, useState } from "react";

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

//type TimerState = {state:'stopped'} | {state:'paused', timeRemaining: number}| {state:'playing', timeRemaining: number}
// https://github.com/Delni/second-to-mob/

export const Timer: FunctionComponent<TimerProps> = ({ time }) => {
  const STEP: number = 0.01;
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
        }, 10);
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

  return <div>
    {isStopped(state)
      ? state.tag
      : `Remaining time: ${state.timeRemaining.toFixed(2)}`}
    <br></br>
    <button
      onClick={() => playPause(state)}
    >
      ⏯️
    </button>
    <button
      onClick={() => {
        nextState({ tag: "stopped" });
      }}
    >
      ⏹
    </button>
  </div>;
};
