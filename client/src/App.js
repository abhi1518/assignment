import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import AllUser from "./components/allUser/AllUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<HomePage />} />
           <Route path="all-user" element={<AllUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
