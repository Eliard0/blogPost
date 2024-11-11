import React from 'react';
import styled from 'styled-components/native';
import IconPlus from 'react-native-vector-icons/FontAwesome';
import IconComent from 'react-native-vector-icons/MaterialCommunityIcons';

import { StackParamList } from '../App';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useDetailPostViewModel } from '../ViewModel/DetailViewModel';

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

const ContainerTitleComents = styled.View`
    margin-top: 20px;
    border-color: #5E6064;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 16px;
    border-width: 0.3px;
`;

const TitleComents = styled.Text`
    font-size: 20px;
    font-weight: 600;
    color: #000;
`;

const ContainerComentUser = styled.View`
    width: 100%;
    height: 50px;
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

const ContainerProfileComent = styled.View`
flex-direction: row;
margin-top: 10px;
margin-left: 10px;
padding-left: 16px;
`;

const ProfileImageComent = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 30px;
  margin-right: 10px;
`;

const ContaineeInfoProfileComent = styled.View`
  flex-direction: column;
  padding-top: 3px;
`;

const TextComent = styled.Text`
font-size: 16px;
    color: #000;
`;

const ComentUser = styled.TextInput<{ keyboardActive: boolean }>`
    width: ${(props) => (props.keyboardActive ? '80%' : '90%')};
    height: 100%;
    background-color: #EFF1F5;
    border-radius: 8px;
    padding-left: ${(props) => (props.keyboardActive ? '5%' : '12%')};
    z-index: 1;
`;

const SendButton = styled.TouchableOpacity`
  background-color: #0F90D9;
  width: 50px;
  height: 50px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const DetailPost = ({ route }: { route: RouteProp<StackParamList, 'DetailPost'> }) => {
  const navigation = useNavigation();
  const { userId, userName, profileImageUrl, title, body } = route.params;
  const {
    comments,
    commentText,
    setCommentText,
    isStarred,
    toggleFavorite,
    isKeyboardVisible,
    handleAddComment,
  } = useDetailPostViewModel(userId);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Publicação',
      headerTitleAlign: 'left',
      headerLeft: () => (
        <Icon
          name="arrowleft"
          size={20}
          color="#333"
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 20, marginRight:10 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeArea>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 10}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Container>
            <ContainerProfile>
              <ProfileImage source={{ uri: profileImageUrl }} />
              <ContaineeInfoProfile>
                <NameUser>{userName}</NameUser>
                <User>@{userName}</User>
              </ContaineeInfoProfile>
            </ContainerProfile>
            <IconPlus
              name={isStarred ? 'star' : 'star-o'}
              size={27}
              color={isStarred ? '#FFD700' : '#000'}
              onPress={() => toggleFavorite({ id: userId, title, body })}
              style={{ position: 'absolute', top: 15, right: 20 }}
            />
            <ContainerInfo>
              <InfoTile>{title}</InfoTile>
              <InfoBody>{body}</InfoBody>
            </ContainerInfo>

            <ContainerTitleComents>
              <TitleComents>Comentários</TitleComents>
            </ContainerTitleComents>

            {comments.map((comment) => (
              <ContainerProfileComent key={comment.id}>
                <ProfileImageComent source={{ uri: comment.profileImageUrl }} />
                <ContaineeInfoProfileComent>
                  <NameUser>{comment.userName}</NameUser>
                  <TextComent>{comment.text}</TextComent>
                </ContaineeInfoProfileComent>
              </ContainerProfileComent>
            ))}

            <ContainerComentUser>
              <IconContainer>
                {!isKeyboardVisible && <IconComent name="comment-text-outline" size={20} color="#333" />}
              </IconContainer>
              <ComentUser
                placeholder="Adicione um comentário"
                keyboardActive={isKeyboardVisible}
                value={commentText}
                onChangeText={setCommentText}
                onSubmitEditing={handleAddComment}
              />
              {isKeyboardVisible && (
                <SendButton onPress={handleAddComment}>
                  <Icon name="arrowright" size={15} color="#fff" />
                </SendButton>
              )}
            </ContainerComentUser>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

export default DetailPost;