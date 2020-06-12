import React from "react";
import { useSpring, animated } from "react-spring";

const Slide = ({ children, leftSlide = true, width }) => {
  const props = useSpring({
    opacity: 1,
    transform: "translate(0px,0px)",
    from: {
      opacity: 0,
      transform: leftSlide ? "translate(500px,0px)" : "translate(-500px,0px)",
    },
  });
  return (
    <div style={{ overflow: "hidden", width: `${width}%` }}>
      <animated.div style={props}>{children}</animated.div>
    </div>
  );
};

export default Slide;
