import React, { useState } from 'react';
import { updateUserprofile } from '../utils/db'; // Assuming you have a function to update user profile in utils/db
import { useLocation } from 'wouter';

function ProfileUpdate() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    // const [profilePicUrl, setProfilePicUrl] = useState('');
    const [info, setInfo] = useState('');
    const [location, setLocation] = useLocation();

    const handleProfileUpdate = async () => {
        // Implement profile update logic here
        if (newPassword != newPassword2) {
            setInfo("password do not match")
            return
        }
        const [state, info] = await updateUserprofile({
            newPassword
            // profilePic: profilePicUrl
        });
        if (state) {
            setInfo("Profile updated successfully");
        } else {
            setInfo(info);
        }
    };

    return (
        <div className="flex flex-col max-w-[60%] items-center mx-auto my-[20%] gap-4 [&>*]:px-4 [&>input]:text-xl">
            <h2 className='text-white font-bold underline mb-2 text-3xl'>Update Profile</h2>
            <h2 className='font-bold text-white' >Update Password</h2>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
            />
            <input
                type="password"
                value={newPassword2}
                onChange={(e) => setNewPassword2(e.target.value)}
                placeholder="Confirm new password"
            />
            <h2 className='font-bold text-white' >Update Profile Picture</h2>
            {/* <input
                type="text"
                value={profilePicUrl}
                onChange={(e) => setProfilePicUrl(e.target.value)}
                placeholder="Profile Picture URL"
            /> */}
            <button onClick={handleProfileUpdate}
                className='bg-green-200 font-bold rounded-md text-black text-xl' >Update Profile</button>
            <div className='text-red-500'>{info}</div>
        </div>
    );
}

export default ProfileUpdate;
