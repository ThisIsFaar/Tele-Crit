import { updateShow } from '../../helper/showApi';
import { isAuthenticated } from '../../helper/authApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
const Joi = require('joi');

export default function DeleteModal({ showData: sd, closeModal, reloadShows }) {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    showId: sd._id,
    title: sd.title,
    rating: sd.rating,
    review: sd.review,
    streamingApp: sd.streamingApp,
  });

  const { title, rating, review, streamingApp } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const schema = Joi.object({
    rating: Joi.number(),
  });

  const onSubmit = (event) => {
    event.preventDefault();

    const { error } = schema.validate({ rating });
    if (error) {
      errorToast(error.message);
    } else {
      updateShow({ user, token, values })
        .then((data) => {
          if (data.code === 200) {
            reloadShows();
            closeModal(false);
            toast.success('Yippe! Show Successfully Updated.', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (data.code === 406) {
            errorToast(data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const errorToast = (message) => {
    toast.error(`${message}`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <div
        id="authentication-modal"
        tabIndex="-1"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
        aria-modal="true"
        role="dialog"
        style={{
          zIndex: '5',
          backgroundColor: '#000000c2',
        }}
      >
        <div
          id="popup-modal"
          tabIndex="-1"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="p-6 text-center">
                <svg
                  ariaHidden="true"
                  className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to remove this show?
                </h3>
                <button
                  dataModalToggle="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => {
                    closeModal(false);
                  }}
                  dataModalToggle="popup-modal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
