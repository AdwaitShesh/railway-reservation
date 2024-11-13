// src/components/__tests__/App.test.tsx
import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchForm from "../src/components/SearchForm";
import TrainList from "../src/components/TrainList";
import PaymentForm from "../src/components/PaymentForm";
import { trains } from "../src/data/trains";
import "@testing-library/jest-dom";

describe("Railway Reservation System Tests", () => {

  // Test case 1: SearchForm component renders correctly
  test("renders SearchForm", () => {
    render(<SearchForm onSearch={jest.fn()} />);
    expect(screen.getByLabelText(/From/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/To/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
  });

  // Test case 2: TrainList component renders train data correctly
  test("renders TrainList with trains", () => {
    const handleSelect = jest.fn();
    render(<TrainList trains={trains} onSelect={handleSelect} />);
    expect(screen.getByText(/Rajdhani Express/i)).toBeInTheDocument();
    expect(screen.getByText(/Duronto Express/i)).toBeInTheDocument();
  });

  // Test case 3: PaymentForm component renders correctly
  test("renders PaymentForm with correct amount", () => {
    render(<PaymentForm amount={1500} onPaymentComplete={jest.fn()} />);
    expect(screen.getByText(/Payment Details/i)).toBeInTheDocument();
  });

  // Test case 4: SearchForm handles form submission
  test("handles SearchForm submission", () => {
    const handleSearch = jest.fn();
    render(<SearchForm onSearch={handleSearch} />);

    fireEvent.change(screen.getByLabelText(/From/i), { target: { value: "Ahmedabad" } });
    fireEvent.change(screen.getByLabelText(/To/i), { target: { value: "Nagpur" } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: "2023-10-20" } });

    fireEvent.click(screen.getByRole("button", { name: /Search Trains/i }));

    expect(handleSearch).toHaveBeenCalledWith("Mumbai Central", "Ahmedabad", "2023-10-20");
  });

  // Test case 5: PaymentForm handles payment submission
  test("handles PaymentForm submission", async () => {
    const handlePaymentComplete = jest.fn();
    render(<PaymentForm amount={1500} onPaymentComplete={handlePaymentComplete} />);

    fireEvent.change(screen.getByLabelText(/Card Number/i), { target: { value: "1234567890123456" } });
fireEvent.change(screen.getByLabelText(/Expiry Date/i), { target: { value: "1225" } });
fireEvent.change(screen.getByLabelText(/CVV/i), { target: { value: "123" } });
fireEvent.change(screen.getByLabelText(/Card Holder Name/i), { target: { value: "John Doe" } });

    fireEvent.click(screen.getByRole("button", { name: /Pay/i }));

    await waitFor(() => {
      expect(handlePaymentComplete).toHaveBeenCalled();
    });
  });
});


// To run the tests, you can use the command:
// npm test
