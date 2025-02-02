import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './Pages/signin';
import Signup from './Pages/signup';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import CreateProduct from './Pages/CreateProduct';
import Cart from './Pages/Cart';
import ProtectedRoute from '../Routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/productdetails/:id" element={<ProductDetails />} />

          <Route
            path="/createproduct"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
