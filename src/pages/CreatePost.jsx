import React, { useState } from 'react';
import { supabase } from '../client'; // import your supabase instance

const CreatePost = () => {
    const [post, setPost] = useState({
        title: "",
        content: "",
        vote: 0,
        image: "",
        secret_key: "" // Add secret_key to state
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

        // Validation: Ensure title and content are not empty
        if (!post.title.trim() || !post.content.trim()) {
            alert("Title and Content are required to create a post.");
            return;
        }

        const { data, error } = await supabase
            .from('Post')
            .insert([
                {
                    title: post.title,
                    content: post.content,
                    image: post.image,
                    secret_key: post.secret_key // Include secret_key
                }
            ]);

        if (error) {
            console.error('Error creating post:', error);
        } else {
            console.log('Post created:', data);
            window.location = "/"; // Redirect to home page after creating post
        }
    };

    return (
        <div>
            <h1>Create a New Post</h1>
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

                <label htmlFor="image">Image URL</label> <br />
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={post.image}
                    onChange={handleChange}
                />
                <br /><br />

                <label htmlFor="secret_key">Secret Key</label> <br />
                <input
                    type="password"
                    id="secret_key"
                    name="secret_key"
                    value={post.secret_key}
                    onChange={handleChange}
                />
                <br /><br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CreatePost;
