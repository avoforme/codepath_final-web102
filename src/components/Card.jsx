const Card = ({ id, title, content, vote, image }) => {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{content}</p>
            <p>Votes: {vote}</p>
            {image && <img src={image} alt={title} className="post-image" />}
        </div>
    );
};

export default Card;
