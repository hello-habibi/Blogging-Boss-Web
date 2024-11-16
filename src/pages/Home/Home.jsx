import React, { useEffect, useState } from 'react'
import services from '../../appwrite/config';
import DisplayCard from '../../components/DisplayCard';

function Home() {
    const [posts , setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const data = await services.getAllPosts(); // Assuming `services.getAllPosts()` is an async function
            setPosts(data.documents);
            console.log(data.documents)
          } catch (err) {
            console.error("Error fetching posts:", err);
          }
        };
    
        fetchPosts(); // Call the inner async function
      }, []);

    return (
        <>
        <div className='grid md:grid-cols-2 lg:grid-cols-3'>
            {
                posts.map((post)=> <DisplayCard post={post} key={post.$id}/>)
            }
            </div> 
        </>
    )
}

export default Home
