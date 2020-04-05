import React from 'react';
import styled from 'styled-components';

const Progressbar = styled.div`
    background-color: #d8d8d8;
	border-radius: 20px;
    position: relative;
    top: -10px;
	margin: 5px 0;
	height: 16px;
    width: 80%;`;

    const ProgressDone = styled.div`
    background: #CA6082;
	box-shadow: 0 1px 1px -3px palevioletred, 0 1px 3px #333;
	border-radius: 20px;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	
	

    `;
    
function ProgressBar(props) {
    return (
       <Progressbar >
          <ProgressDone style = {props.style}></ProgressDone>
       </Progressbar>
    )
}

export default ProgressBar;