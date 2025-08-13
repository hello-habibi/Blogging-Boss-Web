import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import services from '../../appwrite/config';

function Post() {
    const [post, setPost] = useState(null);
    const [imgURL, setImgURL] = useState(null);
    const { id: slug } = useParams(); // Extract the slug (id) from the URL

    // Fetch the post data
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const fetchedPost = await services.getPost({ slug });
                setPost(fetchedPost);

                // Fetch the image URL only after the post is loaded
                if (fetchedPost.featuredImg) {
                    const url = await services.filePreview(fetchedPost.featuredImg);
                    setImgURL(url); // Get the href property of the URL object
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPostData();
    }, [slug]);

    // Render
    return (
        <div className="card bg-base-100 shadow-xl flex flex-row">
            {post ? (
                <>
                    {/* Left Half for Image */}
                    <div className="w-1/2">
                        {imgURL ? (
                            <img src={imgURL} alt="Featured" className="h-full w-full max-h-max object-cover" />
                        ) : (
                            <p className="flex items-center justify-center h-full">Loading image...</p>
                        )}
                    </div>

                    {/* Right Half for Content */}
                    <div className="w-1/2 p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                            <h3 className="text-lg font-medium mb-4">
                                Author: <span className="font-bold italic">{post.author}</span>
                            </h3>
                            <div
                                className="mb-4"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            ></div>
                        </div>

                        {/* Back Button */}
                        <div className="flex justify-center">
                            <Link to="/" className="btn btn-primary w-1/2">
                                Back
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center h-96 w-full">
                    Loading post...
                </div>
            )}
        </div>

    );
}

export default Post;