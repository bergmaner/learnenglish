import React from 'react';
import styled from 'styled-components';
import { Spring, config } from 'react-spring/renderprops';

const CircleBar = styled.svg`

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
  animation: fadein 2s;
}`;

const Circular = ({ sqSize, strokeWidth, percentage }) => {

    const radius = (sqSize - strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;

    return(
      <Spring
  from = {{ value: 0 }}
  to = {{ value: percentage }}
  config={config.molasses}>
  { ({ value })  =>  <CircleBar
          width = { sqSize }
          height = { sqSize }
          viewBox = { viewBox }>
          <circle
            className = "circle-background"
            cx = { sqSize  / 2 }
            cy = { sqSize / 2 }
            r = { radius }
            strokeWidth = {`${strokeWidth}px`} />
          <circle
            className="circle-progress"
            cx = { sqSize / 2 }
            cy = { sqSize / 2 }
            r = { radius }
            strokeWidth = {`${strokeWidth}px`}
            transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashArray - dashArray * value / 100
            }} />
          <text
            className="circle-text"
            x = "50%"
            y = "50%"
            dy = ".3em"
            textAnchor = "middle">
            {`${ value.toFixed() }%`}
          </text>
      </CircleBar>}
</Spring>
         
    )
}
export default Circular;