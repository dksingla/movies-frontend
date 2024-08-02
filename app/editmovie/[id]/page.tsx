'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, gql } from '@apollo/client';
import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "../../components/Input";
import GroupButton from "../../components/buttonGroup";
import withAuth from '@/app/components/withAuth';

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

const EDIT_MOVIE = gql`
  mutation EditMovie($id: Int!, $title: String, $year: Int, $link: String) {
    editMovie(id: $id, title: $title, year: $year, link: $link) {
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
    const [imageLink, setImageLink] = useState('');

    const { loading: queryLoading, error: queryError, data: movieData } = useQuery(GET_MOVIE, {
        variables: { id: parseInt(id as string) },
        skip: !id,
    });

    const [editMovie, { loading: mutationLoading, error: mutationError }] = useMutation(EDIT_MOVIE);
    useEffect(() => {
        if (movieData && movieData.getmovie) {
            setTitle(movieData.getmovie.title);
            setYear(movieData.getmovie.year.toString());
            setImageLink(movieData.getmovie.jpgFilePath);
        }
    }, [movieData]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await editMovie({
                variables: {
                    id: parseInt(id as string),
                    title,
                    year: parseInt(year),
                    link: imageLink
                }
            });
            router.push('/movielist');
        } catch (err) {
            console.error('Error editing movie:', err);
        }
    };

    if (queryLoading) return <p>Loading...</p>;
    if (queryError) return <p>Error: {queryError.message}</p>;

    return (
        <form onSubmit={handleSubmit} className="min-h-screen m-4 sm:p-12 flex flex-col justify-between">
            <div>
                <h2 className="text-3xl sm:text-5xl font-semibold text-white mb-6">Edit</h2>
                
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
                                onChange={(e) => setTitle(e.target.value)} />
                            <Input 
                                label="Publishing year" 
                                type="text" 
                                id="year" 
                                className="w-full sm:w-[200px] mb-4" 
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                            <Input 
                                label="Image Link" 
                                type="text" 
                                id="link" 
                                className="w-full sm:w-[360px] mb-4" 
                                value={imageLink}
                                onChange={(e) => setImageLink(e.target.value)}
                            />
                        </div>
                        <div className="order-3 sm:order-none">
                            <GroupButton type="submit"  />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
export default withAuth(EditMovie)