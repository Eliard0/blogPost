import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { StackParamList } from '../App';
import NavBar from '../components/NavBar';
import IconPlus from 'react-native-vector-icons/FontAwesome';
import { FlatList, ListRenderItemInfo } from 'react-native';

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

const Card = styled.View`
  width: 97%;
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  elevation: 3;
`;

const InfoProfileContainer = styled.View`
  flex-direction: row;
`;

const InfoPersonContainer = styled.View`
  flex-direction: column;
`;

const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 15px;
`;

const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const Title = styled.Text`
font-family: 'NunitoSansBold';
font-size: 18px;
font-weight: bold;
color: #333;
margin-bottom: 8px;
`;

const Body = styled.Text`
  font-size: 16px;
  color: #666;
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
    const [starredItems, setStarredItems] = useState<{ [key: number]: boolean }>({});
    const [loading, setLoading] = useState<boolean>(true);

    const handleStarPress = (id: number) => {
        setStarredItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

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
            } catch (error) {
                console.error('Erro ao buscar as publicações:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <Container><Title>Carregando...</Title></Container>;
    }

    const renderItem = ({ item }: ListRenderItemInfo<Post>) => {
        const profileImageUrl = `https://ui-avatars.com/api/?name=nemo+tody`;
        const isStarred = starredItems[item.id] || false

        return (
            <Card key={item.id}>
                <InfoProfileContainer>
                    <ProfileImage source={{ uri: profileImageUrl }} />
                    <InfoPersonContainer>
                        <Name>Nemo</Name>
                        <Name>@NemoTody</Name>
                    </InfoPersonContainer>
                    <IconPlus
                        name={isStarred ? "star" : "star-o"}
                        size={27}
                        color={isStarred ? "#FFD700" : "#000"}
                        style={{
                            position: 'absolute',
                            right: 5,
                        }}
                        onPress={() => handleStarPress(item.id)}
                    />
                </InfoProfileContainer>
                <Title>{item.title}</Title>
                <Body>{item.body}</Body>
            </Card>
        );
    };

    return (
        <Container>
            <FlatList
                data={posts}
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