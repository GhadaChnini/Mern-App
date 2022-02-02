import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Landingpage from "./screens/LandingPage/Landingpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import MyContacts from "./MyContacts/MyContacts";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote"
import { useState } from "react";
import SingleContact from "./screens/SingleContact/SingleContact";
import AddContact from "./screens/AddContact/AddContact";
const App = () => {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
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
