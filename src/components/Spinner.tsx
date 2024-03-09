import React from "react";
import { CircularProgress, Backdrop } from "@mui/material";

interface SpinnerProps {
  open: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ open }) => {
  return (
    <Backdrop
      sx={{
        zIndex: 1400,
        color: "#fff",
      }}
      open={open}
    >
      <CircularProgress color="secondary" />
    </Backdrop>
  );
};

export default Spinner;
