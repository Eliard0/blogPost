import { useState, useEffect } from 'react';
import { Comment } from '../models/Post';
import { useFavorites } from '../context/ContextApi';
import { Keyboard } from 'react-native';

export const useDetailPostViewModel = (postId: number) => {
  const { favorites, toggleFavorite } = useFavorites();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isStarred, setIsStarred] = useState(favorites.some((fav) => fav.id === postId));
  const [commentText, setCommentText] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    setIsStarred(favorites.some((fav) => fav.id === postId));
  }, [favorites, postId]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleAddComment = () => {
    if (commentText.trim().length > 0) {
      setComments((prevComments) => [
        ...prevComments,
        {
          id: 0,
          userId: 1,
          userName: "dory",
          profileImageUrl: `https://ui-avatars.com/api/?name=dory+tody`,
          text: commentText,
        },
      ]);
      setCommentText('');
    }
  };

  return {
    comments,
    commentText,
    setCommentText,
    isStarred,
    toggleFavorite,
    isKeyboardVisible,
    handleAddComment,
  };
};
