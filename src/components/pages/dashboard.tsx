import React, {useEffect, useState } from "react";
import { NumberBox } from "../ui/box";
import {
  CompoundButton,
  Divider,
  tokens,
  makeStyles,
  Input,
  Text 
} from "@fluentui/react-components";
import { AddSquareFilled } from "@fluentui/react-icons";
import "../../styles/common.css";
import { getCount,addCount } from "../../utils/api";

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
  const [number, setNumber] = useState<number>(0);
  const [inputValue, setInputValue] = useState<number | "">("");

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const data: number = await getCount();
        setNumber(data);
      } catch (error) {
        console.error('Error fetching count:', error);
        setNumber(0);
      }
    };
  
    fetchCount();
    const intervalId = setInterval(fetchCount, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const styles = useStyles();

  const incrementNumber = async (valueToAdd: number) => {
    try {
      await addCount(valueToAdd);
      const updatedCount = await getCount();
      setNumber(updatedCount);
    } catch (error) {
      console.error('Error incrementing number:', error);
    }
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
      <Text size={700} weight="bold" font="monospace">FAIZAN-E-AULIYA</Text>
      <Text size={700} weight="bold" font="monospace">CHARITABLE TRUST</Text>
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
