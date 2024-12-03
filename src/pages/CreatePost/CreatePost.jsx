import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import services from '../../appwrite/config';
import { useSelector } from 'react-redux';
import { v4 as slug } from 'uuid';


export default function CreatePost() {

    //states to get the inputs
    const editorRef = useRef(null);

    const [title, setTile] = useState("");
    const [imgURL, setImgURL] = useState(null);
    // const [content, setContent] = useState("");
    const [featuredImage, setImage] = useState(null);

    // database requirements here 
    const userData = useSelector((state) => state.auth.userData)
    const author = userData?.name;
    const userId = userData?.$id;

    //All functions here 

    const handleTile = (e) => {
        setTile(e.target.value);
    }

    const uploadFile = async () => {
        const temp = document.getElementById('file').files[0];
        console.log(temp)
        try {
            const fileLocation = await services.uploadFile(temp);
            console.log(fileLocation);
            const fileId = fileLocation.$id;
            setImage(fileId);

            const fetchImageURL = async () => {
                try {
                    const url = await services.filePreview(fileId);
                    setImgURL(url); // Update state with the image URL
                } catch (error) {
                    console.error("Error fetching image URL:", error);
                }
            };
    
            fetchImageURL();

        } catch (error) {
            console.log(error)
        }

    }


    const post = async () => {


        const content = editorRef.current.getContent();
        const data = {
            slug: slug(),
            title,
            content,
            featuredImg: featuredImage,
            author,
            userId
        }
        try {
            const result = await services.createPost({ ...data })

            console.log(result)

        } catch (error) {
            console.log(error)
        }
        console.log(data)
    };

    // useEffect(() => {
    //     const fetchImageURL = async () => {
    //         try {
    //             const url = await services.filePreview(featuredImg);
    //             setImgURL(url); // Update state with the image URL
    //         } catch (error) {
    //             console.error("Error fetching image URL:", error);
    //         }
    //     };

    //     fetchImageURL();
    // }, [featuredImg]);

    return (
        <>
            <div className='flex justify-around gap-5 max-w-7xl'>

                <div>
                    <div className='mb-5'>
                        <label htmlFor="title"> Blog Tile </label>
                        <input onChange={handleTile} name='title' type="text" className='input border-white ' />

                    </div>
                    <Editor
                        apiKey='bri9cdlb2m72saupxktpz5bbv8cyk8ou9uq7qsdxgzzpo6jm'
                        onInit={(_evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                            height: 500,
                            width: 700,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>
                <div>
                    <input type="file" id='file' onChange={uploadFile} />
                    <div>
                        <figure>
                            {/* Show a placeholder while the image URL is loading */}
                            {imgURL ? (
                                <img className="rounded-xl max-w-96" src={imgURL} alt={title || "Featured Image"} />
                            ) : (
                                <div className="placeholder">Loading Image...</div>
                            )}
                        </figure>


                    </div>

                </div>
            </div>
            <div className='flex justify-center my-4'><button className='btn btn-secondary inline-block m' onClick={post}>Post</button></div>
        </>
    );
}