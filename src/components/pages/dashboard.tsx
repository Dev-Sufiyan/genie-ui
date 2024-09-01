import React, { useState } from "react";
import { NumberBox } from "../ui/box";
import {
  CompoundButton,
  Divider,
  tokens,
  makeStyles,
  Input,
} from "@fluentui/react-components";
import { AddSquareFilled } from "@fluentui/react-icons";
import "../../styles/common.css";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center align items
    rowGap: "10px", // Adjust gap between elements
  },
  divider: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100px", // Increase the height of the divider container
    backgroundColor: tokens.colorNeutralBackground1,
    width: "100%", // Ensure divider takes full width
  },
  dividerContent: {
    fontSize: "18px", // Optional: increase the font size of the text inside the divider
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
    marginTop: "10px",
    width: "100%", // Ensure input container takes full width
    maxWidth: "350px", // Adjust as needed to match the width of the buttons
  },
  input: {
    width: "100%", // Ensure input takes full width of its container
  },
  button: {
    width: "100%", // Ensure button takes full width of its container
    maxWidth: "350px", // Adjust as needed
  },
});

const Dashboard: React.FC = () => {
  const [number, setNumber] = useState<number>(99999999);
  const [inputValue, setInputValue] = useState<number | "">("");

  const styles = useStyles();

  const incrementNumber = (valueToAdd: number) => {
    setNumber((prevNumber) => prevNumber + valueToAdd);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = value === "" ? "" : Number(value);

    if (numericValue === "" || (numericValue >= 1 && numericValue <= 1000)) {
      setInputValue(numericValue);
    }
  };

  const handleButtonClick = () => {
    incrementNumber(Number(inputValue));
    setInputValue(""); // Clear input after adding
  };

  return (
    <div className={styles.root}>
      <div>
        <NumberBox number={number} />
      </div>
      <CompoundButton
        className={styles.button}
        icon={
          <div className={styles.iconWrapper}>
            <span>1</span>
          </div>
        }
        appearance="primary"
        secondaryContent="Click here to send 1 recited Durood Sharif"
        onClick={() => incrementNumber(1)}
      >
        Send Durood to Prophet Muhammad ﷺ
      </CompoundButton>

      <div className={styles.divider}>
        <Divider className={styles.dividerContent}>or</Divider>
      </div>

      <div className={styles.inputContainer}>
        <Input
          className={styles.input}
          size="large"
          type="number" // Ensure only numbers are accepted
          placeholder="Select Durood Count"
          value={inputValue === "" ? "" : inputValue.toString()}
          onChange={handleInputChange}
        />
        <CompoundButton
          className={styles.button}
          icon={<AddSquareFilled />}
          appearance="primary"
          secondaryContent="Click here to send recited Durood Sharif"
          onClick={handleButtonClick}
        >
          Send Durood to Prophet Muhammad ﷺ
        </CompoundButton>
      </div>
    </div>
  );
};

export default Dashboard;
