import React, { useEffect, useState } from "react";
import services from "../appwrite/config";
import { Link } from "react-router-dom";

function DisplayCard({ post }) {
  const { title, featuredImg, author, userId , $id } = post;
  const [imgURL, setImgURL] = useState(null);

  // Fetch image URL
  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        const url = await services.filePreview(featuredImg);
        setImgURL(url); // Update state with the image URL
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImageURL();
  }, [featuredImg]); // Dependency array ensures this runs only when `featuredImg` changes

  return (
    <div className="card  bg-base-500 shadow-xl">
      <figure>
        {/* Show a placeholder while the image URL is loading */}
        {imgURL ? (
          <img className="rounded-xl max-w-96"   src={imgURL} alt={title || "Featured Image"} />
        ) : (
          <div className="placeholder">Loading Image...</div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title capitalize font-bold">{title || "Untitled Post"}</h2>
        <p>Author :: <span className="italic capitalise  underline"> {author || "Anonymous"} </span></p>
        <div className="card-actions justify-center">
          <Link to={`post/${$id}`} className="btn btn-primary">View</Link>
        </div>
      </div>
    </div>
  );
}

export default DisplayCard;
