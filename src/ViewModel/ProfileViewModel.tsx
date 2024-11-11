import { useEffect, useState } from 'react';
import { Post } from '../models/Post';
import { useFavorites } from '../context/ContextApi';

export const useProfileViewModel = (userId: number) => {
    const { favorites, toggleFavorite } = useFavorites();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data: Post[] = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Erro ao buscar as publicações:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleStarPress = (post: Post) => {
        toggleFavorite(post);
    };

    const isFavorite = (postId: number) => {
        return favorites.some((fav) => fav.id === postId);
    };

    return { posts, handleStarPress, isFavorite };
};
