import { isAuthenticated } from '../../helper/authApi';
import { useDispatch } from 'react-redux';
import { deleteShows } from '../../store/show';
import { appUpdateModalToggle, appUpdateShow } from '../../store/app';

export default function Card({ data, feed }) {
  const dispatch = useDispatch();
  const { _id, userId, title, rating, review, streamingApp, byUsername } = data;

  const { user, token } = isAuthenticated();
  const onDelete = (event) => {
    event.preventDefault();

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    dispatch(
      deleteShows({
        url: `/tvshow/delete/${user._id}`,
        headers,
        data: JSON.stringify(data),
      })
    );
  };

  return (
    <div className="p-4 lg:w-1/3 ">
      <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-8 rounded-lg overflow-hidden text-center relative shadow hover:shadow-2xl transition ease-out duration-300 hover:cursor-pointer">
        <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
          {title}
        </h1>
        <p className="leading-relaxed mb-3 max-h-60 h-60 overflow-auto">
          {review}
        </p>

        <p className="text-indigo-500 inline-flex items-center font-bold">
          <span className="text-gray-400 font-normal">Platform : &nbsp;</span>
          {streamingApp}
        </p>

        <div className="text-center mt-2 leading-none flex justify-center bottom-0 left-0 w-full py-4">
          <span className="text-gray-400 mr-3 inline-flex items-center leading-none pr-3 py-1  border-gray-200">
            <svg
              className="w-4 h-4 mr-1"
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
                fillRule="nonzero"
              />
            </svg>
            <span className="font-bold text-black">{rating}</span>/10 Rating
          </span>
        </div>
        <span class="bg-blue-100 p-8 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
          @{byUsername}
        </span>

        {feed === 'false' && (
          <div className="text-center mt-2 leading-none flex justify-center  bottom-0 left-0 w-full py-4">
            <button
              onClick={() => {
                dispatch({ type: appUpdateShow.type, payload: data });
                dispatch({ type: appUpdateModalToggle.type });
              }}
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Update
            </button>
            <button
              onClick={onDelete}
              type="button"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
