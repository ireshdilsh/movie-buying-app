import React, { useEffect, useState } from 'react'
import AdminNavbar from '../component/AdminNavbar'
import type { Genre } from '../interfaces/genre';
import axios from 'axios';

export default function AddMovies() {

  const [genre, setgenre] = useState<Genre[] | null>(null);

  // storing db for useStates
  const [selectedGenre, setselectedGenre] = useState('');
  const [name, setname] = useState('');
  const [director, setdirector] = useState('');
  const [description, setdescription] = useState('');
  const [price, setprice] = useState(Number);
  const [file,setFile] = useState<File | null>(null)
  const [imagePriview, setimagePriview] = useState('');

  useEffect(() => {
    const getAllGenre = async () => {
      const resp = await axios.get('http://localhost:5000/api/genres/get/genres');
      setgenre(resp.data.genres);
    }
    getAllGenre()
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setimagePriview(reader.result as string);
      }
      reader.readAsDataURL(file);
    }
  }

  const saveMovie = async () => {
    if(!file){
      alert("Please select a banner image for the movie.");
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('director', director);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('genre', selectedGenre);
    formData.append('image', file);
    try {
      const resp = await axios.post('http://localhost:5000/api/movies/post/new/movie', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(resp.data);
      clearFields();
      alert("Movie added successfully!");
    } catch (error) {
      console.log("Error adding movie:", error);
      clearFields();
      alert("Failed to add movie. Please try again.");
    }
  }

  const clearFields = () => {
    setname('');
    setdirector('');
    setdescription('');
    setprice(0);
    setselectedGenre('');
    setFile(null);
    setimagePriview('');
  }

  return (
    <div className='flex flex-col px-4 sm:px-6'>
      {/* admin navbar */}
      <AdminNavbar />
      <div className="flex justify-center items-center flex-col mt-20 sm:mt-32 lg:mt-40">

        <p className="flex justify-center items-center gap-2 text-sm sm:text-sm text-gray-600 font-medium border border-neutral-200 px-3 py-1 rounded-3xl text-center">
          <div className='bg-amber-500 rounded-full h-2.5 w-2.5'></div>
          Upload & Manage Movie Details
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-2 font-medium text-center tracking-tight">
          Add New Movies
        </h1>

        <p className="text-gray-600 text-center w-full sm:w-[420px] md:w-[560px] lg:w-[560px] text-sm sm:text-base">
          Add new movies to the MAG platform by entering film details, showtimes, and media—making them instantly available to users.
        </p>
      </div>

      {/* add movie form */}
      <div className='w-full flex justify-center items-center flex-col mt-10'>

        <div className='flex justify-center items-center gap-5'>
          <div className='flex flex-col justify-start items-start'>
            <p className='text-gray-800 font-medium text-sm'>Movie Name</p>
            <input value={name} onChange={(e)=>{setname(e.target.value)}} type="text" className='h-11 mt-1 w-100 border px-4 border-neutral-200 rounded-sm' />
          </div>
          <div className='flex flex-col justify-start items-start'>
            <p className='text-gray-800 font-medium text-sm'>Director</p>
            <input type="text" value={director} onChange={(e)=>{setdirector(e.target.value)}} className='h-11 mt-1 w-100 border px-4 border-neutral-200 rounded-sm' />
          </div>
        </div>

        <div className='flex flex-col items-start justify-start'>
          <p className='text-gray-800 font-medium text-sm mt-4'>Description</p>
          <textarea value={description} onChange={(e)=>{setdescription(e.target.value)}} name="" id="" className='w-205 h-40 border px-4 py-2 border-neutral-200 rounded-sm mt-1'></textarea>
        </div>

        <div className='flex justify-center items-center gap-5 mt-5'>
          <div className='flex flex-col justify-start items-start'>
            <p className='text-gray-800 font-medium text-sm'>Price</p>
            <input value={price} onChange={(e)=>{setprice(Number(e.target.value))}} type="text" className='h-11 mt-1 w-100 border px-4 border-neutral-200 rounded-sm' />
          </div>
          <div className='flex flex-col justify-start items-start'>
            <p className='text-gray-800 font-medium text-sm'>Genre</p>
            <select onChange={(e)=>{setselectedGenre(e.target.value)}} value={selectedGenre} name="" id="" className='w-100 h-11 mt-1 border border-neutral-200 rounded-sm px-4'>
              <option value="">Select Genre</option>
              {genre && genre.map(gen => (
                <option value={gen.id} key={gen.id}>{gen.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='flex flex-col justify-start items-start mt-5'>
          <p className='text-sm text-gray-800 font-medium'>Movie Banner</p>
          <div className='w-205 flex gap-5'>
          <input onChange={handleImageChange} type="file" className='mt-2 cursor-pointer w-100' />
          <img src={imagePriview} alt="preview image"  className='p-5 border border-neutral-200 rounded-sm w-100'/>
          </div>
        </div>

        <div className='flex justify-end items-end w-205 my-5'>
          <button onClick={saveMovie} className='cursor-pointer bg-amber-500 py-2 px-4 rounded-sm font-medium hover:opacity-80'>Published Movie</button>
        </div>
      </div>
    </div>
  )
}
