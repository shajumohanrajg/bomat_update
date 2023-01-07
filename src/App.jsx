import React from "react";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import Router from "./routes";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />      
      <Router />
    </ThemeConfig>
  );
}

export default App;
