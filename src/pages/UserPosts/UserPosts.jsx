import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DisplayCard from '../../components/DisplayCard';
import services from '../../appwrite/config';

const UserPosts = () => {
  const { user } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true);

        // Fetch posts by user ID
        const fetched = await services.getUserPosts(user);
        const fetchedPosts = fetched.documents;

        if (fetchedPosts && fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
          // Assuming all posts are from the same author
          setUserName(fetchedPosts[0]?.author || user);
        } else {
          setPosts([]);
          setUserName(user);
        }
      } catch (err) {
        console.error('Error fetching user posts:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p className="text-gray-600 text-lg">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screenbg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-50 mb-8">
          Posts by {userName}
        </h1>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No posts found for this user.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <DisplayCard key={post.$id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPosts;
