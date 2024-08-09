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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
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
        <form onSubmit={handleSubmit} className="min-h-screen p-4  sm:p-12 flex flex-col justify-between">
            <div>
                <h2 className="text-3xl sm:text-5xl font-semibold text-white sm:my-0 my-10">Edit Movie</h2>

                <div className="flex flex-col sm:flex-row gap-6 sm:gap-13 pt-0 sm:pt-12">
                    <div
                        className="w-full sm:w-1/2 h-[300px] sm:h-[504px] bg-input rounded-2xl border-2 border-dashed border-white flex flex-col items-center justify-center cursor-pointer relative"
                        onClick={() => document.getElementById('fileInput')?.click()}
                    >
                        <input
                            type="file"
                            id="fileInput"
                            accept=".jpg,.jpeg,.png,.gif"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />

                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="bg-black bg-opacity-50 rounded-full p-3">
                                <Icon
                                    className="text-white text-4xl"
                                    icon="material-symbols:edit-outline"
                                />
                            </div>
                        </div>

                        {imageLink ? (
                            <div className="w-full h-full relative rounded-2xl overflow-hidden">
                                <Image
                                    src={imageLink}
                                    alt={title || "Uploaded image"}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-2xl"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-white font-thin">Drop an image here</p>
                            </div>
                        )}
                    </div>
                    <div>
                        {/* Title and DatePicker Div (Right Top) */}
                        <div className=" flex flex-col sm:-ml-6 ">
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
                                className="w-full sm:w-[220px] px-4 py-3 rounded-lg mt-1 text-white bg-input relative z-10"
                                placeholderText="Publishing Year"
                                popperClassName="react-datepicker-popper"
                                popperPlacement="bottom-start"
                            />
                        </div>
                        <GroupButton type="submit" loading={loading} />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default withAuth(EditMovie);