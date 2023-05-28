import DataProvider from './context/DataProvider';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';

// Components
import Login from './Components/Account/Login';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header.js';
import CreatePost from './Components/Create/CreatePost';
import DetailView from './Components/details/DetailView';
import Update from './Components/Create/Update';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';

const PrivateRoute = ({ isAuthenticated, ...props }) => {

  return isAuthenticated ?
    <> 
      <Header />
      <Outlet />
    </>
    : <Navigate replace to='/login ' />
}


function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 64 }}>
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/create' element={<CreatePost />} />
            </Route>

            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/details/:id' element={<DetailView/>} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/update/:id' element={<Update />} />
            </Route>

            <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/contact' element={<Contact />} />
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
