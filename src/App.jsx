import './App.css';
import {Routes, Route} from "react-router-dom";
import {Home, Enquire} from "./components"


function App() {

  const isLoggedIn = true;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home/> : <Enquire/>} />
      </Routes>
    </div>
  );
}

export default App;
