import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
        button: {
          textTransform: "none",
        },
      },
})

export default theme;