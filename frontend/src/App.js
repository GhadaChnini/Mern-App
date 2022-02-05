import "./App.css";
import Footer from "./components/footer/Footer";
import Landingpage from "./screens/LandingPage/Landingpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import MyContacts from "./MyContacts/MyContacts";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote"
import { useState, useEffect } from "react";
import SingleContact from "./screens/SingleContact/SingleContact";
import AddContact from "./screens/AddContact/AddContact";
import HeaderIn from "./components/header/HeaderIn";
import HeaderOut from "./components/header/HeaderOut";
import { useSelector } from "react-redux";

const App = () => {
  // window.location.reload();
  const [search, setSearch] = useState("");
  let header =
    window.location.pathname === "/" ||
    window.location.pathname === "/login" ||
    window.location.pathname === "/register" ? (
      <HeaderOut  />
    ) : (
      <HeaderIn setSearch={setSearch}  />
    );
    ;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  


  return (
    <BrowserRouter>
     {header}
      <main>
        <Routes>
          <Route path="" element={<Landingpage />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/register" element={<RegisterScreen />} exact />
          <Route path="/mynotes" element={<MyNotes search={search} />} exact />
          <Route path="/note/:id" element={<SingleNote />} exact />
          <Route path="/createnote" element={<CreateNote />} exact />
          <Route path="/contact/:id" element={<SingleContact />} exact />
          <Route
            path="/mycontacts"
            element={<MyContacts search={search} />}
            exact
          />
          <Route path="/addcontact" element={<AddContact/>} exact />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
