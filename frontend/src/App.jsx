import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./Home";
import SearchTrain from "./SearchTrain";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/train" element={<SearchTrain />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
