import React, { useState, ChangeEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { CiLock } from 'react-icons/ci';

const PasswordInput: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="relative">
      <div
        className="absolute top-1/2 transform -translate-y-1/2 left-6 cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        <CiLock className="text-[#152D4B]" />
      </div>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        className="w-full px-[2.6rem] outline-none py-[.9rem] rounded-[10px] text-[1rem] font-light text-[#152D4B] placeholder-[#152D4B]"
      />
      <div
        className="absolute top-1/2 transform -translate-y-1/2 right-6 cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <FaEyeSlash className="text-[#152D4B]" />
        ) : (
          <FaEye className="text-[#152D4B]" />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
