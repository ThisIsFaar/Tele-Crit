export default function Card() {
  return (
    <div className="p-4 lg:w-1/3 ">
      <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-8 rounded-lg overflow-hidden text-center relative shadow hover:shadow-2xl transition ease-out duration-300 hover:cursor-pointer">
        <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
          Peaky Blinders
        </h1>
        <p className="leading-relaxed mb-3">
          Birmingham, England, 1919. In the aftermath of WW1, the Shelby family
          are making a name for themselves as bookmakers, racketeers and
          gangsters.
        </p>
        <a className="text-indigo-500 inline-flex items-center font-bold">
          <span className="text-gray-400 font-normal">Platform : &nbsp;</span>
          Netlflix
        </a>
        <div className="text-center mt-2 leading-none flex justify-center bottom-0 left-0 w-full py-4">
          <span className="text-gray-400 mr-3 inline-flex items-center leading-none pr-3 py-1  border-gray-200">
            <svg
              className="w-4 h-4 mr-1"
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
                fill-rule="nonzero"
              />
            </svg>
            <span className="font-bold text-black">9</span>/10 Rating
          </span>
        </div>

        <div className="text-center mt-2 leading-none flex justify-center  bottom-0 left-0 w-full py-4">
          <button
            type="button"
            class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Update
          </button>
          <button
            type="button"
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
