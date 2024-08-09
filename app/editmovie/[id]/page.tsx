'use client';
import { useState, ChangeEvent, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, gql } from '@apollo/client';
import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "../../components/Input";
import GroupButton from "../../components/buttonGroup";
import withAuth from '@/app/components/withAuth';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import styles
import Image from "next/image";


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
    const id = params.id as string;

    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [file, setFile] = useState<File | null>(null); // State for the selected file
    const [loading, setLoading] = useState(false);


    // Fetch movie data using GraphQL
    const { loading: queryLoading, error: queryError, data: movieData } = useQuery(GET_MOVIE, {
        variables: { id: parseInt(id as string) },
        skip: !id,
    });

    useEffect(() => {
        if (movieData && movieData.getmovie) {
            setTitle(movieData.getmovie.title);
            setYear(movieData.getmovie.year.toString());
            setStartDate(new Date(movieData.getmovie.year, 0, 1));
            setImageLink(movieData.getmovie.jpgFilePath)
        }
    }, [movieData]);

    const handleCreateMovie = async () => {
        setLoading(true)

        const formData = new FormData();
        formData.append('title', title);
        formData.append('year', year);
        if (file) {
            formData.append('file', file);
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/movies/${id}/update`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                window.location.href = '/movielist';
            } else {
                const errorData = await response.json();
                console.error('Error updating movie:', errorData);
                alert(`Failed to update movie: ${errorData.message || response.statusText}`);
            }
        } catch (err) {
            console.error('Error editing movie:', err);
            alert('Failed to update movie. Please try again.');
        } finally {
            setLoading(false)
        }
    };

    // Handle file upload
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
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
        <div className="sm:mt-12 p-4 sm:px-12 sm:p-6 h-full">
            <h2 className="text-3xl sm:text-5xl my-10 sm:my-0 font-semibold text-white">Edit Movie</h2>

            <div className="grid grid-rows-4 sm:grid-flow-col gap-6 sm:gap-10 pt-0 sm:pt-12">
                {/* File Upload Div (Left) */}
                <div
                     className="sm:order-1 order-2 row-span-4 cursor-pointer bg-input rounded-xl border-2 flex flex-col items-center justify-center border-dashed border-white sm:h-[530px] sm:w-[490px]"
                     onClick={() => document.getElementById('fileInput')?.click()}
                >
                    <input
                        type="file"
                        id="fileInput"
                        accept=".jpg,.jpeg,.png,.gif"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />

                    {imageLink ? (
                        <div className="w-full h-full relative rounded-2xl overflow-hidden">
                            <Image
                                src={imageLink}
                                alt={title || "Uploaded image"}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-2xl"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black bg-opacity-50 rounded-full p-3">
                                    <Icon
                                        className="text-white text-4xl"
                                        icon="material-symbols:edit-outline"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-white font-thin">Drop an image here</p>
                        </div>
                    )}
                </div>

                {/* Title and DatePicker Div (Right Top) */}
                <div className="sm:order-2 order-1">
                    <Input
                        label="Title"
                        type="text"
                        id="title"
                        className="w-full sm:w-[360px] mb-4"
                        value={title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        showYearPicker
                        dateFormat="yyyy"
                        className="w-full sm:w-[220px] px-4 py-3 rounded-lg mt-1 mb-4 sm:mb-8 text-white bg-input relative"
                        placeholderText="Publishing Year"
                        popperPlacement="bottom-start"
                    />
                </div>
                <div className="order-3">
                        <GroupButton onClick={handleCreateMovie} loading={loading} />
                    </div>
            </div>
        </div>
    );
}

export default withAuth(EditMovie);