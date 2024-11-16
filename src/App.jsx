import { supabase } from './client.js';
import { useState, useEffect } from 'react';
import Card from './components/Card'; // Ensure you have a Card component to display post details

const App = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('Post')  // Assuming your table is named 'Post'
                .select();

            if (error) {
                console.error('Error fetching posts:', error);
            } else {
                // Set the state with the fetched post data
                setPosts(data);
            }
        };

        fetchPosts();
    }, []);  // Empty dependency array ensures this runs only once on mount

    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post, index) => 
                    <Card 
                        key={post.id} 
                        id={post.id} 
                        title={post.title} 
                        content={post.content} 
                        vote={post.vote} 
                        image={post.image} 
                    />
                ) : <h2>{'No posts yet'}</h2>
            }
        </div>
    );
}

export default App;
