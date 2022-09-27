import { signup, authenticate, isAuthenticated } from '../helper/authApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { configToastObj } from '../assets/data';
const Joi = require('joi');

export default function AuthSignup({ toggler }) {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    password: '',
    error: '',
    didRedirect: false,
  });

  if (isAuthenticated()) {
    return navigate('/feed');
  }

  const { username, password } = values;

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
      toast.error(error.message, configToastObj);
    } else {
      signup({ username, password })
        .then((data) => {
          if (data.code === 200) {
            toast.success(data.message, configToastObj);
            toggler('signin');
          } else if (data.code === 403 || 401) {
            toast.error(data.message, configToastObj);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <form>
      <p className="mb-4 text-center">Signup for your account</p>
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
          Sign up
        </button>
      </div>
    </form>
  );
}
