import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DishList from "./pages/DishList";
import DishDetail from "./pages/DishDetail";
import AddDish from "./pages/AddDish";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import client from "./lib/apollo";
import { ApolloProvider } from "@apollo/client";

function App() {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <div className="w-screen min-h-screen bg-base-200">
          <Navbar />
          <main className="w-full mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dishes" element={<DishList />} />
              <Route path="/dishes/:id" element={<DishDetail />} />
              <Route path="/add-dish" element={<AddDish />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </ApolloProvider>
  );
}

export default App;
