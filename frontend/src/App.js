import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Landingpage from "./screens/LandingPage/Landingpage";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyNotes from "./screens/MyNotes/MyNotes";
import MyContacts from "./screens/MyNotes/MyContacts";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landingpage />} exact />
          <Route path="/mynotes" element={<MyNotes />} exact />
          <Route path="/mycontacts" element={<MyContacts />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/register" element={<RegisterScreen />} exact />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
