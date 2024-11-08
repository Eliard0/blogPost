import React, { useState } from 'react';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { StackParamList } from '../App';
import NavBar from '../components/NavBar';
import { useFavorites } from './ContextApi';
import { FlatList, ListRenderItemInfo } from 'react-native';
import PostCard from '../components/PostCard';

type FavoriteScreenNavigationProp = StackNavigationProp<StackParamList, 'Favorite'>;

type Props = {
    navigation: FavoriteScreenNavigationProp;
};

type Post = {
    id: number;
    title: string;
    body: string;
};

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

const Favorite = ({ navigation }: Props) => {
    const navBar = useNavigation();
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
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
                    title={"Favoritos"}
                    searchVisible={searchVisible}
                    searchQuery={searchQuery}
                    setSearchVisible={setSearchVisible}
                    setSearchQuery={setSearchQuery}
                    showIconSearch={true}
                />
            ),
        });
    }, [navBar, searchVisible, searchQuery]);

    const handleStarPress = (item: Post) => {
        toggleFavorite(item);
      };

    const renderItem = ({ item }: ListRenderItemInfo<Post>) => {
        return (
          <PostCard
            item={item}
            isStarred={true}
            onStarPress={()=>handleStarPress(item)}
          />
        );
      };

    return (
        <Container>
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

export default Favorite;
