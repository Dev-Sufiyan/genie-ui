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
import ConfirmDtPopup from "./confimDtPopup";

interface Person {
  id: string;
  name: string;
  mobile: string;
  address: string;
  avatarColor: string; 
}

// Sample data array
const people: Person[] = [
  {
    id: 'eatkins',
    name: 'Elvia Atkins',
    mobile: '+123456789',
    address: '123 Main St, City',
    avatarColor: 'colorful',
  },
  {
    id: 'jdoe',
    name: 'John Doe',
    mobile: '+987654321',
    address: '456 Another St, City',
    avatarColor: 'brand',
  },
  {
    id: 'jsmith',
    name: 'Jane Smith',
    mobile: '+555555555',
    address: '789 Third St, City',
    avatarColor: 'blue', 
  },
];

const initialUnits: IComboBoxOption[] = people.map((person) => ({
  key: person.id,
  text: person.name,
  data: person,
}));

const UnitSelectionForm: React.FC = () => {
  const [filteredUnits, setFilteredUnits] = useState<IComboBoxOption[]>(initialUnits);
  const [selectedUnit, setSelectedUnit] = useState<string | undefined>();
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);

  const onInputChange = (newValue?: string) => {
    if (newValue) {
      const filtered = initialUnits.filter((option) =>
        option.text.toLowerCase().includes(newValue.toLowerCase()) 
      || option.data.mobile.toLowerCase().includes(newValue.toLowerCase())
      || option.data.address.toLowerCase().includes(newValue.toLowerCase())
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
      // Check if the input value matches a valid option
      const matchedOption = initialUnits.find(opt => opt.text === value);
      if (matchedOption) {
        setSelectedUnit(matchedOption.key as string);
      } else {
        setSelectedUnit(undefined); // Discard the input if no match
      }
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
      // Clear input if no valid unit is selected
      if (!selectedUnit) {
        setFilteredUnits(initialUnits); // Reset the filtered units
        setSelectedUnit(undefined); // Clear selection
      }
      return;
    }

    setError(null);
    console.log("Selected Unit Key:", selectedUnit);
    console.log("Amount:", parseFloat(amount));
    setConfirmPopupOpen(true);
  };

  const handleConfirm = async (id: string, amount: string) => {
    // Simulate an API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.5); // Randomly resolve as success or failure
      }, 2000); // Simulate a 2-second delay
    });
  };
  
  return (
    <Stack tokens={{ childrenGap: 15 }}>
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
        onRenderOption={(option?: IComboBoxOption) => {
          if (!option || !option.data) {
            return null;
          }
          const person = option.data as Person; // Cast the data to Person type
          return (
            <div>
              <strong>{person.name}</strong>
              <div>Mobile: {person.mobile}</div>
              <div>Address: {person.address}</div>
            </div>
          );
        }}
      />
      <TextField
        label="Amount"
        placeholder="Enter a value"
        value={amount}
        onChange={onAmountChange}
        required
        type="number"
        step="0.01"
        ariaLabel="Amount input"
      />
      <PrimaryButton text="Submit" onClick={onSubmit} />
      <ConfirmDtPopup
        isOpen={isConfirmPopupOpen}
        onClose={() => setConfirmPopupOpen(false)}
        id={selectedUnit || ""}
        amount={amount}
        onConfirm={handleConfirm}
      />
    </Stack>
  );
};

export default UnitSelectionForm;
