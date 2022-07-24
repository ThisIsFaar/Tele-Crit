import Footer from './components/footer/footer';
import Nav from './components/nav/nav';
import Main from './containers/main/main';
import Signin from './containers/signin/signin';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div>
      <ToastContainer />
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
