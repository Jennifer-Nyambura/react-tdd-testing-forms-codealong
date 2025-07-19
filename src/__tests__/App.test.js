import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// 🍕 Checkbox tests
test("pizza checkboxes are initially unchecked", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
  expect(checkbox).not.toBeChecked();
});

test("adds and removes pepperoni when checkbox is clicked", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: /add pepperoni/i });

  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

// 🍕 Dropdown tests
test("size select element initially displays 'Small'", () => {
  render(<App />);
  const selectSize = screen.getByLabelText(/select size/i);
  expect(selectSize).toHaveDisplayValue("Small");
});

test("select Size dropdown displays the user's selected value", () => {
  render(<App />);
  const selectSize = screen.getByLabelText(/select size/i);

  userEvent.selectOptions(selectSize, "medium");
  expect(selectSize).toHaveDisplayValue("Medium");

  userEvent.selectOptions(selectSize, "large");
  expect(selectSize).toHaveDisplayValue("Large");
});

// 🍕 Display message tests
test("'Your Selection' message initially displays 'small cheese'", () => {
  render(<App />);
  expect(screen.getByText(/small cheese/i)).toBeInTheDocument();
});

test("selecting options updates the 'Your selection' message", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  const selectSize = screen.getByLabelText(/select size/i);

  userEvent.click(addPepperoni);
  expect(screen.getByText(/small pepperoni/i)).toBeInTheDocument();

  userEvent.selectOptions(selectSize, "large");
  expect(screen.getByText(/large pepperoni/i)).toBeInTheDocument();
});

// 📧 Contact info tests
test("'Contact Info' text box initially displays a placeholder value of 'email address'", () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
});

test("the page shows information the user types into the contact form field", () => {
  render(<App />);
  const contact = screen.getByLabelText(/enter your email address/i);
  userEvent.type(contact, "pizzafan@email.com");
  expect(contact).toHaveValue("pizzafan@email.com");
});

// 📝 Submit button tests
test("form contains a 'Submit Order' button", () => {
  render(<App />);
  expect(
    screen.getByRole("button", { name: /submit order/i })
  ).toBeInTheDocument();
});

test("clicking the Place Order button displays a thank you message", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: /submit order/i });

  userEvent.click(button);
  expect(screen.getByText(/thanks for your order!/i)).toBeInTheDocument();
});
