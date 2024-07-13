import { Routes, Route } from 'react-router-dom';
import MainContentSection from './Maincontent';
import Adminpage from './Adminpage';
import "./App.css";
import LoginPage from "./LoginPage";

const App = () => {
  return (
    <div className='app'>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Adminpage" element={<Adminpage />} />
          <Route path="/link-gen" element={<MainContentSection />} />
      </Routes>     
    </div>
  );
};

export default App;