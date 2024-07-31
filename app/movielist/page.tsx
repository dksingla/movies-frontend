'use client';
import Card from "../components/card";
import { Icon } from '@iconify/react';

const movies = [
    { imageSrc: '/img1.jpg', title: 'Movie 1', year: '2021' },
    { imageSrc: '/img2.jpg', title: 'Movie 1', year: '2021' },
    { imageSrc: '/img1.jpg', title: 'Movie 1', year: '2021' },
    { imageSrc: '/img3.jpg', title: 'Movie 1', year: '2021' },
    { imageSrc: '/img1.jpg', title: 'Movie 1', year: '2021' },
    { imageSrc: '/img1.jpg', title: 'Movie 1', year: '2021' },
    { imageSrc: '/img3.jpg', title: 'Movie 1', year: '2021' },
    { imageSrc: '/img2.jpg', title: 'Movie 1', year: '2021' },

];


export default function MovieList() {
    return (
        <div className="min-h-screen p-4 sm:p-8">
            <div className="flex sm:items-center justify-between pt-4 mb-6 sm:mx-10 sm:mb-10">
                <div className="flex items-center ">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">My movies</h2>
                    <Icon className="text-white text-xl sm:mt-3 sm:text-3xl ml-3 sm:ml-4" icon="gg:add" />
                </div>
                <div className="flex items-center">
                    <h2 className="hidden sm:inline text-sm sm:text-base md:text-xl font-medium text-white sm:mr-4">Logout</h2>
                    <Icon className="text-white text-xl sm:text-2xl" icon="ic:outline-logout" />
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:mx-10">
                {movies.map((movie, index) => (
                    <Card key={index} imageSrc={movie.imageSrc} title={movie.title} year={movie.year} />
                ))}
            </div>
            <div className="flex justify-center items-center mt-6 sm:mt-8">
                <button className="text-white px-4 py-2">Prev</button>
                <div className="flex items-center space-x-2 sm:space-x-3 mx-4">
                    <button className="bg-primary text-white px-4 py-1 rounded text-sm sm:text-base">1</button>
                    <button className="bg-card text-white text-sm px-4 py-1 rounded sm:text-base">2</button>
                </div>
                <button className="text-white px-4 py-2">Next</button>
            </div>
        </div>
    );
}