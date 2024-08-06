'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, gql } from '@apollo/client';
import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "../../components/Input";
import GroupButton from "../../components/buttonGroup";
import withAuth from '@/app/components/withAuth';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import styles

// GraphQL query to fetch movie details
const GET_MOVIE = gql`
  query GetMovie($id: Int!) {
    getmovie(id: $id) {
      id
      title
      year
      jpgFilePath
    }
  }
`;

function EditMovie() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    // const [imageLink, setImageLink] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [file, setFile] = useState<File | null>(null); // State for the selected file

    // Fetch movie data using GraphQL
    const { loading: queryLoading, error: queryError, data: movieData } = useQuery(GET_MOVIE, {
        variables: { id: parseInt(id as string) },
        skip: !id,
    });

    useEffect(() => {
        if (movieData && movieData.getmovie) {
            setTitle(movieData.getmovie.title);
            setYear(movieData.getmovie.year.toString());
            // setImageLink(movieData.getmovie.jpgFilePath);
            setStartDate(new Date(movieData.getmovie.year, 0, 1));
        }
    }, [movieData]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('year', year);
        if (file) {
            formData.append('file', file); // Append the file if it exists
        }

        try {
            // Make a PUT request to the REST API to update the movie
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/movies/${id}/update`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                alert('Movie updated successfully!');
                window.location.href = '/movielist';
            } else {
                const errorData = await response.json();
                console.error('Error updating movie:', errorData);
                alert(`Failed to update movie: ${errorData.message || response.statusText}`);
            }
        } catch (err) {
            console.error('Error editing movie:', err);
            alert('Failed to update movie. Please try again.');
        }
    };

    // Handle file upload
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile); // Update the state with the selected file
            // setImageLink(selectedFile.name); // Optionally, set the image link to the file name
        }
    };

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
        if (date) {
            setYear(date.getFullYear().toString());
        } else {
            setYear('');
        }
    };

    // Loading and error states for GraphQL query
    if (queryLoading) return <p>Loading...</p>;
    if (queryError) return <p>Error: {queryError.message}</p>;

    return (
        <form onSubmit={handleSubmit} className="min-h-screen m-4 sm:p-12 flex flex-col justify-between">
            <div>
                <h2 className="text-3xl sm:text-5xl font-semibold text-white mb-6">Edit Movie</h2>
                
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-13 pt-0 sm:pt-12">
                    <div
                        className="order-2 sm:order-1 w-full sm:w-[473px] h-[300px] sm:h-[504px] bg-input rounded-2rounded-2xl border-2 border-dashed border-white flex flex-col items-center justify-center cursor-pointer"
                        onClick={() => document.getElementById('fileInput')?.click()} // Trigger file input click
                    >
                        <input
                            type="file"
                            id="fileInput"
                            accept=".jpg,.jpeg,.png,.gif" // Accept common image formats
                            style={{ display: 'none' }}
                            onChange={handleFileChange} // Handle file change
                        />
                        <Icon className="text-white text-2xl ml-2" icon="material-symbols:download" />
                        <h4 className="text-white font-thin">
                            {file ? file.name : "Drop an image here"} {/* Display file name if selected */}
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
                                onChange={(e) => setTitle(e.target.value)} />
                            <DatePicker
                                selected={startDate}
                                onChange={handleDateChange}
                                showYearPicker 
                                dateFormat="yyyy" 
                                className="w-full px-4 py-3 rounded-lg mt-1 text-white bg-input mb-4"
                                placeholderText="Publishing Year"
                            />
                            {/* <Input 
                                label="Image Link" 
                                type="text" 
                                id="link" 
                                className="w-full sm:w-[360px] mb-4" 
                                value={imageLink}
                                onChange={(e) => setImageLink(e.target.value)}
                            /> */}
                        </div>
                        <div className="order-3 sm:order-none">
                            <GroupButton type="submit" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default withAuth(EditMovie);