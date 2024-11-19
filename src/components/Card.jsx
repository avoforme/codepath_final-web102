import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../client";
import "./styles/Card.css";
const Card = ({
  id,
  title,
  content,
  vote,
  image,
  created_at,
  onVoteChange,
}) => {
  const updateVote = async (increment) => {
    const newVote = vote + increment;

    // Update the vote in the database
    await supabase.from("Post").update({ vote: newVote }).eq("id", id);

    // Notify parent component about the vote change
    onVoteChange(id, newVote);
  };

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>Created At: {created_at}</p>
      <div className="card-vote-container">
        <p>Votes: {vote}</p>
        <button className="card-buttons" onClick={() => updateVote(1)}>⬆</button>
        <button className="card-buttons" onClick={() => updateVote(-1)}>⬇</button>
      </div>
      {image && (
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            maxWidth: "300px",
            marginTop: "10px",
          }}
        />
      )}{" "}
      <div className="card-buttons-container">
        <Link className="card-buttons" to={"/moreInfo/" + id}>
          <button>See more</button>
        </Link>
        <Link className="card-buttons" to={"/editPost/" + id}>
          <button>Edit post</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
