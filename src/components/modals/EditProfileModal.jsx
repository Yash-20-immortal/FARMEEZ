import React, { useState, useEffect, useRef } from 'react';
import { User, X, Upload, Trash2, AlertCircle } from 'lucide-react';
import { useGame } from '../GameContext';

export default function EditProfileModal({ isOpen, onClose }) {
  const { profile, updateProfile } = useGame();
  
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setDisplayName(profile?.displayName || 'EcoFarmer');
      setUsername(profile?.username || '@ecofarmer');
      setAvatar(profile?.avatar || null);
      setError('');
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5 MB.');
      return;
    }

    // Check type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Only JPG, PNG, and WEBP are allowed.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatar(event.target.result);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // Validate Username
    // Letters, Numbers, Underscores, 3-20 characters. Wait, usernames usually start with @ in our app, so let's allow @ optionally at the start.
    const usernameRegex = /^@?[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      setError('Username must be 3-20 characters and contain only letters, numbers, and underscores.');
      return;
    }

    if (!displayName.trim()) {
      setError('Display name cannot be empty.');
      return;
    }

    // Ensure username starts with @ for display consistency if they forgot it
    const formattedUsername = username.startsWith('@') ? username : `@${username}`;

    updateProfile({
      displayName: displayName.trim(),
      username: formattedUsername,
      avatar
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-farm-bg w-full max-w-md rounded-[2rem] shadow-2xl p-6 md:p-8 animate-fade-in-up border border-white relative overflow-hidden">
        
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-farm-sky-light rounded-full blur-3xl opacity-60 -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-farm-green-light rounded-full blur-3xl opacity-40 -z-10 -translate-x-1/3 translate-y-1/3"></div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-slate-800">Edit Profile</h2>
          <button onClick={onClose} className="p-2 bg-white/50 hover:bg-white rounded-full text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 text-red-600 rounded-xl mb-6 text-sm font-bold border border-red-200">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-24 h-24 bg-gradient-to-tr from-farm-green to-farm-green-light rounded-full flex items-center justify-center text-white shadow-lg overflow-hidden border-4 border-white transition-transform group-hover:scale-105">
                {avatar ? (
                  <img src={avatar} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} />
                )}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="text-white" size={24} />
              </div>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/jpeg, image/jpg, image/png, image/webp"
              onChange={handleFileChange}
            />

            <div className="flex gap-2">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Upload Image
              </button>
              {avatar && (
                <button 
                  onClick={() => setAvatar(null)}
                  className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1"
                >
                  <Trash2 size={12} /> Remove
                </button>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">Display Name</label>
            <input 
              type="text" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-4 bg-white/60 border border-white rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-farm-green/50 placeholder-slate-400"
              placeholder="e.g. Yashwanth"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 bg-white/60 border border-white rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-farm-green/50 placeholder-slate-400"
              placeholder="e.g. @yash20"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-white/50 text-slate-600 font-bold rounded-xl hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 py-4 bg-farm-green text-white font-bold rounded-xl hover:bg-farm-green-dark shadow-soft hover:-translate-y-1 transition-all"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
