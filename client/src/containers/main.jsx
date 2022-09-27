import Card from '../components/card/card';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '../helper/authApi';
import Spinner from '../components/spinner/spinners';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShows } from '../store/show';

export default function Main() {
  const dispatch = useDispatch();
  const { user, token } = isAuthenticated();
  const spinner = useSelector((store) => store.entities.show.loading);

  const head = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    dispatch(fetchShows({ url: `/tvshow/read/${user._id}`, headers: head }));
  }, []);
  const shows = useSelector((store) => store.entities.show.list);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-14 mx-auto  h-full">
        <div className="flex flex-wrap -m-4 justify-center  ">
          {shows !== undefined && shows.length > 0 && spinner === false ? (
            shows.map((show) => {
              return <Card key={show.id} data={show} feed='false' />;
            })
          ) : !spinner ? (
            <span
              className="flex justify-center items-center "
              style={{ height: '75vh' }}
            >
              You have not added any tvshows yet, Add One!
            </span>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </section>
  );
}
