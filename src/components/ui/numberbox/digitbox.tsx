import React, { useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "../../../styles/digitbox.css";

interface DigitBoxProps {
  digit: number;
}

const DigitBox: React.FC<DigitBoxProps> = ({ digit }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="digit-container">
      <SwitchTransition>
        <CSSTransition
          key={digit}
          timeout={300}
          classNames="digit"
          nodeRef={nodeRef}
        >
          <div ref={nodeRef} className="digit">
            {digit}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default DigitBox;
