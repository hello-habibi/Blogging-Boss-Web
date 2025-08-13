import { useEffect, useState } from 'react'
import services from '../../appwrite/config';
import DisplayCard from '../../components/DisplayCard';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await services.getAllPosts();
                setPosts(data.documents);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setLoading(false);
            }
        };
    
        fetchPosts();
    }, []);

    // 8-multiple rule: responsive grid that adapts to 8-column breakpoints
    const getGridClass = () => {
        if (posts.length <= 8) {
            return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4';
        } else if (posts.length <= 16) {
            return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
        } else {
            return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6';
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Latest Posts
                        </h1>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                            Discover amazing content from our community
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-slate-400">No posts found</p>
                        </div>
                    ) : (
                        <div className={`grid ${getGridClass()} gap-6 auto-rows-fr`}>
                            {posts.map((post) => (
                                <div 
                                    key={post.$id} 
                                    className="transform transition-all duration-300 hover:scale-105"
                                >
                                    <DisplayCard post={post} />
                                </div>
                            ))}
                        </div>
                    )}

                    {posts.length > 0 && (
                        <div className="mt-12 text-center">
                            <p className="text-sm text-slate-400">
                                Showing {posts.length} post{posts.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home
