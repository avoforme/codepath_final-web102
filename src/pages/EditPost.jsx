import { supabase } from '../client';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

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
            window.location.href = `/moreInfo/${id}`; // Use `href` to ensure proper navigation
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
            window.location.href = "/"; // Use `href` to ensure proper navigation
        }
    };
    

    return (
        <div>
            <h1>Edit Post</h1>
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

                <label htmlFor="content">Content</label> <br />
                <textarea
                    id="content"
                    name="content"
                    value={post.content}
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

                <label htmlFor="secret_key">Enter Secret Key</label><br />
                <input
                    type="password"
                    id="secret_key"
                    name="secret_key"
                    value={inputSecretKey}
                    onChange={(e) => setInputSecretKey(e.target.value)}
                />
                <br /><br />

                <input type="submit" value="Update Post" />
            </form>

            <button className="deleteButton" onClick={deletePost}>Delete Post</button>
        </div>
    );
};

export default EditPost;
