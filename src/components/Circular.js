import React from 'react';
import styled from 'styled-components';

const CircleBar = styled.svg`



circle {
    transition: all 0.5s ease 0s;
    transition-delay: 0.1s;
}
.circle-background,
.circle-progress {
  fill: none;
}

.circle-background {
  stroke: #ddd;
}

.circle-progress {
  stroke: palevioletred;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.circle-text {
  font-size: 3em;
  font-weight: bold;
  fill: palevioletred;
}`;

const Circular = ({ sqSize, strokeWidth, percentage }) => {

    const radius = (sqSize - strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * percentage / 100;

    return(
         <CircleBar
          width = { sqSize }
          height = { sqSize }
          viewBox = { viewBox }>
          <circle
            className = "circle-background"
            cx = { sqSize / 2 }
            cy = { sqSize / 2 }
            r = { radius }
            strokeWidth = {`${strokeWidth}px`} />
          <circle
            className="circle-progress"
            cx = { sqSize / 2 }
            cy = { sqSize / 2 }
            r = { radius }
            strokeWidth={`${strokeWidth}px`}
            transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset
            }} />
          <text
            className="circle-text"
            x = "50%"
            y = "50%"
            dy = ".3em"
            textAnchor = "middle">
            {`${percentage}%`}
          </text>
      </CircleBar>
    )
}
export default Circular;