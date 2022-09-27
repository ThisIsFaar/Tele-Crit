import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/card/card';
import Spinner from '../components/spinner/spinners';
import { isAuthenticated } from '../helper/authApi';
import { fetchAllShows, fetchShows } from '../store/show';
const Feed = () => {
  const dispatch = useDispatch();
  const { user, token } = isAuthenticated();
  const spinner = useSelector((store) => store.entities.show.loading);

  const head = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    dispatch(
      fetchAllShows({ url: `/tvshow/readAll/${user._id}`, headers: head })
    );
  }, []);

  const data = useSelector((store) => store.entities.show.list);
  const shows = data.filter((s) => s.publishMode === 'Public');
  console.log(data);
  console.log(shows);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-14 mx-auto  h-full">
        <div className="flex flex-wrap -m-4 justify-center  ">
          {shows !== undefined && shows.length > 0 && spinner === false ? (
            shows.map((show) => {
              return <Card key={show.id} data={show} feed="true" />;
            })
          ) : !spinner ? (
            <span
              className="flex justify-center items-center "
              style={{ height: '75vh' }}
            >
              No Public Shows , Be the first one to add!
            </span>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </section>
  );
};

export default Feed;
