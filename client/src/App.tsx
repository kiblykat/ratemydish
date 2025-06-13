import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/apollo";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DishList from "./pages/DishList";
import DishDetail from "./pages/DishDetail";
import AddDish from "./pages/AddDish";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="min-h-screen bg-base-200">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
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
      </Router>
    </ApolloProvider>
  );
}

export default App;
