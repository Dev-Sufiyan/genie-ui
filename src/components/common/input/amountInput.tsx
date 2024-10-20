import React from "react";
import { Label, Input } from "@fluentui/react-components";

interface AmountInputProps {
  amount: string; // The current value of the amount input
  setAmount: (value: string) => void; // Function to update the amount state
  disabled?: boolean; // Optional: control whether the input is disabled
  isAmountError: boolean; // New prop to indicate if there's an error with the amount
}

const AmountInput: React.FC<AmountInputProps> = ({ amount, setAmount, disabled = false, isAmountError }) => {
  const amountId = "amount-input"; // or use useId() for dynamic ids

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setAmount(value);
  };

  return (
    <div style={{ display: "grid", gap: "4px", width: "100%" }}>
      <Label htmlFor={amountId}>
        Enter Amount <span style={{ color: "red" }}>*</span>
      </Label>
      <Input
        id={amountId}
        type="number" // Set to number to restrict input type
        step="0.01" // Allows decimals
        value={amount}
        onChange={handleAmountChange}
        style={{ width: "100%" }}
        disabled={disabled} // Disable if needed
        required
      />
      {isAmountError && (
        <div style={{ color: "red" }}>Amount is required and must be a number</div>
      )}
    </div>
  );
};

export default AmountInput;
