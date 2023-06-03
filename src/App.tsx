import React from "react";
import PageRoutes from "./pages/PageRoutes";
import { BrowserRouter } from "react-router-dom";
import { StoresProvider } from "./StoresProvider";

function App() {
  return (
    <StoresProvider>
      <BrowserRouter>
        <div className="App">
          <PageRoutes />
        </div>
      </BrowserRouter>
    </StoresProvider>
  );
}

export default App;
