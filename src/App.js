import "./App.css";
import { Navigate, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import { useSelector } from "react-redux";
function App() {
  const state = useSelector((state) => state.Reducer);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={state.user !== null ? <Home /> : <Navigate to="/signup" />}
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
export default App;
