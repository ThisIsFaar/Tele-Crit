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
    console.log(values);
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
      console.log(username + ' ' + password);
      signin({ username, password })
        .then((data) => {
          console.log(data);
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
        <div className="text-center">
          <img
            className="mx-auto w-48"
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
            alt="logo"
          />
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
