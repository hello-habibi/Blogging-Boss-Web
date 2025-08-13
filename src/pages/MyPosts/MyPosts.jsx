import React, { useEffect, useState } from "react";
import services from "../../appwrite/config";
import { useSelector } from "react-redux";
import DisplayCard from "../../components/DisplayCard";

function MyPosts() {
    const userData = useSelector((state) => state.auth.userData);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userData || !userData.$id) {
            setLoading(false);
            return;
        }

        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await services.getUserPosts(userData.$id);
                setPosts(data?.documents || []);
                setError(null);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError("Failed to load your posts. Please try again.");
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [userData]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">My Posts</h1>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-100 mb-6">My Posts</h1>
                <div className="text-center py-8">
                    <p className="text-red-500 text-lg">{error}</p>
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-100 mb-6">My Posts</h1>
                <div className="text-center py-8">
                    <p className="text-gray-600 text-lg">You haven't created any posts yet.</p>
                    <p className="text-gray-500 mt-2">Start writing your first post!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-100 mb-6">My Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <DisplayCard key={post.$id} post={post} />
                ))}
            </div>
        </div>
    );
}

export default MyPosts;
