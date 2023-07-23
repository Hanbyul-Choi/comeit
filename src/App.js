import { Home, Intro } from "pages";
import { Route, Routes } from "react-router-dom";
import { GlobalStyle } from "styles";

const App = () => {
  return (
    <div className="App">
      <GlobalStyle />

      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:contentid" element={<Home />} />
        <Route path="/edit/:contentid" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
