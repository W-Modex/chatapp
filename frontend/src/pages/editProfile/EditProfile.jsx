import React, { useState } from 'react';
import axios from 'axios'
import Header from '../../components/header/Header';
import { Link, useNavigate } from 'react-router-dom';
import useEditProfile from '../../hooks/useEditProfile';
import convertToBase64 from '../../utils/convertToBase64.js'

function EditProfile() {
    const [inputs, setInputs] = useState({
        displayName: '',
        profilePic: {myFile: ''},
        about: '',
    });
    const [imageSelected, setImageSelected] = useState(false);
    const { editProfile, loading } = useEditProfile();
    const navigate = useNavigate();

    const createImage = async(newImage) => {
        try {
            await axios.post('http://localhost:5000/api/uploads', newImage)
        } catch (error) {
            console.log(error)
        }
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file)
        setInputs({...inputs, profilePic: {...inputs.profilePic, myFile: base64}})
        setImageSelected(true)
  };
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        createImage(inputs.profilePic)
        const success = await editProfile(inputs);
        if (success) {
            navigate('/profile');
        }
    };

    return (
        <div className='bg-[#1C1C21] min-h-screen'>
            <Header />
            <form onSubmit={handleSubmit} className='max-w-[900px] mx-auto p-5 text-white'>
                <h1 className='mx-auto my-5 text-center text-4xl font-bold'>Edit Profile</h1>
                <div className='flex items-center gap-3'>
                    <label className='text-xl'>Update Profile Picture: </label>
                    <label htmlFor="image" className='btn max-w-40 btn-primary'>Update Image</label>
                    <input type="file" accept=".jpeg, .png, .jpg" id="image" onChange={handleFileChange} className="hidden" />
                    {imageSelected && <span className="text-green-500">✅ Uploaded</span>}
                </div>
                <div className='flex flex-col gap-3 my-3'>
                    <label className='text-xl'>Update DisplayName: </label>
                    <input
                        type="text"
                        placeholder='Display Name'
                        className="input input-bordered bg-[#212429] w-full max-w-xs"
                        value={inputs.displayName} onChange={(e) => setInputs({ ...inputs, displayName: e.target.value })} />
                </div>
                <div className='flex flex-col gap-3 my-3'>
                    <label className='text-xl'>Update About Me: </label>
                    <textarea
                        className="textarea text-lg textarea-bordered max-w-[500px] h-[120px] bg-[#212429]" placeholder="Hi My Name is Modex!"
                        value={inputs.about}
                        onChange={(e) => setInputs({ ...inputs, about: e.target.value })}></textarea>
                </div>
                <p className='text-gray-300 my-2'>Note: You can let the fields that you don't want to change as empty</p>
                <div className='flex justify-center gap-6'>
                    <Link to="/profile" className='btn btn-neutral'>Cancel</Link>
                    <button type="submit" className='btn btn-primary'>{loading ? <span className="loading loading-spinner"></span> : "Save Changes"}</button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;
