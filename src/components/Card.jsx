import { Link } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../client';

const Card = ({ id, title, content, vote, image, created_at, onVoteChange }) => {
    const updateVote = async (increment) => {
        const newVote = vote + increment;

        // Update the vote in the database
        await supabase
            .from('Post')
            .update({ vote: newVote })
            .eq('id', id);

        // Notify parent component about the vote change
        onVoteChange(id, newVote);
    };

    return (
        <div className="card">
            <h3>{title}</h3>
            <p>Created At: {created_at}</p>
            <div>
                <p>Votes: {vote}</p>
                <button onClick={() => updateVote(1)}>Upvote</button>
                <button onClick={() => updateVote(-1)}>Downvote</button>
            </div>
            {image && <img src={image} alt={title} className="post-image" />}
            <Link to={'/moreInfo/' + id}>
                <button>See more</button>
            </Link>
        </div>
    );
};

export default Card;
