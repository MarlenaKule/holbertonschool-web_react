import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("Renders Header component", () => {
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /school dashboard/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("Renders Login Component", () => {
    const loginText = screen.getByText(/Login to access the full dashboard/i);
    expect(loginText).toBeInTheDocument();
  });

  it("Renders Footer Component", () => {
    expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
  });

  it("Renders the News from the School section", () => {
    expect(screen.getByText(/news from the school/i)).toBeInTheDocument();
    expect(
      screen.getByText(/holberton school news goes here/i),
    ).toBeInTheDocument();
  });

  it("CourseList is rendered when isLoggedIn is false", () => {
    cleanup();

    const rendered = render(<App />);
    const container = rendered.container;

    const loginComponent = container.querySelector(".App-body");

    expect(loginComponent).toBeInTheDocument();
  });

  it("CourseList is rendered when isLoggedIn is true", () => {
    cleanup();

    const rendered = render(<App isLoggedIn={true} />);
    const container = rendered.container;

    const courseList = container.querySelector("#CourseList");

    expect(courseList).toBeInTheDocument();
  });

  it("CourseList section has the margin-bottom wrapper class", () => {
    cleanup();

    const { container } = render(<App isLoggedIn={true} />);
    const wrapper = container.querySelector(".bodySectionWithMargin");
    expect(wrapper).toBeInTheDocument();
  });

  it("News from the School section does NOT have the margin-bottom class", () => {
    const newsHeading = screen.getByText(/news from the school/i);
    const newsSection = newsHeading.closest("div");
    expect(newsSection).not.toHaveClass("bodySectionWithMargin");
  });
});
