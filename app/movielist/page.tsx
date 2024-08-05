'use client';

import { gql, useQuery } from '@apollo/client';
import Card from "../components/card";
import Pagination from '../components/pagination';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import withAuth from '../components/withAuth';

const GET_MOVIES = gql`
  query GetMovies($page: Int!) {
    getmovies(page: $page) {
      movies {
        id
        title
        year
        jpgFilePath
      }
      total
      totalPages
    }
  }
`;

 function MovieList() {
    const [page, setPage] = useState(1);
    const { data, loading, error } = useQuery(GET_MOVIES, {
        variables: { page },
    });
    const router = useRouter();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { movies, totalPages } = data.getmovies;
    console.log(movies);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };
    const gotToCreate = () => {
        router.push('/createmovie');
    };
    const handleLogout = () => {
        Cookies.remove('token'); 
        Cookies.remove('token'); 
       
        Cookies.remove('token');
       
        localStorage.removeItem('userID');
        router.push('/');
    };

    // Base URL for the backend where images are served
    const IMG_URL = `${process.env.NEXT_PUBLIC_BACKEND_LINK}/image/`;


    return (
        <div className="min-h-screen p-4 sm:p-8">
            <div className="flex sm:items-center justify-between pt-4 mb-6 sm:mx-10 sm:mb-10">
                <div className="flex items-center ">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">My movies</h2>
                    <Icon className="text-white text-xl cursor-pointer sm:mt-3 sm:text-3xl ml-3 sm:ml-4" icon="gg:add" onClick={gotToCreate} />
                </div>
                <div className="flex items-center">
                    <h2 className="hidden sm:inline text-sm sm:text-base md:text-xl font-medium text-white sm:mr-4">Logout</h2>
                    <Icon className="text-white text-xl sm:text-2xl" icon="ic:outline-logout" onClick={handleLogout} />
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 sm:mx-10">
                {movies.map((movie: { jpgFilePath: string; title: string; year: number; id: number }) =>{

                 return (
                    <Card
                        id={movie.id}
                        key={movie.id}
                        imageSrc={`${IMG_URL}${movie.jpgFilePath}`} // Construct full URL here
                        title={movie.title}
                        year={movie.year.toString()}
                    />
                )})}
            </div>
            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default withAuth(MovieList);