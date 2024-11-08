import React, { useState, useEffect, useId } from 'react';
import styled from 'styled-components/native';
import IconPlus from 'react-native-vector-icons/FontAwesome';
import IconComent from 'react-native-vector-icons/MaterialCommunityIcons';

import { StackParamList } from '../App';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useFavorites } from './ContextApi';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: #EFF1F5;
  `;

const Container = styled.View`
flex:1;
background-color: #FFFF;
padding-bottom: 20px;
border-bottom-left-radius: 16px;
border-bottom-right-radius: 16px;
`;


const ContainerProfile = styled.View`
flex-direction: row;
margin-top: 10px;
margin-left: 10px;
padding-left: 16px;
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
    font-size: 19px;
    color: #000;
    font-weight: 600;
`;

const User = styled.Text`
    font-size: 15px;
    color: #000;
`;

const ContainerInfo = styled.View`
    flex-direction: column;
    margin-top: 20px;
    padding-left: 16px;
`;

const InfoTile = styled.Text`
    font-size: 17px;
    font-weight: 600;
    color: #000;
    margin-bottom: 10;
`;
const InfoBody = styled.Text`
    font-size: 15px;
    color: #000;
`;

const ContainerComents = styled.View`
    margin-top: 20px;
    border-color: #5E6064;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 16px;
    border-width: 0.3px;
`;

const TextComents = styled.Text`
    font-size: 20px;
    font-weight: 600;
    color: #000;
`;

const ContainerComentUser = styled.View`
    width: 100%;
    height: 10%;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 20;
    flex-direction: row;
    `;

const IconContainer = styled.View`
    position: absolute;
    left: 7%;
    z-index: 2;
`;

const ComentUser = styled.TextInput`
    width: 90%;
    height: 100%;
    background-color: #EFF1F5;
    border-radius: 8px;
    padding-left: 40px;
    z-index: 1;
`;

type DetailPostScreenRouteProp = RouteProp<StackParamList, 'DetailPost'>;

type Props = {
    route: DetailPostScreenRouteProp;
};

type Post = {
    id: number;
    title: string;
    body: string;
};

const DetailPost = ({ route }: Props) => {
    const navigation = useNavigation();
    const { favorites, toggleFavorite } = useFavorites();
    const [posts, setPosts] = useState<Post[]>([]);
    const { userId, userName, profileImageUrl, title, body } = route.params;
    const isStarred = favorites.some((fav) => fav.id == userId);


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Publicação',
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

    const handleStarPress = (item: Post) => {
        toggleFavorite(item);
    };

    return (
        <SafeArea>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Container>
                        <ContainerProfile>
                            <ProfileImage source={{ uri: String(profileImageUrl) }} />
                            <ContaineeInfoProfile>
                                <NameUser>{userName}</NameUser>
                                <User>@userName</User>
                            </ContaineeInfoProfile>
                        </ContainerProfile>
                        <IconPlus
                            name={isStarred ? 'star' : 'star-o'}
                            size={27}
                            color={isStarred ? '#FFD700' : '#000'}
                            style={{
                                position: 'absolute',
                                top: 15,
                                right: 20,
                            }}
                        // onPress={}
                        />
                        <ContainerInfo>
                            <InfoTile>{title}</InfoTile>
                            <InfoBody>{body}</InfoBody>
                        </ContainerInfo>

                        <ContainerComents>
                            <TextComents>Comentários</TextComents>
                        </ContainerComents>

                        <ContainerComentUser>
                            <IconContainer>
                                <IconComent
                                    name="comment-text-outline"
                                    size={20}
                                    color="#333"
                                />
                            </IconContainer>
                            <ComentUser placeholder='Adicione um comentário' placeholderTextColor={"#000"}>
                            </ComentUser>
                        </ContainerComentUser>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeArea>
    )
}

export default DetailPost