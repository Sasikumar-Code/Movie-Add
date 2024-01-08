import { createTheme, Paper, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../TopBar";

function Portal() {
  const [mode, setMode] = useState("dark");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Paper elevation={4} style={{ minHeight: "100vh", borderRadius: 0 }}>
          <TopBar mode={mode} setMode={setMode} />

          <Outlet />
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default Portal;
