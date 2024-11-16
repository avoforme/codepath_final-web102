import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const Post = () => {
    // Extract the post ID from the URL parameters
    const { id } = useParams();
    const [post, setPost] = useState(null);

    // Fetch post data when the component is mounted
    useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('Post')  // The table name for posts
        .select('*')
        .eq('id', id)  // Query by the given ID
        .single();  // Ensure we only fetch one post

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);  // Set the fetched post data into state
      }
    };

    fetchPost();
  }, [id]); // Dependency array ensures this runs when the `id` changes

  // Show a loading message if the post data is not yet loaded
  if (!post) {
    return <h2>Loading post information...</h2>;
  }

  return (
    <div>
      <h1>Post Details</h1>
      <h2 className="title">{post.title}</h2>
      <h3 className="created-at">Created At: {new Date(post.created_at).toLocaleString()}</h3>
      <p className="content">{post.content}</p>
      <p className="vote">Vote: {post.vote}</p>
      {post.image && <img src={post.image} alt={post.title} className="post-image" />}
    </div>
  );
};

export default Post;
