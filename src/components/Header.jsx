import { NavLink } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { BiUser } from 'react-icons/bi';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const [user, setUser] = useLocalStorage('user', '');
  const modalRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const logOutUser = () => {
    setUser('');
    localStorage.removeItem('user');
  };

  const showUserData = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const closeModalOnOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closePopup();
      }
    };

    if (isPopupOpen) {
      document.addEventListener('mousedown', closeModalOnOutsideClick);
    } else {
      document.removeEventListener('mousedown', closeModalOnOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', closeModalOnOutsideClick);
    };
  }, [isPopupOpen]);

  return (
    <div className="px-4 ">
      <div className="relative py-3 border-b border-indigo-100 flex items-center justify-between ">
        <p className="text-2xl font-bold text-purple-800 ">appPosts</p>
        <ul className="inline-flex items-center ">
          <li>
            {user.length !== 0 ? (
              <div className="inline-flex align-middle">
                <button type="button" onClick={showUserData}>
                  <BiUser className=" text-2xl text-blue-600 mr-4" />
                </button>
                {isPopupOpen && (
                  <div
                    ref={modalRef}
                    className="bg-purple-200 text-center rounded-3xl text-gray-700 absolute right-6 top-10 pt-2 px-4 pb-6 w-72"
                  >
                    <button
                      type="button"
                      className=" text-gray-600 block ml-52"
                      onClick={closePopup}
                    >
                      X
                    </button>
                    <p>
                      <i>Name:</i> {user.name}
                    </p>
                    <p>
                      <i>Country:</i> {user.country}
                    </p>
                    <p>
                      <i>Email-address:</i> {user.email}
                    </p>
                  </div>
                )}
                <button type="button" onClick={logOutUser}>
                  Log out
                </button>
              </div>
            ) : (
              <div className=" flex">
                <div className=" header-btn ">
                  <NavLink to={`sign_in`}>Registration</NavLink>
                </div>
                <div className="header-btn ">
                  <NavLink to={`sign_up`}>Log in</NavLink>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
      <div className="flex justify-between p-2 border-b border-indigo-100">
        <div className="text-base text-center text-gray-500 hover:text-indigo-600 ">
          <div>
            <NavLink to={`add_post`}>Add new post</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
