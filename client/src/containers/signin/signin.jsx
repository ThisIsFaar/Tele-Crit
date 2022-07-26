import { signin, authenticate, isAuthenticated } from '../../helper/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
const Joi = require('joi');

export default function Signin() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    password: '',
    error: '',
    didRedirect: false,
  });

  const { username, password, error, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const onSubmit = (event) => {
    event.preventDefault();

    const { error } = schema.validate({ username, password });
    if (error) {
      errorToast(error.message);
    } else {
      signin({ username, password })
        .then((data) => {
          if (data.code === 200) {
            authenticate(data, () => {
              setValues({
                ...values,
                didRedirect: true,
              });
            });
          } else if (data.code === 403 || 401) {
            errorToast(data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      return navigate('/home');
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
    <section className="h-full gradient-form md:h-screen flex items-center justify-center">
      <div className="md:p-12 md:mx-6 w-2/5">
        <div className="flex justify-center flex-col content-center items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="white"
            className="w-20 h-20 text-white p-2 bg-indigo-500 rounded-full"
          >
            <path d="M13 2.004c5.046.504 9 4.783 9 9.97 0 1.467-.324 2.856-.892 4.113l1.738 1.005c.732-1.553 1.154-3.284 1.154-5.117 0-6.304-4.842-11.464-11-11.975v2.004zm-10.109 14.083c-.568-1.257-.891-2.646-.891-4.112 0-5.188 3.954-9.466 9-9.97v-2.005c-6.158.511-11 5.671-11 11.975 0 1.833.421 3.563 1.153 5.118l1.738-1.006zm17.213 1.734c-1.817 2.523-4.769 4.174-8.104 4.174s-6.288-1.651-8.105-4.175l-1.746 1.01c2.167 3.123 5.768 5.17 9.851 5.17 4.082 0 7.683-2.047 9.851-5.168l-1.747-1.011zm-8.104-13.863c-4.419 0-8 3.589-8 8.017s3.581 8.017 8 8.017 8-3.589 8-8.017-3.581-8.017-8-8.017zm-2 11.023v-6.013l6 3.152-6 2.861z" />
          </svg>
          <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
            We are Telecast-Critics
          </h4>
        </div>
        <form>
          <p className="mb-4 text-center">Signin to your account</p>
          <div className="mb-4">
            <input
              onChange={handleChange('username')}
              value={username}
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput1"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <input
              onChange={handleChange('password')}
              value={password}
              type="password"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput1"
              placeholder="Password"
            />
          </div>
          <div className="text-center pt-1 mb-12 pb-1">
            <button
              onClick={onSubmit}
              type="button"
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  font-medium rounded-lg text-sm py-2.5 text-center w-2/4"
            >
              Sign in
              {performRedirect()}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
