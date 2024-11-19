import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

import './EditPost.css'; // Link to your CSS file

const EditPost = () => {
    let params = useParams();
    let id = params.id;

    const [post, setPost] = useState({
        title: "",
        content: "",
        vote: 0,
        image: ""
    });
    const [inputSecretKey, setInputSecretKey] = useState(""); // For secret key input

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

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) : value,
        }));
    };

    const updatePost = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase
            .from('Post')
            .select('secret_key')
            .eq('id', id)
            .single();

        if (error || data.secret_key !== inputSecretKey) {
            alert('Incorrect Secret Key!');
            return;
        }

        const { error: updateError } = await supabase
            .from('Post')
            .update({ title: post.title, content: post.content, vote: post.vote, image: post.image })
            .eq('id', id);

        if (updateError) {
            console.error('Error updating post:', updateError);
        } else {
            window.location.href = `/moreInfo/${id}`;
        }
    };

    const deletePost = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase
            .from('Post')
            .select('secret_key')
            .eq('id', id)
            .single();

        if (error || data.secret_key !== inputSecretKey) {
            alert('Incorrect Secret Key!');
            return;
        }

        const { error: deleteError } = await supabase
            .from('Post')
            .delete()
            .eq('id', id);

        if (deleteError) {
            console.error('Error deleting post:', deleteError);
        } else {
            window.location.href = "/";
        }
    };

    return (
        <div className="edit-post-container">
            <h1 className="edit-post-title">Edit Post</h1>
            <form className="edit-post-form" onSubmit={updatePost}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    className="input-field"
                />

                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    className="textarea-field"
                />

                <label htmlFor="image">Image URL</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={post.image}
                    onChange={handleChange}
                    className="input-field"
                />

                <label htmlFor="secret_key">Enter Secret Key</label>
                <input
                    type="password"
                    id="secret_key"
                    name="secret_key"
                    value={inputSecretKey}
                    onChange={(e) => setInputSecretKey(e.target.value)}
                    className="input-field"
                />

                <div className="button-group">
                    <input type="submit" value="Update Post" className="update-button" />
                    <button className="delete-button" onClick={deletePost}>
                        Delete Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPost;
