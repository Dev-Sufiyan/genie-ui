import React, { useState } from "react";
import {
  ComboBox,
  IComboBoxOption,
  TextField,
  PrimaryButton,
  Stack,
  MessageBar,
  MessageBarType,
  IComboBox,
} from "@fluentui/react";

const initialUnits: IComboBoxOption[] = [
  { key: "1", text: "Galla 1" },
  { key: "2", text: "Galla 2" },
  { key: "3", text: "Galla 3" },
];

const UnitSelectionForm: React.FC = () => {
  const [filteredUnits, setFilteredUnits] =
    useState<IComboBoxOption[]>(initialUnits);
  const [selectedUnit, setSelectedUnit] = useState<string | undefined>();
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Handle input change and filter options based on the search text
  const onInputChange = (newValue?: string) => {
    if (newValue) {
      const filtered = initialUnits.filter((option) =>
        option.text.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredUnits(filtered);
    } else {
      setFilteredUnits(initialUnits);
    }
  };

  const onUnitChange = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption,
    index?: number,
    value?: string
  ) => {
    if (option) {
      setSelectedUnit(option.key as string);
    } else if (value) {
      setSelectedUnit(value);
    }
  };

  const onAmountChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setAmount(newValue || "");
  };

  const onSubmit = () => {
    if (!selectedUnit || !amount) {
      setError("Both Unit and Amount are required.");
      return;
    }

    setError(null);
    console.log("Selected Unit Key:", selectedUnit);
    console.log("Amount:", parseFloat(amount));
  };

  return (
    <Stack
      tokens={{ childrenGap: 15 }}
    >
      <div className="txtCenterGrey">Collect Donation</div>
      {error && (
        <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
          {error}
        </MessageBar>
      )}
      <ComboBox
        label="Select Unit"
        placeholder="Search or select an option"
        options={filteredUnits} // Use the filtered options here
        onChange={onUnitChange}
        onInputValueChange={onInputChange} // Filter options based on input
        selectedKey={selectedUnit}
        required
        allowFreeform={true}
        autoComplete="on"
        ariaLabel="Unit selection combobox"
      />
      <TextField
        label="Amount"
        placeholder="Enter a double value"
        value={amount}
        onChange={onAmountChange}
        required
        type="number"
        step="0.01"
        ariaLabel="Amount input"
      />
      <PrimaryButton text="Submit" onClick={onSubmit} />
    </Stack>
  );
};

export default UnitSelectionForm;
