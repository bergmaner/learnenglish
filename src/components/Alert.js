import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
const Alert = ({ onClose, severity, children }) => {
  return (
    <MuiAlert
      elevation={6}
      variant="filled"
      onClose={onClose}
      severity={severity}
    >
      {children}
    </MuiAlert>
  );
};
export default Alert;
