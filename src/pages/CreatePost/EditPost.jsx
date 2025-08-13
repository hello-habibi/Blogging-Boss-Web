import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import services from '../../appwrite/config';

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [featuredImg, setFeaturedImg] = useState(null);
    const [existingImg, setExistingImg] = useState(null);
    const [status, setStatus] = useState('active');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    
    const fileInputRef = useRef(null);

    // Fetch existing post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const existingPost = await services.getPost({ slug: id });
                
                // Check if user owns this post
                if (existingPost.userId !== userData.$id) {
                    navigate('/myposts');
                    return;
                }
                
                setTitle(existingPost.title);
                setContent(existingPost.content);
                setExistingImg(existingPost.featuredImg);
                setStatus(existingPost.status || 'active');
            } catch (error) {
                console.error('Error fetching post:', error);
                setError('Failed to load post for editing.');
            } finally {
                setLoading(false);
            }
        };

        if (userData) {
            fetchPost();
        }
    }, [id, userData, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            let imageId = existingImg;
            
            // Handle new image upload
            if (featuredImg) {
                // Delete old image if exists
                if (existingImg) {
                    await services.deleteTheFile(existingImg);
                }
                
                // Upload new image
                const uploadedFile = await services.uploadFile(featuredImg);
                imageId = uploadedFile.$id;
            }

            // Update post
            await services.updatePost(id, {
                title,
                content,
                featuredImg: imageId,
                status: status === 'active',
                author: userData.name || userData.email
            });

            navigate(`/post/${id}`);
        } catch (error) {
            console.error('Error updating post:', error);
            setError('Failed to update post. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFeaturedImg(file);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-8">
                    <p className="text-red-500 text-lg">{error}</p>
                    <Link to="/myposts" className="btn btn-primary mt-4">Back to My Posts</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
            
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered"
                        required
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Content</span>
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="textarea textarea-bordered h-32"
                        required
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Featured Image</span>
                    </label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="file-input file-input-bordered w-full"
                        accept="image/*"
                    />
                    {existingImg && !featuredImg && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-600">Current image will be kept</p>
                        </div>
                    )}
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Status</span>
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="select select-bordered"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {error && (
                    <div className="alert alert-error mb-4">
                        <span>{error}</span>
                    </div>
                )}

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className={`btn btn-primary ${saving ? 'loading' : ''}`}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/post/${id}`)}
                        className="btn btn-outline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditPost;
