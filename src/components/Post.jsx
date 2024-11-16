import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './styles/Post.css';

const Post = () => {
    // Extract the post ID from the URL parameters
    const { id } = useParams();
    const [post, setPost] = useState(null);
  const [currentVote, setCurrentVote] = useState(0);


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
        setCurrentVote(data.vote);
      }
    };

    fetchPost();
  }, [id]); // Dependency array ensures this runs when the `id` changes

  // Show a loading message if the post data is not yet loaded
  if (!post) {
    return <h2>Loading post information...</h2>;
  }

    const updateVote = async (increment) => {
        const newVote = currentVote + increment;
        setCurrentVote(newVote);

        // Update the vote in the database
        await supabase
            .from('Post')
            .update({ vote: newVote })
            .eq('id', id);
    };

  return (
    <div>
      <h1>Post Details</h1>
      <h2 className="title">{post.title}</h2>
      <h3 className="created-at">Created At: {new Date(post.created_at).toLocaleString()}</h3>
      <p className="content">{post.content}</p>
      <div>
            <p>Votes: {currentVote}</p>
            <button onClick={() => updateVote(1)}>Upvote</button>
            <button onClick={() => updateVote(-1)}>Downvote</button>
        </div>
      {post.image && <img src={post.image} alt={post.title} className="post-image" />}
    </div>
  );
};

export default Post;
