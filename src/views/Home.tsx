import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import IconPlus from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import { useHomeViewModel } from '../ViewModel/HomeViewModel';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';
import { Post } from '../models/Post';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
`;

const Title = styled.Text`
  font-family: 'NunitoSansBold';
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const ButtonNewPost = styled.TouchableOpacity`
    width: 70px;
    height:70px;
    border-radius: 40px;
    position: absolute;
    justify-content: center;
    align-items: center;
    margin-left: 8px;
    background-color: #0F90D9;
    bottom: 20px; 
    right: 20px;
  `;

const HomeScreen = () => {
    const {
        posts,
        searchQuery,
        setSearchQuery,
        searchVisible,
        setSearchVisible,
        loading,
        toggleFavorite,
        favorites
    } = useHomeViewModel();

    const navigation = useNavigation()

    const renderItem = ({ item }: ListRenderItemInfo<Post>) => {
        const isStarred = favorites.some((fav) => fav.id == item.id);
        return (
            <PostCard
                item={item}
                isStarred={isStarred}
                onStarPress={() => toggleFavorite(item)}
            />
        );
    };

    return (
        <Container>
            <NavBar
                title="Início"
                searchVisible={searchVisible}
                searchQuery={searchQuery}
                setSearchVisible={setSearchVisible}
                setSearchQuery={setSearchQuery}
                showIconSearch
            />
            {loading ? (
                <Title>Carregando...</Title>
            ) : (
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
            <ButtonNewPost onPress={() => navigation.navigate('NewPost')}>
                <IconPlus
                    name="plus"
                    size={27}
                    color="#fff"
                />
            </ButtonNewPost>
        </Container>
    );
};

export default HomeScreen;
