import { supabase } from './client.js';
import { useState, useEffect } from 'react';
import Card from './components/Card'; // Ensure you have a Card component to display post details
import './App.css';
import logo from "/nyancat.gif"; // Add your logo path here

const App = () => {
  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState('created_at'); // Default sort by created time
  const [searchQuery, setSearchQuery] = useState(''); // Search input

  useEffect(() => {
      const fetchPosts = async () => {
          const { data, error } = await supabase
              .from('Post') // Assuming your table is named 'Post'
              .select();

          if (error) {
              console.error('Error fetching posts:', error);
          } else {
              setPosts(data);
          }
      };

      fetchPosts();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Callback to update the vote count for a specific post
  const handleVoteChange = (postId, newVote) => {
      setPosts((prevPosts) =>
          prevPosts.map((post) =>
              post.id === postId ? { ...post, vote: newVote } : post
          )
      );
  };

  // Sort posts based on the selected option
  const sortedPosts = [...posts].sort((a, b) => {
      if (sortOption === 'created_at') {
          return new Date(b.created_at) - new Date(a.created_at); // Newest first
      } else if (sortOption === 'vote') {
          return b.vote - a.vote; // Highest votes first
      }
      return 0;
  });

  // Filter posts based on the search query
  const filteredPosts = sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <div className="App">
          <h1>Post About Cats!</h1>
        <div className="logo-container">
            <img src={logo} alt="Logo" />
        </div>
        {/* Search Input */}
        <div className="search-container">
            <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="styled-input"
            />
        </div>

        {/* Sorting Dropdown */}
        <div className="sort-container">
            <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="styled-select"
            >
                <option value="created_at">Sort by Created Time</option>
                <option value="vote">Sort by Upvotes</option>
            </select>
        </div>


          {/* Render Posts */}
          <div className="ReadPosts">
              {filteredPosts && filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                      <Card
                          key={post.id}
                          id={post.id}
                          title={post.title}
                          content={post.content}
                          vote={post.vote}
                          image={post.image}
                          created_at={post.created_at}
                          onVoteChange={handleVoteChange} // Pass callback to Card
                      />
                  ))
              ) : (
                  <h2>{'No posts found'}</h2>
              )}
          </div>
      </div>
  );
};

export default App;
