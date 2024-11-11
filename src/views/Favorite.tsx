import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import styled from 'styled-components/native';
import { useFavoriteViewModel } from '../ViewModel/FavoriteViewModel';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';
import { Post } from '../models/Post';

const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
`;

const Title = styled.Text`
  font-family: 'NunitoSansBold';
  font-size: 18px;
  color: #333;
  margin-top: 20%;
`;

const FavoriteScreen = () => {
    const { favorites, searchQuery, setSearchQuery, toggleFavorite, searchVisible, setSearchVisible } = useFavoriteViewModel();

    const renderItem = ({ item }: ListRenderItemInfo<Post>) => (
        <PostCard
            item={item}
            isStarred={true}
            onStarPress={() => toggleFavorite(item)}
        />
    );

    return (
        <Container>
            <NavBar
                title="Favoritos"
                searchVisible={searchVisible}
                searchQuery={searchQuery}
                setSearchVisible={setSearchVisible}
                setSearchQuery={setSearchQuery}
                showIconSearch
            />
            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            ) : (
                <Title>Nenhum Post favorito adicionado</Title>
            )}
        </Container>
    );
};

export default FavoriteScreen;
