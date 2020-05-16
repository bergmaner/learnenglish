import React from 'react';
import { Snackbar } from '@material-ui/core';
import styled from 'styled-components';
import MuiAlert from '@material-ui/lab/Alert';

const Snack = styled(Snackbar)`
&&{
bottom: 10px;
.MuiPaper-root{
  justify-content: center;
}
@media screen and (max-width: 759px)
{
  left: 60px;
  width: calc(100vw - 92px);
 .MuiSnackbar-anchorOriginBottomLeft {
    width: calc(100vw - 92px);
    left:60px;
 }
 .MuiPaper-root {
  min-width: calc(100vw - 92px);
}
}
@media screen (min-width: 600px) and (max-width: 759px)
{
  width: calc(100vw - 92px);
  left: 60px;
    .MuiSnackbar-anchorOriginBottomLeft {
      width: calc(100vw - 92px);
      left: 60px;
    }
    .MuiPaper-root {
      min-width: calc(100vw - 92px);
  }
}
@media screen (min-width: 759px)
{
  width: 100vw;
  left: 0px;
    .MuiSnackbar-anchorOriginBottomLeft {
      width: 100vw;
      left: 0px;
    }
    .MuiPaper-root {
      min-width: 100vw;
  }
}
  }
  
`;


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Message = ({ open, handleClose, correct }) => {
  
    return (
        <Snack
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={ open }
        onClose={ handleClose }
      >
      { correct ? <Alert onClose={handleClose} severity="success">
        It's correct answer
      </Alert>
      : <Alert onClose={handleClose} severity="error">
      It's bad answer
    </Alert> }
    </Snack>
    )
}

export default Message;
