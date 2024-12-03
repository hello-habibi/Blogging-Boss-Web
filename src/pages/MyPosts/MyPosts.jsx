import React, { useEffect, useState } from "react";
import services from "../../appwrite/config";
import { useSelector } from "react-redux";

function MyPosts() {
    const user = useSelector((state) => state.auth.userData);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!user || !user.userId) {
            console.warn("User or userId is not defined yet.");
            return;
        }

        const fetchPosts = async () => {
            try {
                const data = await services.getUserPosts(user.userId);
                setPosts(data?.documents || []); // Safely access `documents`
                console.log("Fetched posts:", data?.documents || []);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };

        fetchPosts();
    }, [user]);

    return (
        <>
            {user ? (
                <>There is only my posts to show: {posts.length}</>
            ) : (
                <>Loading user data...</>
            )}
        </>
    );
}

export default MyPosts;
