import { useState } from 'react';
import { Alert } from 'react-native';
import { createPost, PostData } from '../models/Post';

export default function useNewPostViewModel() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    const handlePostSubmit = async () => {
        if (!title.trim() || !body.trim()) {
            Alert.alert('Erro', 'Por favor, preencha o título e o corpo da publicação.');
            return;
        }

        setIsPosting(true);
        try {
            const postData: PostData = { title, body, userId: 1 };
            await createPost(postData);
            Alert.alert('Sucesso', 'Post criado com sucesso');
            return true;
        } catch (error) {
            Alert.alert('Erro', 'Algo de errado não deu certo');
            console.error(error);
            return false;
        } finally {
            setIsPosting(false);
        }
    };

    return {
        title,
        setTitle,
        body,
        setBody,
        isPosting,
        handlePostSubmit,
    };
}
