import {DrawerItem} from '../../../types'
import * as React from "react";
import {
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
} from "@fluentui/react-nav-preview";
import { Tooltip, makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height : "100vh",
  },
  content: {
    flex: "1",
    padding: "16px",
    // display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  field: {
    display: "flex",
    marginTop: "4px",
    marginLeft: "8px",
    flexDirection: "column",
    gridRowGap: tokens.spacingVerticalS,
  },
});


export const Drawer: React.FC<{ items: DrawerItem[] }> = (props) => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const type = "overlay";
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  
  const renderHamburgerWithToolTip = () => (
    <Tooltip content="Navigation" relationship="label">
      <Hamburger onClick={() => setIsOpen(!isOpen)} />
    </Tooltip>
  );

  const renderSelectedComponent = () => {
    const SelectedComponent = props.items[selectedItemIndex]?.component || null;
    return SelectedComponent;
  };

  const handleNavItemClick = (index: number) => {
    setSelectedItemIndex(index);
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.root}>
      <NavDrawer
        open={isOpen}
        type={type}
      >
        <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>
        <NavDrawerBody style={{ overflowY: 'scroll', maxHeight: '100%' }}>
          {props.items.map((item, index) => (
            <NavItem
              key={item.value}
              icon={item.icon}
              value={item.value}
              onClick={() => handleNavItemClick(index)} // Set index on click
            >
              {item.text}
            </NavItem>
          ))}
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.content}>
        {!isOpen && renderHamburgerWithToolTip()}
        {!isOpen && renderSelectedComponent()}
      </div>
    </div>
  );
};
