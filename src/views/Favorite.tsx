import React, { useState } from 'react';

import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { StackParamList } from '../App';
import NavBar from '../components/NavBar';

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
`;

const TitleViewText = styled.Text`
  font-family: 'NunitoSansBold';
  font-size: 32px;
  font-weight: 700;
  color: #000;
  margin-top: 20%;
  margin-bottom: 10%;
`;

const Favorite = ({ navigation }: Props) => {
    const navBar = useNavigation();
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
    }, [navigation, searchVisible, searchQuery]);

    return (
        <Container>
            <TitleViewText>favoritos</TitleViewText>
        </Container>
    );
};

export default Favorite;