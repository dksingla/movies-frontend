'use client';

import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "../components/Input";
import GroupButton from "../components/buttonGroup";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import withAuth from '../components/withAuth';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreateMovie() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userID');
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!file || !title || !year || userId === null) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    formData.append('userId', userId.toString());
    formData.append('file', file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/movies/create`, { 
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Movie created successfully! ');
        window.location.href = '/movielist';

        // Reset form fields
        setFile(null);
        setTitle('');
        setYear('');
        setStartDate(null);
      } else {
        const errorData = await response.json(); 
        console.error('Error creating movie:', response.status, response.statusText, errorData);
        alert(`Failed to create movie. Please try again. ${errorData.message || ''}`);
      }
    } catch (err) {
      console.error('Error creating movie:', err);
      alert('Failed to create movie. Please try again.');
    }finally {
      setLoading(false); 
    }
  };
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

    return (
        <form onSubmit={handleSubmit} className="min-h-screen p-4 sm:p-12 flex flex-col justify-between">
            <div>
                <h2 className="text-3xl sm:text-5xl font-semibold text-white mb-6">Create a new movie</h2>
                
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-13 pt-0 sm:pt-12">
                    <div
                        className="order-2 sm:order-1 w-full sm:w-[473px] h-[300px] sm:h-[504px] bg-input rounded-2xl border-2 border-dashed border-white flex flex-col items-center justify-center cursor-pointer"
                        onClick={() => document.getElementById('fileInput')?.click()} // Trigger file input click
                    >
                        <input
                            type="file"
                            id="fileInput"
                            accept=".jpg,.jpeg"
                            style={{display: "none"}}
                            onChange={handleFileChange} // Handle file change
                            />
                            <Icon className="text-white text-2xl" icon="material-symbols:download" />
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
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                                />
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleDateChange}
                                    showYearPicker 
                                    dateFormat="yyyy" 
                                    className="w-full px-4 py-3 rounded-lg mt-1 text-white bg-input mb-4"
                                    placeholderText="Publishing Year"
                                />
                            </div>
                            <div className="order-3 sm:order-none">
                                <GroupButton type="submit" loading={loading}/> {/* Button to submit the form */}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
    
    export default withAuth(CreateMovie);