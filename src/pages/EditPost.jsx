import { supabase } from '../client';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const EditPost = () => {
    // Get the id of the post to edit from the URL
    let params = useParams();
    let id = params.id;

    // Initialize the state for the post details
    const [post, setPost] = useState({
        title: "",
        content: "",
        vote: 0,
        image: ""
    });

    // Fetch the post data when the component mounts
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Post')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching post:', error);
            } else {
                setPost(data);
            }
        };

        fetchPost();
    }, [id]);

    // Handle form input changes
    const handleChange = (event) => {
        const { name, value, type } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) : value,
        }));
    };

    // Update the post in the database
    const updatePost = async (event) => {
        event.preventDefault();
        const { title, content, vote, image } = post;
        const { error } = await supabase
            .from('Post')
            .update({ title, content, vote, image })
            .eq('id', id);

        if (error) {
            console.error('Error updating post:', error);
        } else {
            window.location = "/editPost"; // Redirect after successful update
        }
    };

    // Delete the post from the database
    const deletePost = async (event) => {
        event.preventDefault();
        const { error } = await supabase
            .from('Post')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting post:', error);
        } else {
            window.location = "/read"; // Redirect after successful deletion
        }
    };

    return (
        <div>
            <h1>Edit Post</h1>
            <h3>Fill out the form to edit your post</h3>
            <div>
                <form onSubmit={updatePost}>
                    <label htmlFor="title">Title</label> <br />
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={post.title} 
                        onChange={handleChange} 
                    />
                    <br /><br />

                    <label htmlFor="content">Content</label><br />
                    <textarea 
                        id="content" 
                        name="content" 
                        value={post.content} 
                        onChange={handleChange}
                    />
                    <br /><br />

                    <label htmlFor="vote">Vote</label><br />
                    <input 
                        type="number" 
                        id="vote" 
                        name="vote" 
                        value={post.vote} 
                        onChange={handleChange}
                    />
                    <br /><br />

                    <label htmlFor="image">Image URL</label><br />
                    <input 
                        type="text" 
                        id="image" 
                        name="image" 
                        value={post.image} 
                        onChange={handleChange}
                    />
                    <br /><br />

                    <input type="submit" value="Update Post" />
                </form>

                <button className="deleteButton" onClick={deletePost}>Delete Post</button>
            </div>
        </div>
    );
};

export default EditPost;
