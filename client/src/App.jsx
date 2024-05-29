import Home from "./pages/user/Home/Home";
import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRouter from "./routes/UserRouter";
import Register from "./pages/user/Register/Register";
import Login from "./pages/user/Login/Login";
import AdminRouter from "./routes/AdminRouter";
import HomeAdmin from "./pages/admin/Home/HomeAdmin";
import Book from "./pages/admin/Book/Book";
import Author from "./pages/admin/Author/Author";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserRouter />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/admin" element={<AdminRouter />}>
          <Route index element={<HomeAdmin />} />
          <Route path="/admin/products" element={<Book />} />
          <Route path="/admin/authors" element={<Author />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
