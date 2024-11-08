import React from 'react';
import styled from 'styled-components/native';
import IconPlus from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../App';
import { TouchableOpacity } from 'react-native';

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

interface PostCardProps {
  item: Post;
  isStarred: boolean;
  onStarPress: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ item, isStarred, onStarPress }) => {
  const navigation = useNavigation<StackNavigationProp<StackParamList, 'Profile'>>();
  const profileImageUrl = `https://ui-avatars.com/api/?name=nemo+tody`;

  const handleProfileClick = () => {
    navigation.navigate('Profile', {
      userId: item.id,
      userName: 'Nemo',
      profileImageUrl
    });
  };

  const handleDetailPostClick = () => {
    navigation.navigate('DetailPost', {
      userId: item.id,
      userName: 'Nemo',
      profileImageUrl,
      title: item.title,
      body: item.body
    });
  };

  return (
    <TouchableOpacity onPress={() => handleDetailPostClick()}>
      <Card key={item.id}>
        <InfoProfileContainer>
          <TouchableOpacity onPress={handleProfileClick}>
            <ProfileImage source={{ uri: profileImageUrl }} />
          </TouchableOpacity>
          <InfoPersonContainer>
            <Name>Nemo</Name>
            <Name>@NemoTody</Name>
          </InfoPersonContainer>
          <IconPlus
            name={isStarred ? 'star' : 'star-o'}
            size={27}
            color={isStarred ? '#FFD700' : '#000'}
            style={{
              position: 'absolute',
              right: 5,
            }}
            onPress={onStarPress}
          />
        </InfoProfileContainer>
        <Title>{item.title}</Title>
        <Body>{item.body}</Body>
      </Card>
    </TouchableOpacity>

  );
};

export default PostCard;
