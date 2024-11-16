import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import { logOut } from "../store/authSlice";
import authServices from "../appwrite/auth";
import ProtectedRoute from "./ProtectedRoute";

function Header() {
  const user = useSelector((state) => state.auth.userData);
  console.log(user)
  const dispatch = useDispatch();



  const handleLogout = () => {
    try{
      const result = authServices.logOut()
      if(result){
        dispatch(logOut());
      }else{
        console.log("something wrong in the log out section ")
      }
  
    }catch(error){
      console.log(error)
    }

  }



  const listItems = <>
    
    <NavLink to={"/"}><li className="btn hover:bg-black hover:text-white mr-3 mb-2">Home</li></NavLink>
    <NavLink to={"/myposts"}><li className="btn hover:bg-black hover:text-white mr-3 mb-2">My Posts</li></NavLink>
<NavLink to={"/create-post"}><li className="btn hover:bg-black hover:text-white mr-3 mb-2">Create Post</li></NavLink>
    
    {
      !user ? <NavLink to={"/login"}><li className="btn hover:bg-black active:bg-black hover:text-white mr-3 mb-2">LogIn</li></NavLink>
        : <button onClick={handleLogout} className="btn hover:bg-black hover:text-white mr-3 mb-2"> LogOut</button>
    }

  </>
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {
              listItems
            }


          </ul>
        </div>
        <a className="btn btn-ghost text-xl bg-gray-500 text-white">Blogging Boss</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {
            listItems
          }
        </ul>
      </div>
      <div className="navbar-end mr-4">
        {
          user ? <p>{user?.name}</p>:<NavLink to={"/signup"}><li className="btn hover:bg-black hover:text-white mr-3 mb-2">SignUp</li></NavLink>
        }
      </div>
    </div>
  );
}

export default Header;
