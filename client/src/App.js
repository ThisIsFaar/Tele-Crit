import Footer from './components/footer/footer';
import Nav from './components/nav/nav';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import CreateModal from './components/modals/createModal';
import UpdateModal from './components/modals/updateModal';

export default function App() {
  const { createModalToggle, updateModalToggle } = useSelector(
    (store) => store.entities.app
  );
  return (
    <div>
      {createModalToggle && <CreateModal />}
      {updateModalToggle && <UpdateModal />}
      <ToastContainer />
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
