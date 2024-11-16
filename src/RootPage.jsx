import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authServices from "./appwrite/auth";
import { logIn, logOut } from "./store/authSlice";

function RootPage() {
  const [userData, setUserData] = useState(null);
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch logged-in user from authServices and set it to state
    const fetchLoggedInUser = async () => {
      try {
        const loggedInUser = await authServices.getLoggedInUser(); // Assuming this is an async function
        setUserData(loggedInUser);
        if(!loggedInUser){
          dispatch(logOut());
        }else{
          dispatch(logIn(loggedInUser));
        }

      } catch (error) {
        console.error("Error fetching logged-in user:", error);
      }
    };

    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    // Sync Redux user state with local state when Redux state changes
    setUserData(user);
  }, [user]);

  return (
    <>
      <Header />
      <div className="min-h-dvh"><Outlet /></div>
      <Footer />
    </>
  );
}

export default RootPage;
