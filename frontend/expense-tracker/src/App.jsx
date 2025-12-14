import React from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/userContext';
import {Toaster} from 'react-hot-toast'
const App = () => {
  return (
    <UserProvider>
      <div >
      <Router>
          <Routes>
              <Route path='/' element={<Root></Root>}></Route>
              <Route path='/login' exact element={<Login/>}/>
              <Route path='/signup' exact element={<Signup/>}/>
              <Route path='/dashboard' exact element={<Home/>}/>         
              <Route path='/income' exact element={<Income/>}/>
              <Route path='/expense' exact element={<Expense/>}/>
          </Routes>
      </Router>
      </div>
      <Toaster 
        toastOptions={{
          className:"",
          style:{
            fontSize:"13px"
          }
        }}
      />
    </UserProvider>
  )
}

const Root= ()=>{
  //check if token exist in localstorage
  const isAuthentiated=!!localStorage.getItem('token');

  //Redirects to dashboard if athenticated , otherwise login

  return isAuthentiated ? (<Navigate to='/dashboard'/>) : (<Navigate to='/login'/>)
}

export default App
