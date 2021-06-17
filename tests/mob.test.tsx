import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import App from "../src/App";
import {Mob} from "../src/components/Mob";

describe("Mob Component", () => {
  let mobWrapper: ShallowWrapper;
  beforeEach(() => {
    mobWrapper = shallow(<Mob />)
  })

  test("The Mob component is present on the App", () => {
    const wrapper = shallow(<App />)
    expect(wrapper.exists(Mob)).toBeTruthy()
  })

  test("It has a header", () => {
    expect(mobWrapper.find('header')).toHaveLength(1)
    expect(mobWrapper.html()).toContain('Mob');
  })
})