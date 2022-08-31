import React from "react";
import ReactDOM from "react-dom";
import Footer from "./Footer.jsx";

import Header from "./Header.jsx";
import { BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <div className="container bg-light">
      <BrowserRouter>
        <Header />
      </BrowserRouter>
      <Footer />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
