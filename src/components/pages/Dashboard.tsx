import React, { useState } from "react";
import { NumberBox } from "../ui/numberbox";

const Dashboard: React.FC = () => {
  const [number, setNumber] = useState<number>(99999999);

  const incrementNumber = () => {
    setNumber(prevNumber => prevNumber + 1);
  };

  return (
    <div>
      <div><NumberBox number={number}/></div>
      <button onClick={incrementNumber}>Increase Number by 1</button>
    </div>
  );
};

export default Dashboard;
