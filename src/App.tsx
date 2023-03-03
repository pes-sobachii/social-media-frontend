import Account from "./pages/Account";
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Feed from "./pages/Feed";
import PostConstructor from "./components/PostConstructor";
import Container from "@mui/material/Container";
import Register from "./pages/Register";
import Login from "./pages/Login";
import React, {useState} from "react";
import {IAuthUser} from "./Types/UserTypes";
import FullPost from "./pages/FullPost";
import Search from "./pages/Search";
import useGetMe from "./services/hooks/userHooks/useGetMe";

const App = () => {

  const [auth, setAuth] = useState<IAuthUser>({
    _id: '',
    name: '',
    surname: '',
    email: '',
    token: '',
    followings: [],
    followers: [],
    status: '',
    profession: '',
    age: 0,
    gender: '',
    avatar: '',
    city: '',
  })

  useGetMe(window.localStorage.getItem('token'), setAuth)

  return (
      <div className={'wrapper'}>
        <Header auth={auth} setAuth={setAuth}/>
        <Container maxWidth={'lg'}>
          <Routes>
            <Route path='/user/:id' element={<Account auth={auth}/>}/>
            <Route path='/register' element={<Register setAuth={setAuth}/>}/>
            <Route path='/login' element={<Login setAuth={setAuth}/>}/>
            <Route path='/' element={<Feed auth={auth}/>}/>
            <Route path='/search' element={<Search auth={auth}/>}/>
            <Route path='/add-post' element={<PostConstructor auth={auth}/>}/>
            <Route path='/edit-post/:id' element={<PostConstructor auth={auth}/>}/>
            <Route path='/post/:id' element={<FullPost auth={auth}/>}/>
          </Routes>
        </Container>
      </div>
  )
};

export default App
