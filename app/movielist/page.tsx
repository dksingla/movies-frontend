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
    return(
        <div className="min-h-screen bg-background p-12 ">
        <div className="flex items-center justify-between mb-8 ">
            <div className="flex items-center">
                <h2 className="text-5xl font-medium text-white">My movies</h2>
                <Icon className="text-white text-3xl ml-4" icon="gg:add" />
            </div>
            <div className="flex items-center">
            <h2 className="text-1xl font-medium text-white">Logout</h2>
            <Icon className="text-white text-2xl ml-2" icon="ic:outline-logout" />

            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {movies.map((movie, index) => (
                <Card key={index} imageSrc={movie.imageSrc} title={movie.title} year={movie.year} />
            ))}
        </div>
        <div className="flex justify-center items-center mt-8">
            <button className="text-white mr-4">Prev</button>
            <div className="flex items-center space-x-2">
                <button className="bg-primary text-white px-4 py-2 rounded">1</button>
                <button className="text-white">2</button>
            </div>
            <button className="text-white ml-4">Next</button>
        </div>
    </div>

    )
}