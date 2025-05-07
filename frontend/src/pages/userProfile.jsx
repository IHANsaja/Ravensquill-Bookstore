import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import defaultAvatar from '../assets/default-avatar.png';
import { FiUser, FiMail, FiEdit } from 'react-icons/fi';

const UserProfile = () => {
  const { backendUrl, userData } = useContext(AppContent);
  const navigate = useNavigate();

  // Compute image src
  const imgSrc = userData?.profileImage
    ? userData.profileImage.startsWith('/uploads')
      ? `${backendUrl}${userData.profileImage}`
      : userData.profileImage
    : defaultAvatar;

  return (
    <section className="min-h-full bg-primary-black text-primary-white font-poppins pt-30 pb-30 px-6">
      <div className="max-w-xl mx-auto bg-secondary-darkgray p-8 rounded-lg shadow-2xl border border-secondary-regulargray">
        <h1 className="text-3xl font-bold text-secondary-blue mb-6 text-center flex items-center justify-center gap-2">
          <FiUser className="text-secondary-lightblue text-4xl" />
          View Profile
        </h1>

        <div className="flex flex-col items-center mb-6">
          <img
            src={imgSrc}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-secondary-blue mb-4 shadow-md"
            onError={(e) => (e.target.src = defaultAvatar)}
          />
        </div>

        <div className="space-y-6 text-lg w-full mb-6">
          <div className="w-full flex items-center justify-center gap-2">
            <FiUser className="text-secondary-lightblue" />
            <span className="text-secondary-lightblue">Username:</span>
            <span>{userData?.username || 'N/A'}</span>
          </div>

          <div className="w-full flex items-center justify-center gap-2">
            <FiMail className="text-secondary-lightblue" />
            <span className="text-secondary-lightblue">Email:</span>
            <span>{userData?.email || 'N/A'}</span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/user')}
            className="bg-secondary-blue text-primary-white px-5 py-2 rounded-md hover:bg-secondary-lightblue transition duration-300 flex items-center gap-2"
          >
            <FiEdit />
            Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
