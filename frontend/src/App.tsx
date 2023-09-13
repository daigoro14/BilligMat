import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import SearchPage from "./pages/SearchPage";

export const url = process.env.REACT_APP_BILLIG_MAT || "http://localhost:8080";

// document.body.style.backgroundImage = "linear-gradient(to right, #d9b44e, #d99a4e)" 
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
