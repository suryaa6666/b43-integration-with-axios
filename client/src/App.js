import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Auth from './pages/Auth';
// import Product from './pages/Product';
// import DetailProduct from './pages/DetailProduct';
// import Complain from './pages/Complain';
// import Profile from './pages/Profile';
// import ComplainAdmin from './pages/ComplainAdmin';
// import CategoryAdmin from './pages/CategoryAdmin';
// import ProductAdmin from './pages/ProductAdmin';
// import UpdateCategoryAdmin from './pages/UpdateCategoryAdmin';
// import AddCategoryAdmin from './pages/AddCategoryAdmin';
// import AddProductAdmin from './pages/AddProductAdmin';
// import UpdateProductAdmin from './pages/UpdateProductAdmin';

// Get API config & setAuthToken here ...
import { API, setAuthToken } from './config/api';
import { UserContext } from './context/userContext';

// Init token on axios every time the app is refreshed here ...

function App() {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (state.isLogin == false) {
      navigate('/auth');
    } else {
      if (state.user.status == 'admin') {
        navigate('/complain-admin');
      } else if (state.user.status == 'customer') {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth', {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        }
      });

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);


  return (
    <Routes>
      {/* <Route exact path="/" element={<Product />} /> */}
      <Route path="/auth" element={<Auth />} />
      {/* <Route path="/product/:id" element={<DetailProduct />} />
      <Route path="/complain" element={<Complain />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/complain-admin" element={<ComplainAdmin />} />
      <Route path="/category-admin" element={<CategoryAdmin />} />
      <Route path="/update-category/:id" element={<UpdateCategoryAdmin />} />
      <Route path="/add-category" element={<AddCategoryAdmin />} />
      <Route path="/product-admin" element={<ProductAdmin />} />
      <Route path="/add-product" element={<AddProductAdmin />} />
      <Route path="/update-product/:id" element={<UpdateProductAdmin />} /> */}
    </Routes>
  );
}

export default App;
