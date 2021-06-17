import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import App from "../src/App"
import {Timer} from "../src/components/Timer"


describe("Timer Component", () => {
  let timerWrapper: ShallowWrapper;
  beforeEach(() => {
    timerWrapper = shallow(<Timer time={10}/>)
  })

  test("There is a Timer on the app", () => {
    const wrapper = shallow(<App />)
    expect(wrapper.exists(Timer)).toBeTruthy()
  })

  test("There are 2 buttons in the Timer component", () => {
    expect(timerWrapper.find('button')).toHaveLength(2)
  })

  test("When the timer is stopped, time status is displayed", () => {
    expect(timerWrapper.html()).toContain("00:10.00")
  })

  test("When the timer is started, seconds are displayed", () => {
    const playPauseButton = timerWrapper.find("#play-pause")
    playPauseButton.simulate('click')
    expect(timerWrapper.html()).toContain('⏸');
    })

  test("Clicking two times on start/pause, pause the timer", () => {
    const playPauseButton = timerWrapper.find("#play-pause")
    playPauseButton.simulate('click')
    playPauseButton.simulate('click')
    expect(playPauseButton.text()).toBe("▶️")
  })
})