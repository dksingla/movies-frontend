'use client';

import { gql, useMutation } from '@apollo/client';
import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "../components/Input";
import GroupButton from "../components/buttonGroup";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import withAuth from '../components/withAuth';
import { useRouter } from 'next/navigation';


// Define the GraphQL mutation
const CREATE_MOVIE = gql`
  mutation CreateMovie($title: String!, $year: Int!, $link: String!, $userId: Int!) {
    createMovie(title: $title, year: $year, link: $link, userId: $userId) {
      title
      year
      jpgFilePath
    }
  }
`;

function CreateMovie() {
    const router = useRouter()
    // State hooks for form fields
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [userId, setUserId] = useState<number | null>(null);

    // Apollo useMutation hook
    const [createMovie, { loading, error }] = useMutation(CREATE_MOVIE);


    useEffect(() => {
        const storedUserId = localStorage.getItem('userID');
        if (storedUserId) {
            setUserId(parseInt(storedUserId));
        }
    }, []);
    console.log(userId)
    

    // Handle form submission
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!link || !title || !year || userId === null) {
            alert("Please fill in all fields. or  userId is not present ");
            return;
        }

        try {
            const { data } = await createMovie({
                variables: {
                    title,
                    year: parseInt(year),
                    link,
                    userId
                }
            });

            console.log('Movie created:', data.createMovie);
            alert('Movie created successfully!');
            router.push('/movielist')
            // Reset form fields
            setLink('');
            setTitle('');
            setYear('');
        } catch (err) {
            console.error('Error creating movie:', err);
            alert('Failed to create movie. Please try again.');
        }
    };
    return (
        <form onSubmit={handleSubmit} className="min-h-screen p-4 sm:p-12 flex flex-col justify-between">
            <div>
                <h2 className="text-3xl sm:text-5xl font-semibold text-white mb-6">Create a new movie</h2>
                
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-13 pt-0 sm:pt-12">
                    <div
                        className="order-2 sm:order-1 w-full sm:w-[473px] h-[300px] sm:h-[504px] bg-input rounded-2xl border-2 border-dashed border-white flex flex-col items-center justify-center cursor-pointer"
                        onClick={() => document.getElementById('fileInput')?.click()}
                    >
                        {/* <input
                            type="file"
                            id="fileInput"
                            accept=".jpg,.jpeg"
                            style={{ display: 'none' }}
                            // onChange={handleFileChange}
                        /> */}
                        <Icon className="text-white text-2xl ml-2" icon="material-symbols:download" />
                        <h4 className="text-white font-thin">
                            {/* {selectedFile ? selectedFile.name : "Drop an image here"} */}
                            Drop an image here
                        </h4>
                    </div>
                    
                    <div className="sm:order-2 flex flex-col gap-6">
                        <div className="order-1 sm:order-none">
                            <Input 
                                label="Title" 
                                type="text" 
                                id="title" 
                                className="w-full sm:w-[360px] mb-4" 
                                value={title}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            />
                            <Input 
                                label="Publishing year" 
                                type="text" 
                                id="year" 
                                className="w-full sm:w-[200px] mb-4" 
                                value={year}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
                            />
                            <Input 
                                label="Image Link" 
                                type="text" 
                                id="link" 
                                className="w-full sm:w-[360px] mb-4" 
                                value={link}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
                            />
                        </div>
                        <div className="order-3 sm:order-none">
                            <GroupButton type="submit"  />
                        </div>
                    </div>
                </div>
            </div>
            {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}
        </form>
    );
}
export default withAuth(CreateMovie)