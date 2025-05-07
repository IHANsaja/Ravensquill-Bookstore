import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import defaultAvatar from '../assets/default-avatar.png';
import { FiUser, FiMail, FiUpload, FiLogOut } from 'react-icons/fi';
import { toast } from 'sonner';

const User = () => {
  const { backendUrl, userData, setUserData } = useContext(AppContent);
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [preview, setPreview] = useState(userData.profileImage);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // When the user selects a new file
  const handleImageChange = e => {
    const f = e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
    setFile(f);
    toast.success('Avatar preview updated');
  };

  // If the <img> fails to load (e.g. bad URL), fall back
  const handleImageError = () => {
    setPreview('');
    toast.error('Image failed to load, using default avatar');
  };

  // Send FormData to backend
  const handleSave = async () => {
    const fd = new FormData();
    fd.append('username', username);
    fd.append('email', email);
    if (file) fd.append('profileImage', file);

    try {
      const res = await fetch(
        `${backendUrl}/api/user/update`,
        {
          method: 'PUT',
          credentials: 'include',
          body: fd
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Update failed');
      setUserData(data.user);
      toast.success('Profile updated');
      navigate('/profile'); 
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'An error occurred');
    }
  };

  // Clear context and go to login
  const handleLogout = () => {
    setUserData(null);
    toast.success('Logged out');
    navigate('/');
  };

  // Compute img src: if preview is a server path, prefix backendUrl; else if blob or empty, handle
  const imgSrc = preview
    ? preview.startsWith('/uploads')
      ? `${backendUrl}${preview}`
      : preview
    : defaultAvatar;

  return (
    <section className="min-h-full bg-primary-black text-primary-white font-poppins pt-30 pb-30 px-6">
      <div className="max-w-xl mx-auto bg-secondary-darkgray p-8 rounded-lg shadow-2xl border border-secondary-regulargray">
        <h1 className="text-3xl font-bold text-secondary-blue mb-6 text-center flex items-center justify-center gap-2">
          <FiUser className="text-secondary-lightblue text-4xl" />
          Wizard Profile
        </h1>

        <div className="flex flex-col items-center mb-6">
          <img
            src={imgSrc}
            onError={handleImageError}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-secondary-blue mb-4 shadow-md"
          />
          <label className="cursor-pointer text-secondary-lightblue hover:underline flex items-center gap-2">
            <FiUpload />
            Change Avatar
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-secondary-lightblue mb-1 flex items-center gap-2">
              <FiUser /> Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-primary-black text-white border border-secondary-regulargray focus:outline-none focus:ring-2 focus:ring-secondary-blue"
            />
          </div>

          <div>
            <label className="block text-secondary-lightblue mb-1 flex items-center gap-2">
              <FiMail /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-primary-black text-white border border-secondary-regulargray focus:outline-none focus:ring-2 focus:ring-secondary-blue"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handleSave}
            className="bg-secondary-blue text-primary-white px-5 py-2 rounded-md hover:bg-secondary-lightblue transition duration-300"
          >
            Save Changes
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-primary-white px-5 py-2 rounded-md hover:bg-red-500 transition duration-300 flex items-center gap-2"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default User;
