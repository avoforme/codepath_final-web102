import React, { useState } from 'react';
import { supabase } from '../client'; // import your supabase instance

const CreatePost = () => {
    const [post, setPost] = useState({
        title: "",
        content: "",
        vote: 0,
        image: "" // Handle image URL or file input
    });

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) : value,
        }));
    };

    const createPost = async (event) => {
        event.preventDefault();

        // Insert the post into the Supabase table
        const { data, error } = await supabase
            .from('Post')
            .insert([
                {
                    title: post.title,
                    content: post.content,
                    vote: post.vote,
                    image: post.image, // If you have an image field
                }
            ]);

        if (error) {
            console.error('Error creating post:', error);
        } else {
            console.log('Post created:', data);
            window.location = "/createPost"; // Redirect after success
        }
    };

    return (
        <div>
            <h1>Create a New Post</h1>

            <div>
                <form onSubmit={createPost}>
                    <label htmlFor="title">Title</label> <br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                    />
                    <br /><br />

                    <label htmlFor="content">Content</label> <br />
                    <textarea
                        id="content"
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                    />
                    <br /><br />

                    <label htmlFor="vote">Vote</label> <br />
                    <input
                        type="number"
                        id="vote"
                        name="vote"
                        value={post.vote}
                        onChange={handleChange}
                    />
                    <br /><br />

                    <label htmlFor="image">Image URL</label> <br />
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={post.image}
                        onChange={handleChange}
                    />
                    <br /><br />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
