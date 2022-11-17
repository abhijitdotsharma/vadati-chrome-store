import './App.css';
import { Routes, Route } from "react-router-dom";
import { Home, Enquire } from "./components"

import { useAuth } from './context/auth-context'

function App() {

  const { user, setUser } = useAuth()

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user?.isLoggedIn !== false ? <Home user={user} setUser={setUser} /> : <Enquire user={user} setUser={setUser} />} />
      </Routes>
      
    </div>
  );
}

export default App;
