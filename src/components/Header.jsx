import { NavLink } from "react-router-dom";

// import { useState } from "react";

const Header = () => {
  
  return (
  
    <div className="px-4">
      <div className="py-3 border-b border-indigo-100 flex items-center justify-between ">
        <a className="text-2xl font-bold text-purple-800 " href="#">
          appPosts
        </a>
        <ul className=" inline-flex items-center ">
          <li>
            <button className=" header-btn " href="#">
              <NavLink to={`sign_in`}>Sign in</NavLink>
            </button>
            <button className=" header-btn " href="#">
              <NavLink to={`sign_up`}>Sign up</NavLink>
            </button>
          </li>
        </ul>
      </div>
      <div className="flex justify-between p-2 border-b border-indigo-100">
        {/* <p>Search...</p> */}
        {/* <form className="" >
        <input
          type="text"
          placeholder="Search post"
          onChange={(e) => setValue(e.target.value)}
        />
      </form> */}
        <div className=" text-base text-center text-gray-500 hover:text-indigo-600 ">
          <button type="button" href="#">
            <NavLink to={`add_post`}>Add new post</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
