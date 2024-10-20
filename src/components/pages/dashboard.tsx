import React, { useState } from "react";
import { PrimaryButton, Stack } from "@fluentui/react";
import { Dropdown, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { TextField } from "@fluentui/react/lib/TextField";
import { Label } from "@fluentui/react-components";
import '../../styles/mobilePage.css'
const options: IDropdownOption[] = [
  { key: "option1", text: "Option 1" },
  { key: "option2", text: "Option 2" },
  { key: "option3", text: "Option 3" },
];

const SearchableDropdownForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkFormValidation();
    console.log("Form submitted:", { selectedOption, amount });
  };

  const checkFormValidation = (): void =>{
    if (!selectedOption) {
      setError("Please select an Unit.");
      return ;
    }
    if (!amount) {
      setError("Amount is required.");
      return;
    }
    setError("");
  }
  return (
    <div className="box-container">
      <div className="box">
        <div className="txt">Collect Donation</div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Stack tokens={{ childrenGap: 10 }}>
            <div>
              <Label htmlFor="dropdown">
                Select Unit <span style={{ color: "red" }}>*</span>
              </Label>
              <Dropdown
                id="dropdown"
                placeholder="Select an Unit"
                options={options}
                onChange={(e, option) =>
                  setSelectedOption(option?.key as string)
                }
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <Label htmlFor="amount">
                Amount <span style={{ color: "red" }}>*</span>
              </Label>
              <TextField
                type="number"
                id="amount"
                value={amount}
                onChange={(e, newValue) => setAmount(newValue || "")} // Handle amount input
                style={{ width: "100%" }}
                required
              />
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <PrimaryButton type="submit" style={{ width: "100%" }}>
              Submit
            </PrimaryButton>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default SearchableDropdownForm;
