import Card from '../../components/card/card';
import { getShows } from '../../helper/showApi';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '../../helper/authApi';
import CreateModal from '../../components/modals/createModal';
import Spinner from '../../components/spinner/spinners';

export default function Main() {
  const { user, token } = isAuthenticated();
  const [shows, setShows] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  //loading product from server
  const loadAllShows = () => {
    getShows(user._id, token).then((data) => {
      if (data.error) {
      } else {
        setShows(data.shows);
      }
    });
  };

  //calling server api fucnction onload
  useEffect(() => {
    loadAllShows();
  }, []);

  const toggleModal = () => {
    if (modalShow) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-14 mx-auto">
        <button
          className="mb-5 block text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center color-white"
          type="button"
          data-modal-toggle="authentication-modal"
          onClick={toggleModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
          </svg>
          <span className="ml-2">Create New Show</span>
        </button>
        {modalShow && (
          <CreateModal closeModal={toggleModal} reloadShows={loadAllShows} />
        )}
        <div className="flex flex-wrap -m-4 justify-center">
          {shows.length > 0 ? (
            shows.map((show) => {
              return (
                <Card key={show._id} data={show} reloadShows={loadAllShows} />
              );
            })
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </section>
  );
}
