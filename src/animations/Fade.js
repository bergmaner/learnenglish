import React from 'react';
import { useSpring, animated } from 'react-spring';

const Fade = ({ children, width }) => {
    const props = 
    useSpring({ opacity: 1, from: { opacity: 0 } });
    return <div style = {{ overflow: 'hidden', width: `${width}%` }}><animated.div style = {props}>{ children }</animated.div></div>;
  };

  export default Fade;