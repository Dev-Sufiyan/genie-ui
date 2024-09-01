import React, { useState, useEffect } from "react";
import { DigitBox } from ".";

interface NumberBoxProps {
  number: number;
}

const NumberBox: React.FC<NumberBoxProps> = ({ number }) => {
  const [digits, setDigits] = useState<number[]>([]);

  // Convert the number to an array of digits
  useEffect(() => {
    const numberStr = number.toString();
    const digitsArray = numberStr.split("").map(Number);
    setDigits(digitsArray);
  }, [number]);

  return (
    <div className="centered-div">
      {digits.map((digit, index) => (
        <DigitBox key={index} digit={digit} />
      ))}
    </div>
  );
};

export default NumberBox;
