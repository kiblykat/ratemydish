import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/apollo";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DishList from "./pages/DishList";
import DishDetail from "./pages/DishDetail";
import AddDish from "./pages/AddDish";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="min-h-screen bg-base-100">
          <Navbar />
          <main className="container mx-auto py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dishes" element={<DishList />} />
              <Route path="/dishes/:id" element={<DishDetail />} />
              <Route path="/dishes/add" element={<AddDish />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
