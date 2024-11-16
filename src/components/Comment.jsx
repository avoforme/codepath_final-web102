import React, { useState } from 'react';
import { supabase } from '../client'; // Ensure you have a supabase client configured

const Comment = ({ postId, commentId, createdAt, content, initialVote, onDelete }) => {
  const [vote, setVote] = useState(initialVote);

  const handleVote = async (increment) => {
    const newVote = vote + increment;
    setVote(newVote);

    // Update the vote in the database
    const { error } = await supabase
      .from('Comment')
      .update({ vote: newVote })
      .eq('postid', postId)
      .eq('commentid', commentId);

    if (error) {
      console.error('Error updating vote:', error);
    }
  };

  // Handle delete comment
  const handleDelete = async () => {
    // Remove the comment from the database
    const { error } = await supabase
      .from('Comment')
      .delete()
      .eq('commentid', commentId)
      .eq('postid', postId);

    if (error) {
      console.error('Error deleting comment:', error);
    } else {
      // Call onDelete to remove comment from parent component state
      onDelete(commentId);
    }
  };

  return (
    <div className="comment" style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
      <p style={{ fontWeight: 'bold' }}>Comment:</p>
      <p>{content}</p>
      <p style={{ fontSize: '12px', color: '#555' }}>Created at: {new Date(createdAt).toLocaleString()}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <p>Votes: {vote}</p>
        <button onClick={() => handleVote(1)}>Upvote</button>
        <button onClick={() => handleVote(-1)}>Downvote</button>
        <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Comment;
