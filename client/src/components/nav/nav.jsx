import { Link } from 'react-router-dom';
import { isAuthenticated, Signout } from '../../helper/authApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appCreateModalToggle } from '../../store/app';
export default function Nav() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto p-4 flex flex-wrap flex-col md:flex-row items-center justify-between">
        <Link
          to="/feed"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="white"
            className="w-12 h-12 text-white p-2 bg-indigo-500 rounded-full"
          >
            <path d="M13 2.004c5.046.504 9 4.783 9 9.97 0 1.467-.324 2.856-.892 4.113l1.738 1.005c.732-1.553 1.154-3.284 1.154-5.117 0-6.304-4.842-11.464-11-11.975v2.004zm-10.109 14.083c-.568-1.257-.891-2.646-.891-4.112 0-5.188 3.954-9.466 9-9.97v-2.005c-6.158.511-11 5.671-11 11.975 0 1.833.421 3.563 1.153 5.118l1.738-1.006zm17.213 1.734c-1.817 2.523-4.769 4.174-8.104 4.174s-6.288-1.651-8.105-4.175l-1.746 1.01c2.167 3.123 5.768 5.17 9.851 5.17 4.082 0 7.683-2.047 9.851-5.168l-1.747-1.011zm-8.104-13.863c-4.419 0-8 3.589-8 8.017s3.581 8.017 8 8.017 8-3.589 8-8.017-3.581-8.017-8-8.017zm-2 11.023v-6.013l6 3.152-6 2.861z" />
          </svg>
          <span className="ml-1 text-xl">Tele-Crit</span>
        </Link>
        {isAuthenticated() && (
          <div className="flex flex-col items-center  mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm  md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <Link
              to="/feed"
              className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              <span className="ml-1 text-xl">Feed</span>
            </Link>
            <Link
              to="/owns"
              className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              <span className="ml-1 text-xl">Owns</span>
            </Link>
            {addReviewButton(dispatch)}
            {logOutButton(navigate)}
          </div>
        )}
      </div>
    </header>
  );
}

const logOutButton = (navigate) => {
  return (
    <button
      onClick={() => {
        Signout();
        navigate('/');
      }}
      className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 flex justify-center items-center"
    >
      <span className="mr-2">Logout</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="white"
      >
        <path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-2 10v-.083c-1.178.685-2.542 1.083-4 1.083-4.411 0-8-3.589-8-8s3.589-8 8-8c1.458 0 2.822.398 4 1.083v-2.245c-1.226-.536-2.577-.838-4-.838-5.522 0-10 4.477-10 10s4.478 10 10 10c1.423 0 2.774-.302 4-.838v-2.162z" />
      </svg>
    </button>
  );
};

const addReviewButton = (dispatch) => {
  return (
    <button
      className=" block text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center color-white"
      type="button"
      data-modal-toggle="authentication-modal"
      onClick={() => {
        dispatch({ type: appCreateModalToggle.type });
      }}
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
      <span className="ml-2">Add Review</span>
    </button>
  );
};
