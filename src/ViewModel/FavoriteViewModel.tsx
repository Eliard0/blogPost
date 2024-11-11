import { useState } from 'react';
import { useFavorites } from '../context/ContextApi';

export const useFavoriteViewModel = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const filteredFavorites = favorites.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    favorites: filteredFavorites,
    searchQuery,
    setSearchQuery,
    searchVisible,
    setSearchVisible,
    toggleFavorite,
  };
};
