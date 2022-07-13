import './App.scss';
import CategoryBanner from './banner/CategoryBanner';
import Header from './header/Header';
import Footer from './footer/Footer';
import ProductList from './product-list/ProductList';
import ProductDetails from './product-details/ProductDetails';
import Cart from './cart/Cart';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/product-details/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
