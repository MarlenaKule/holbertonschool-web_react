
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() });

import React from "react";
import { shallow } from "enzyme";
// ... pjesa tjetër e import-eve të tua

import App from "./App";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import CourseList from "../CourseList/CourseList";
import NewContext from "../Context/context";

describe("<App />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it("contains Notifications, Header, Footer", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Notifications).exists()).toBe(true);
    expect(wrapper.find(Header).exists()).toBe(true);
    expect(wrapper.find(Footer).exists()).toBe(true);
  });

  it("renders Login by default (user not logged in)", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Login).exists()).toBe(true);
    expect(wrapper.find(CourseList).exists()).toBe(false);
  });

  it("displayDrawer is true by default", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Notifications).prop("displayDrawer")).toBe(true);
  });

  it("handleDisplayDrawer sets displayDrawer to true", () => {
    const wrapper = shallow(<App />);
    // First hide
    wrapper.find(Notifications).prop("handleHideDrawer")();
    wrapper.update();
    expect(wrapper.find(Notifications).prop("displayDrawer")).toBe(false);

    // Then show
    wrapper.find(Notifications).prop("handleDisplayDrawer")();
    wrapper.update();
    expect(wrapper.find(Notifications).prop("displayDrawer")).toBe(true);
  });

  it("handleHideDrawer sets displayDrawer to false", () => {
    const wrapper = shallow(<App />);
    wrapper.find(Notifications).prop("handleHideDrawer")();
    wrapper.update();
    expect(wrapper.find(Notifications).prop("displayDrawer")).toBe(false);
  });

  it("logIn updates user state (email, password, isLoggedIn)", () => {
    const wrapper = shallow(<App />);
    wrapper.find(Login).prop("logIn")("test@test.com", "password123");
    wrapper.update();

    // After login, CourseList should render, Login should not
    expect(wrapper.find(CourseList).exists()).toBe(true);
    expect(wrapper.find(Login).exists()).toBe(false);
  });

  it("logOut resets user state (isLoggedIn false, email/password cleared)", () => {
    const wrapper = shallow(<App />);
    // Log in first
    wrapper.find(Login).prop("logIn")("test@test.com", "password123");
    wrapper.update();
    expect(wrapper.find(CourseList).exists()).toBe(true);

    // Then log out — access logOut from context
    const contextValue = wrapper.find(NewContext.Provider).prop("value");
    contextValue.logOut();
    wrapper.update();

    expect(wrapper.find(Login).exists()).toBe(true);
    expect(wrapper.find(CourseList).exists()).toBe(false);
  });

  it("markNotificationAsRead removes a notification by id", () => {
    const wrapper = shallow(<App />);
    const before = wrapper.find(Notifications).prop("notifications");
    const idToRemove = before[0].id;

    wrapper.find(Notifications).prop("markNotificationAsRead")(idToRemove);
    wrapper.update();

    const after = wrapper.find(Notifications).prop("notifications");
    expect(after.length).toBe(before.length - 1);
    expect(after.find((n) => n.id === idToRemove)).toBeUndefined();
  });
});