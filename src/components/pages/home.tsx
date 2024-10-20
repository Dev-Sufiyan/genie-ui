import React from "react";
import { Drawer } from "../layout/nav";
import { navItems } from "../../custome";

const home: React.FC = () => {
  return <Drawer items={navItems}/>
};

export default home;
