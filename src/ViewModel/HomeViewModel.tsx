import { useState, useEffect } from 'react';
import { Post } from '../models/Post';
import { useFavorites } from '../context/ContextApi';

export const useHomeViewModel = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Erro ao buscar as publicações:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    posts: filteredPosts,
    searchQuery,
    setSearchQuery,
    loading,
    favorites,
    toggleFavorite,
    searchVisible,
    setSearchVisible,
  };
};
