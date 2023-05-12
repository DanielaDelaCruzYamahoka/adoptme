import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { AddToCart, Nav } from "../Components/Mipanel";

test("adds class to nav when toggled", () => {
    const { getByTestId } = render(<Nav />);
    const navElement = getByTestId("nav");
  
    expect(navElement).not.toHaveClass("open");
    fireEvent.click(getByTestId("hamburger"));
    expect(navElement).toHaveClass("open");
  });