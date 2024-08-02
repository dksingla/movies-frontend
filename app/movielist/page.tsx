'use client';

import { gql, useQuery } from '@apollo/client';
import Card from "../components/card";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


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

export default function MovieList() {
    const [page, setPage] = useState(1);
    const { data, loading, error } = useQuery(GET_MOVIES, {
        variables: { page },
    });
    const router = useRouter();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { movies, totalPages } = data.getmovies;
    console.log(movies)

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };
    const gotToCreate = () => {
        router.push('/createmovie')
    }

    return (
        <div className="min-h-screen p-4 sm:p-8">
            <div className="flex sm:items-center justify-between pt-4 mb-6 sm:mx-10 sm:mb-10">
                <div className="flex items-center ">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">My movies</h2>
                    <Icon className="text-white text-xl cursor-pointer sm:mt-3 sm:text-3xl ml-3 sm:ml-4" icon="gg:add" onClick={gotToCreate}/>
                </div>
                <div className="flex items-center">
                    <h2 className="hidden sm:inline text-sm sm:text-base md:text-xl font-medium text-white sm:mr-4">Logout</h2>
                    <Icon className="text-white text-xl sm:text-2xl" icon="ic:outline-logout" />
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:mx-10">
                {movies.map((movie: { jpgFilePath: string; title: string; year: number ; id:number }) => (
                    <Card id={movie.id} key={movie.id} imageSrc={movie.jpgFilePath} title={movie.title} year={movie.year.toString()} />
                ))}
            </div>
            <div className="flex justify-center items-center mt-6 sm:mt-8">
                <button
                    className="text-white px-4 py-2"
                    onClick={handlePrevPage}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <div className="flex items-center space-x-2 sm:space-x-3 mx-4">
                    {(() => {
                        const pageButtons = [];
                        const pageRange = 2; // Show 2 pages before and after the current page

                        for (let i = Math.max(1, page - pageRange); i <= Math.min(totalPages, page + pageRange); i++) {
                            pageButtons.push(
                                <button
                                    key={i}
                                    className={`text-white px-4 py-1 rounded text-sm sm:text-base ${page === i ? 'bg-primary' : 'bg-card'
                                        }`}
                                    onClick={() => setPage(i)}
                                >
                                    {i}
                                </button>
                            );
                        }

                        return pageButtons;
                    })()}
                </div>
                <button
                    className="text-white px-4 py-2"
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}