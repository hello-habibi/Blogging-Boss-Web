import { Link } from 'react-router-dom';
import services from '../appwrite/config';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'; // Adjust path to your auth context
import { useSelector } from 'react-redux';

function DisplayCard({ post }) {
  const user = useSelector((state) => state.auth.userData);
  const currentUser = user; // get logged-in user
  const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/400x300/1e293b/ffffff?text=No+Image');
  const [imageError, setImageError] = useState(false);


  useEffect(() => {
    const loadImage = async () => {
      if (post?.featuredImg) {
        try {
          const url = await services.filePreview(post.featuredImg);
          setImageUrl(url);
        } catch (error) {
          console.error('Error loading image:', error);
          setImageUrl('https://via.placeholder.com/400x300/1e293b/ffffff?text=No+Image');
          setImageError(true);
        }
      }
    };
    loadImage();
  }, [post?.featuredImg]);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImageUrl('https://via.placeholder.com/400x300/1e293b/ffffff?text=No+Image');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await services.deletePost(post.$id);
        window.location.reload(); // Or trigger state update to refresh list
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };


  return (
    <div className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-4 
                    hover:bg-white/20 transition-all duration-300 group h-full flex flex-col'>
      
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg mb-4 w-full h-48">
        <img 
          src={imageUrl} 
          alt={post?.title || 'No title'} 
          className='w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110'
          style={{ minHeight: '192px', maxHeight: '192px' }}
          onError={handleImageError}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Title */}
      <h2 className='text-xl font-bold mb-2 text-white group-hover:text-yellow-300 transition-colors duration-300 line-clamp-2'>
        {post?.title || 'Untitled'}
      </h2>
      
      {/* Content */}
      <p
        className='text-slate-300 mb-4 flex-grow line-clamp-3'
        dangerouslySetInnerHTML={{
          __html: post?.content
            ? post.content.length > 120
              ? post.content.substring(0, 120) + '...'
              : post.content
            : 'No content available',
        }}
      />
      
      {/* Footer: Author + Actions */}
      <div className="flex items-center justify-between mt-auto gap-2 flex-wrap">
        <Link 
          to={`/posts/${post.userId}`}
          className="text-sm font-medium text-blue-400 hover:text-blue-300 hover:underline"
        >
          By {post.author || 'Unknown Author'}
        </Link>

        <div className="flex items-center gap-2 ml-auto">
          <Link 
            to={`/post/${post.$id}`} 
            className='px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg'
          >
            Read More
          </Link>

          {/* Show Edit & Delete if user owns the post */}
          {currentUser?.$id === post.userId && (
            <>
              <Link 
                to={`/edit-post/${post.$id}`} 
                className='px-3 py-1.5 bg-yellow-500 text-white text-sm font-medium rounded-lg hover:bg-yellow-600 transition-all duration-300 shadow-md'
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className='px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md'
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

DisplayCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    featuredImg: PropTypes.string,
    content: PropTypes.string,
    $createdAt: PropTypes.string,
    $id: PropTypes.string.isRequired,
    userId: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
};

export default DisplayCard;
