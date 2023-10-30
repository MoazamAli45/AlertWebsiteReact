import React, { useState, useEffect } from 'react';
import Logo1 from '/logo1.png';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { Avatar } from '@mui/material';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import SignupIcon from '@/assets/icons/SignupIcon';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpenMenu(!isOpen);
  };

  //  For outside

  const handleSignOut = () => {
    localStorage.removeItem('User');
    setIsLogin(false);
    toggleMenu();
    setProfile(null);
    window.location.reload();
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User') || 'null');
    // console.log(user);
    if (user) {
      setIsLogin(true);
      setProfile(user);
    }
  }, []);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <nav className="flex  justify-between  py-[2rem] items-center ">
        {/*  Logo  */}
        <div>
          <img src={Logo1} alt="logo" />
        </div>
        {/*    Content */}
        <div className="hidden lg:flex  gap-[5rem] items-center">
          <ul className="flex gap-[4rem] list-none items-center">
            <li>Features</li>
            <li>Pricing</li>
            <li>About </li>
            <li>Data </li>
          </ul>
          {/*     Buttons */}
          {!isLogin && (
            <div className="flex gap-[.7rem]">
              <button
                className="btn-signup px-[2rem] py-[.7rem]"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>

              <button
                onClick={() => navigate('/login')}
                className="btn-login flex items-center gap-[.7rem] px-[2rem] py-[.7rem] rounded-full"
              >
                <SignupIcon />
                Sign In
              </button>
            </div>
          )}
          {isLogin && (
            <div>
              <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
                <Avatar alt={profile?.name} src={profile?.picture} />
              </button>

              {isOpenMenu && (
                <div className="origin-top-right absolute right-[1.3rem] mt-2 w-55 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div
                      className="px-6 py-2 cursor-pointer flex items-center hover:bg-gray-200 "
                      role="menuitem"
                    >
                      <span className="text-[#001A23]">
                        Sign In as {profile?.name}
                      </span>
                    </div>
                    {/* Add more menu items as needed */}
                  </div>

                  <div
                    className="py-1 "
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div
                      className="px-4 py-2 cursor-pointer flex items-center  z-10 hover:bg-gray-200"
                      role="menuitem"
                      onClick={handleSignOut}
                    >
                      <FaSignOutAlt className="mr-2 text-[#001A23]" />
                      <span className="text-[#001A23]">Logout</span>
                    </div>
                    {/* Add more menu items as needed */}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {/*  hamburger Icon */}
        <div className="flex gap-[1rem] xl:hidden">
          {isLogin && (
            <div>
              <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
                <Avatar alt={profile?.name} src={profile?.picture} />
              </button>
              {/*      For Mobile Menu */}
              {isOpenMenu && (
                <div className="origin-top-right absolute right-[1.4rem] mt-2 w-55 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div
                      className="px-4 py-2 cursor-pointer flex items-center hover:bg-gray-200 z-10"
                      role="menuitem"
                      onClick={handleSignOut}
                    >
                      <FaSignOutAlt className="mr-2 text-[#001A23]" />
                      <span className="text-[#001A23]">Logout</span>
                    </div>
                    {/* Add more menu items as needed */}
                  </div>
                </div>
              )}
            </div>
          )}
          <button onClick={toggleDrawer}>
            <FiMenu className="  text-white text-2xl z-[10]" />
          </button>
        </div>
      </nav>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        size="100%"
        className="sm:w-[100vw]  md:w-[40vw] flex flex-col justify-center align-middle"
      >
        <div className="flex flex-col h-[95%] my-auto justify-center gap-[2.5rem] align-middle text-center">
          <div className="flex justify-end mr-[1rem]">
            <AiOutlineClose
              onClick={() => setIsOpen(false)}
              color="rgba(18, 31, 45, 1)"
            />
          </div>
          <nav className=" flex flex-col justify-start align-middle gap-[2rem]  basis-[80%]  my-[6rem]">
            <ul className="text-[#001A23] flex flex-col align-middle gap-6 font-bold">
              <li>Features</li>
              <li>Pricing</li>
              <li>About </li>
              <li>Data </li>
            </ul>
            {!isLogin && (
              <div className="flex flex-col gap-[.7rem] justify-center items-center">
                <button
                  className="btn-signup px-[1.4rem] py-[.7rem]  "
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="btn-login flex items-center gap-[.7rem]  px-[1.4rem] py-[.7rem] rounded-full justify-center"
                >
                  <SignupIcon />
                  Sign In
                </button>
              </div>
            )}
          </nav>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
