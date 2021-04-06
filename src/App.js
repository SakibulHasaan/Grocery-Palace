import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Header from './Components/Header/Header';
import { createContext, useContext, useState } from 'react';
import Orders from './Components/Orders/Orders';
import AddProduct from './Components/AddProduct/AddProduct';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import CheckOutProduct from './Components/CheckOutProduct/CheckOutProduct';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div className="App">
        <Router>
          
          <Header></Header>

          <Switch>

            <Route exact path="/">
              <Home />
            </Route>

            <PrivateRoute path="/orders">
              <Orders></Orders>
            </PrivateRoute>

            <PrivateRoute path="/admin">
              <AddProduct></AddProduct>
            </PrivateRoute>

            <Route path="/login">
              <Login />
            </Route>

            <PrivateRoute path="/checkout/:id">
              <CheckOutProduct></CheckOutProduct>
            </PrivateRoute>

          </Switch>
        </Router>

      </div>
    </UserContext.Provider>
  );
}

export default App;
