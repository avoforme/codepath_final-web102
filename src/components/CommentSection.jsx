import React, { useState, useEffect } from 'react';
import { supabase } from '../client'; // Ensure you have a supabase client configured
import Comment from './Comment'; // Import the Comment component
import './styles/CommentSection.css'; // Add your CSS file path
const CommentSection = ({ postid }) => {
  const [comments, setComments] = useState([]); // Store comments for the post
  const [newComment, setNewComment] = useState(''); // Store the new comment content
  const [newCommentVote, setNewCommentVote] = useState(0); // Store the new comment vote

  // Fetch comments based on the postid
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('Comment')
        .select('*')
        .eq('postid', postid); // Get all comments related to this post

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data); // Update state with the fetched comments
      }
    };

    fetchComments(); // Call the function to fetch comments
  }, [postid]); // Re-fetch comments when postid changes

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      return; // Prevent adding empty comments
    }

    // Insert the new comment into the database
    const { data, error } = await supabase.from('Comment').insert([
      {
        postid: postid,
        content: newComment,
        vote: newCommentVote,
      },
    ]);

    if (error) {
      console.error('Error adding comment:', error);
    } else {
      // Add the new comment to the existing comments list
      setComments((prevComments) => [data[0], ...prevComments]);
      setNewComment(''); // Clear the new comment input
      setNewCommentVote(0); // Reset the vote for the new comment
      window.location.href = `/moreInfo/${postid}`; // Use `href` to ensure proper navigation

    }
  };

  // Handle deleting a comment
  const handleDeleteComment = (commentId) => {
    setComments((prevComments) => prevComments.filter(comment => comment.commentid !== commentId));
  };

  return (
    <div className="comment-section">
      <h3>Comments:</h3>

      {/* Render the list of comments */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment.commentid}
            postId={comment.postid}
            commentId={comment.commentid}
            createdAt={comment.created_at}
            content={comment.content}
            initialVote={comment.vote}
            onDelete={handleDeleteComment} // Pass onDelete handler to Comment
          />
        ))
      ) : (
        <p>No comments yet.</p>
      )}

      {/* Comment form */}
      <div className="add-comment-form" style={{ marginTop: '20px' }}>
        <h4>Add a Comment:</h4>
        <textarea
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            minHeight: '80px',
          }}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleAddComment} style={{ padding: '10px' }} className='comment-button'>
            Submit Comment
          </button>
          <select
            value={newCommentVote}
            onChange={(e) => setNewCommentVote(parseInt(e.target.value))}
            style={{ padding: '10px' }}
          >
            <option value={0}>No Vote</option>
            <option value={1}>Upvote</option>
            <option value={-1}>Downvote</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
