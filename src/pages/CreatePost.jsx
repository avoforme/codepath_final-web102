import React, { useState } from 'react';
import { supabase } from '../client'; // Import your Supabase instance
import './CreatePost.css'; // Import the CSS file for styling

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
        <div className="create-post-container">
            <h1>Create a New Post</h1>
            <form onSubmit={createPost} className="create-post-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        placeholder="Enter the post title"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        placeholder="Write the post content"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={post.image}
                        onChange={handleChange}
                        placeholder="Paste the image URL"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="secret_key">Secret Key</label>
                    <input
                        type="password"
                        id="secret_key"
                        name="secret_key"
                        value={post.secret_key}
                        onChange={handleChange}
                        placeholder="Enter a secret key"
                    />
                </div>

                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default CreatePost;
