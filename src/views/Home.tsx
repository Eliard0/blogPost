import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';

import NavBar from '../components/NavBar';
import IconPlus from 'react-native-vector-icons/FontAwesome';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useFavorites } from './ContextApi';
import PostCard from '../components/PostCard';

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
`;

const ButtonNewPost = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 40px;
  position: absolute;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  background-color: #0F90D9;
  bottom: 20px; 
  right: 20px;
`;

const Title = styled.Text`
font-family: 'NunitoSansBold';
font-size: 18px;
font-weight: bold;
color: #333;
margin-bottom: 8px;
`;

type Post = {
    id: number;
    title: string;
    body: string;
};

const Home = ({ navigation }: Props) => {
    const navBar = useNavigation();
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { favorites, toggleFavorite } = useFavorites();

    React.useLayoutEffect(() => {
        navBar.setOptions({
            headerShown: true,
            title: null,
            headerStyle: {
                borderBottomWidth: 0.2,
                shadowOpacity: 0,
                elevation: 0,
            },
            headerTitle: () => (
                <NavBar
                    title={"Início"}
                    searchVisible={searchVisible}
                    searchQuery={searchQuery}
                    setSearchVisible={setSearchVisible}
                    setSearchQuery={setSearchQuery}
                    showIconSearch={true}
                />
            ),
        });
    }, [navigation, searchVisible, searchQuery]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data: Post[] = await response.json();
                setPosts(data);
                setFilteredPosts(data);
            } catch (error) {
                console.error('Erro ao buscar as publicações:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleStarPress = (item: Post) => {
        toggleFavorite(item);
    };

    useEffect(() => {
        const filterPosts = () => {
          const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredPosts(filtered);
        };
    
        filterPosts();
      }, [searchQuery, posts]);

    if (loading) {
        return <Container><Title>Carregando...</Title></Container>;
    }

    const renderItem = ({ item }: ListRenderItemInfo<Post>) => {
        const isStarred = favorites.some((fav) => fav.id == item.id);

        return (
            <PostCard
                item={item}
                isStarred={isStarred}
                onStarPress={() => handleStarPress(item)}
            />
        );
    };

    return (
        <Container>
            <FlatList
                data={filteredPosts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <ButtonNewPost>
                <IconPlus
                    name="plus"
                    size={27}
                    color="#fff"
                    onPress={() => navigation.navigate('NewPost')}
                />
            </ButtonNewPost>
        </Container>
    );
};

export default Home;