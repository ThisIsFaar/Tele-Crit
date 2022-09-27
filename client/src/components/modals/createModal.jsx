import { createShow } from '../../helper/showApi';
import { isAuthenticated } from '../../helper/authApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createShows } from '../../store/show';
import { useDispatch } from 'react-redux';
import { appCreateModalToggle } from '../../store/app';
const Joi = require('joi');
export default function CreateModal() {
  const dispatch = useDispatch();
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    title: '',
    rating: '',
    review: '',
    streamingApp: '',
    publishMode: '',
  });
  const { title, rating, review, streamingApp, publishMode } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    console.log(values);
  };
  const schema = Joi.object({
    title: Joi.string().required(),
    rating: Joi.number().required(),
    review: Joi.string().required(),
    streamingApp: Joi.string().required(),
    publishMode: Joi.string().required(),
  });

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(values.title);
    const { error } = schema.validate({
      title,
      review,
      rating,
      streamingApp,
      publishMode,
    });
    if (error) {
      errorToast(error.message);
    } else {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      dispatch(
        createShows({
          url: `/tvshow/create/${user._id}`,
          headers,
          data: JSON.stringify(values),
        })
      );
      dispatch({ type: appCreateModalToggle.type });
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
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
              onClick={() => {
                dispatch({ type: appCreateModalToggle.type });
              }}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
                Add Show Details
              </h3>
              <form className="space-y-6" action="#">
                <div>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange('title')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Title?"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="rating"
                    value={rating}
                    onChange={handleChange('rating')}
                    placeholder="Rating out of 10?"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="streamingApp"
                    value={streamingApp}
                    onChange={handleChange('streamingApp')}
                    placeholder="Streaming App?"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="review"
                    value={review}
                    onChange={handleChange('review')}
                    placeholder="Review?"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <select onChange={handleChange('publishMode')}>
                    <option value="">Publish Mode</option>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>

                <button
                  onClick={onSubmit}
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
