'use client';

import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "../components/Input";
import GroupButton from "../components/buttonGroup";
import { useState, ChangeEvent, useEffect } from 'react';
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

  const handleCreateMovie = async () => {
    setLoading(true);

    if (!file || !title || !year || userId === null) {
      alert("Please fill in all fields and upload an image.");
      setLoading(false);
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
    } finally {
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
    <div className="sm:mt-12 p-4 sm:px-12 sm:p-6 h-full">
      <h2 className="text-3xl sm:text-5xl my-10 sm:my-0 font-semibold text-white">Create a new movie</h2>

      <div className="grid grid-rows-4 sm:grid-flow-col gap-6 sm:gap-10 pt-0 sm:pt-12">
        {/* File Upload Div (Left) */}
        <div
          className="sm:order-1 order-2 row-span-4 cursor-pointer bg-input rounded-xl border-2 flex flex-col items-center justify-center border-dashed border-white sm:h-[530px] sm:w-[490px]"
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <input
            type="file"
            id="fileInput"
            accept=".jpg,.jpeg"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Icon className="text-white text-2xl" icon="material-symbols:download" />
          <h4 className="text-white font-thin">
            {file ? file.name : "Drop an image here"}
          </h4>
        </div>

        <div className="sm:order-2 order-1 ">
          <Input
            label="Title"
            type="text"
            id="title"
            className="w-full sm:w-[360px] mb-4 sm:mb-0 "
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
            // popperClassName="react-datepicker-popper"
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

export default withAuth(CreateMovie);