import React, { useState } from 'react';

import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { StackParamList } from '../App';
import NavBar from '../components/NavBar';
import Icon from 'react-native-vector-icons/Feather';

type NewPostScreenNavigationProp = StackNavigationProp<StackParamList, 'NewPost'>;

type Props = {
    navigation: NewPostScreenNavigationProp;
};

const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
`;

const InputContainer = styled.View`
  width: 90%;
  margin-top: 16px;
`;

const Input = styled.TextInput`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #EFF1F5;
`;

const TitleInput = styled.Text`
  font-family: 'NunitoSansRegular';
  align-self: flex-start;
  font-size: 17px;
  color: #1C1F24;
  margin-bottom: 5px;
`;

const InputTexto = styled.TextInput`
  height: 60%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #EFF1F5;
  text-align-vertical: top; 
`;

const ButtonCreateNewPost = styled.TouchableOpacity`
  flex-direction: row;
  position: absolute;
  background-color: #0F90D9;
  padding: 15px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  width: 90%;
  bottom: 20px;
`;

const ButtonText = styled.Text`
  font-family: 'NunitoSansBold';
  font-size: 18px;
  color: #fff;
`;

const NewPost = ({ navigation }: Props) => {
    const navBar = useNavigation();

    const handleCloseSearch = () => {
        navigation.goBack();
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
            headerLeft: () => (
                <Icon
                    name="x"
                    size={25}
                    color="#333"
                    onPress={handleCloseSearch}
                    style={{ marginLeft: 20 }}
                />
            ),
            headerTitle: () => (
                <NavBar
                    title={"Nova Publicação"}
                    showIconSearch={false}
                />
            ),
        });
    }, [navigation]);

    return (
        <Container>
            <InputContainer>
                <TitleInput>Título da publicação</TitleInput>
                <Input placeholder='Adicione um título' />
                <TitleInput>Texto da publicação</TitleInput>
                <InputTexto placeholder='O que gostaria de compartilhar?' />
            </InputContainer>

            <ButtonCreateNewPost>
                <Icon
                    name="send"
                    size={15}
                    color="#fff"
                    style={{ marginRight: 10 }}
                />
                 <ButtonText>
                    Publicar
                </ButtonText>
            </ButtonCreateNewPost>
        </Container>
    );
};

export default NewPost;