import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import useNewPostViewModel from '../ViewModel/NewPostViewModel';
import { useNavigation } from '@react-navigation/native';

const Container = styled.SafeAreaView`
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
  color: #000;
`;

const TitleInput = styled.Text`
  font-family: 'NunitoSansRegular';
  align-self: flex-start;
  font-size: 17px;
  color: #1C1F24;
  margin-bottom: 5px;
`;

const InputTexto = styled.TextInput`
  width: 100%;
  height: 60%;
  font-size: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #EFF1F5;
  color: #000;
  text-align-vertical: top;
  text-align: left;
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

const NewPost = () => {
    const { title, setTitle, body, setBody, handlePostSubmit } = useNewPostViewModel();
    const navigation = useNavigation()

    const handleCreatePost = async () => {
        const success = await handlePostSubmit();
        if (success) {
            navigation.goBack();
        }
    };

    return (
        <Container>
            <InputContainer>
                <TitleInput>Título da publicação</TitleInput>
                <Input
                    placeholder="Adicione um título"
                    placeholderTextColor="#A9AEB7"
                    value={title}
                    onChangeText={setTitle}
                />
                <TitleInput>Texto da publicação</TitleInput>
                <InputTexto
                    placeholder="O que gostaria de compartilhar?"
                    multiline
                    placeholderTextColor="#A9AEB7"
                    value={body}
                    onChangeText={setBody}
                />
            </InputContainer>

            <ButtonCreateNewPost onPress={handleCreatePost}>
                <Icon name="send" size={15} color="#fff" style={{ marginRight: 10 }} />
                <ButtonText>Publicar</ButtonText>
            </ButtonCreateNewPost>
        </Container>
    );
};

export default NewPost;
