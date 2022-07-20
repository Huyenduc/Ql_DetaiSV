import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Book from "./pages/book/Book"
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Author from "./pages/Author";
import Pushlic from "./pages/Pushlic";
import Bill from "./pages/Bill";
import Customer from "./pages/Customer";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="book">
              <Route index element={<Book/>} />
              {/* <Route path=":productId" element={<Single />} /> */}
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="author"
            element={<Author/>}>
  
            </Route>
            <Route path="Pushlic"
            element={<Pushlic/>}>
            </Route>
            <Route path="Bill"
            element={<Bill/>}>
            </Route>

            <Route path="Customer"
            element={<Customer/>}>
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
