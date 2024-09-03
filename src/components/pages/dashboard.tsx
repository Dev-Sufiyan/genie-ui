import React, { useEffect, useState } from "react";
import { NumberBox } from "../ui/box";
import {
  Divider,
  tokens,
  makeStyles,
  Input,
  Text,
  Button,
} from "@fluentui/react-components";
import { AddSquareFilled } from "@fluentui/react-icons";
import "../../styles/common.css";
import { getCount, addCount } from "../../utils/api";
import myImg from "../../custome/Logo.jpg";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: "5px",
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "5px",
    width: "100%", // Ensure it takes full width
  },
  divider: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    backgroundColor: tokens.colorNeutralBackground1,
    width: "100%",
    minHeight : "40px"
  },
  dividerContent: {
    fontSize: "18px",
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
    width: "100%",
    maxWidth: "350px",
  },
  input: {
    width: "100%",
  },
  button: {
    width: "100%",
    minHeight :"30px",
    maxWidth: "350px",
    fontWeight: "normal",
  },
  img: {
    width: "100px",
    height: "100px",
  },
  text: {
    textAlign: "center", // Center text for mobile devices
  },
  "@media (max-width: 600px)": {
    img: {
      width: "100px", // Resize for smaller screens
      height: "100px",
    },
    dividerContent: {
      fontSize: "16px",
    },
  },
});

const Dashboard: React.FC = () => {
  const [number, setNumber] = useState<number>(0);
  const [inputValue, setInputValue] = useState<number | "">("");
  const [message, setMessageValue] = useState("");

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const data: number = await getCount();
        setNumber(data);
      } catch (error) {
        console.error("Error fetching count:", error);
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
      console.error("Error incrementing number:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = value === "" ? "" : Number(value);

    if (
      numericValue === "" ||
      (numericValue >= 1 && numericValue <= 1000000000)
    ) {
      setInputValue(numericValue);
    }
  };

  const handleButtonClick = () => {
    incrementNumber(Number(inputValue));
    if(inputValue !== '')setMessageValue(`આપકે દ્વારા પઢા ગયા ${inputValue} દુરૂદ Count કર લિયા ગયા હૈ.`)
    setInputValue(""); // Clear input after adding
  };

  return (
    <div className={styles.root}>
      <img src={myImg} alt="FAIZAN-E-AULIYA" className={styles.img} />
      <Text size={700} weight="bold" font="monospace" className={styles.text}>
        FAIZAN-E-AULIYA
      </Text>
      <Text size={700} weight="bold" font="monospace" className={styles.text}>
        CHARITABLE TRUST
      </Text>
      <div>
        <NumberBox number={number} />
      </div>
      <Button
        className={styles.button}
        icon={
          <div className={styles.iconWrapper}>
            <span>1</span>
          </div>
        }
        appearance="primary"
        onClick={() => incrementNumber(1)}
      >
        એક બાર પઢે ગયે દુરૂદ શરીફ કે લિયે યહાં ક્લિક કરે
      </Button>

      <div className={styles.divider}>
        <Divider className={styles.dividerContent}>or</Divider>
      </div>
      <div>
        કોઈ ભી દુરૂદ શરીફ આપકે દ્વારા કિતની મર્તબા પઢા ગયા વો નીચે લિખે. :
      </div>
      <div className={styles.inputContainer}>
        <Input
          className={styles.input}
          size="large"
          type="number"
          placeholder="Select Durood Count"
          value={inputValue === "" ? "" : inputValue.toString()}
          onChange={handleInputChange}
        />
        <Button
          className={styles.button}
          icon={<AddSquareFilled />}
          appearance="primary"
          onClick={handleButtonClick}
        >
          સબમીટ કરને કે લિયે યહાં ક્લિક કરે
        </Button>
        <div>
          {message}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
