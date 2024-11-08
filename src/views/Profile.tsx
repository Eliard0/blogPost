import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../App';
import { FlatList, ListRenderItemInfo, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconLocation from 'react-native-vector-icons/EvilIcons';
import IconCall from 'react-native-vector-icons/Ionicons';
import IconCase from 'react-native-vector-icons/SimpleLineIcons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useFavorites } from './ContextApi';
import PostCard from '../components/PostCard';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: #EFF1F5;
  `;

const Container = styled.View`
  padding-left: 16px;
  background-color: #FFFF;
  padding-bottom: 20px;
  margin-bottom: 10px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  `;


const ContainerProfile = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-left: 10px;
`;

const ContaineeInfoProfile = styled.View`
  flex-direction: column;
`;

const ProfileImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
`;

const NameUser = styled.Text`
    font-size: 22px;
    color: #000;
    font-weight: 600;
`;

const User = styled.Text`
    font-size: 22px;
    color: #000;
`;

const Info = styled.Text`
    font-size: 15px;
    color: #000;
`;

type ProfileScreenRouteProp = RouteProp<StackParamList, 'Profile'>;

type Props = {
  route: ProfileScreenRouteProp;
};

type Post = {
    id: number;
    title: string;
    body: string;
};

const Profile = ({ route }: Props) => {
    const navigation = useNavigation();
    const { favorites, toggleFavorite } = useFavorites();
    const [posts, setPosts] = useState<Post[]>([]);
    const { userId, userName, profileImageUrl } = route.params;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Perfil',
            headerTitleAlign: 'left',
            headerStyle: {
                borderBottomWidth: 0.2,
                shadowOpacity: 0,
                elevation: 0,
            },
            headerLeft: () => (
                <Icon
                    name="arrowleft"
                    size={20}
                    color="#333"
                    onPress={handleCloseSearch}
                    style={{ marginLeft: 20, marginRight: 10 }}
                />
            )
        });
    }, [navigation]);

    const handleCloseSearch = () => {
        navigation.goBack();
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data: Post[] = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Erro ao buscar as publicações:', error);
            } finally {
            }
        };

        fetchPosts();
    }, []);

    const handleStarPress = (item: Post) => {
        toggleFavorite(item);
    };

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
        <SafeArea>
            <Container>
                <ContainerProfile>
                    <ProfileImage source={{ uri: String(profileImageUrl) }} />
                    <ContaineeInfoProfile>
                        <NameUser>{userName}</NameUser>
                        <User>@userName</User>
                    </ContaineeInfoProfile>
                </ContainerProfile>

                <ContaineeInfoProfile>
                    <ContainerProfile>
                        <Icon
                            name={'mail'}
                            size={16}
                            color={'#000'}
                            style={{ marginRight: 5 }}
                        />
                        <Info>Loremipsum@gmail.com</Info>
                    </ContainerProfile>
                    <ContainerProfile>
                        <IconLocation
                            name={'location'}
                            size={16}
                            color={'#000'}
                            style={{ marginRight: 5 }}
                        />
                        <Info>Rua lorem ispum, Fortaleza-CE</Info>
                    </ContainerProfile>
                    <ContainerProfile>
                        <IconCase
                            name={'briefcase'}
                            size={16}
                            color={'#000'}
                            style={{ marginRight: 5 }}
                        />
                        <Info>Lorem Ipsum Dolor</Info>
                    </ContainerProfile>
                    <ContainerProfile>
                        <IconCall
                            name={'call-outline'}
                            size={16}
                            color={'#000'}
                            style={{ marginRight: 5 }}
                        />
                        <Info>(85) 99999-9999</Info>
                    </ContainerProfile>
                </ContaineeInfoProfile>
            </Container>

            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeArea>
    )
}

export default Profile