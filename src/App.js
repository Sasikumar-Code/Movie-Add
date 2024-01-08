import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DashBoard from "./Component/DashBoard";
import Login from "./Component/Login";
import MovieEdit from "./Component/MovieEdit";
import MovieInput from "./Component/MovieInput";
import MovieView from "./Component/MovieView";
import Portal from "./Component/Portal";
import SignUp from "./Component/SignUp";
import { UserContextProvider } from "./UseContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/Portal" element={<Portal />}>
            <Route path="" element={<DashBoard />} />
            <Route path="MovieInput" element={<MovieInput />} />
            <Route path="MovieView/:id" element={<MovieView />} />
            <Route path="MovieEdit/:id" element={<MovieEdit />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
