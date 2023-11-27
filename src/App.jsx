import './App.css';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter> 
      <div className="App">
        <Routes> 
          <Route exact path={'/'} element={<Home/>}/>
          <Route exact path={'/register'} element={<Register/>}/>
          <Route exact path={'/login'} element={<Login/>}/>
          <Route exact path={'/navbar'} element={<NavBar/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
