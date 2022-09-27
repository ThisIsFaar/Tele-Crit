import { useState } from 'react';
import AuthSignin from './authSignin';
import AuthSignup from './authSignup';

export default function Auth() {
  const [authForm, setauthForm] = useState('signin');
  const formToggler = (val) => {
    setauthForm(val);
  };
  return (
    <section className="h-full gradient-form md:h-screen flex items-center justify-center">
      <div className="md:p-12 md:mx-6 w-2/5">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '3rem',
          }}
        >
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            onClick={() => {
              formToggler('signin');
            }}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              SignIn Form
            </span>
          </button>
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            onClick={() => {
              formToggler('signup');
            }}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              SignUp Form
            </span>
          </button>
        </div>
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
        {authForm === 'signin' ? (
          <AuthSignin />
        ) : (
          <AuthSignup toggler={formToggler} />
        )}
      </div>
    </section>
  );
}
