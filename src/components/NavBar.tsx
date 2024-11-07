import React, { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

const NavBarContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const TitleNavBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-horizontal: 10px;
`;

const TitleNavBar = styled.Text`
  font-family: 'NunitoSansBold';
  color: #000;
  font-size: 24px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const SearchInput = styled.TextInput`
  width: 80%;
  height: 45px;
  border-width: 1px;
  border-radius: 8px;
  border-color: #EFF1F5;
  font-size: 16px;
  background-color: #EFF1F5;
`;

const ButtonHideInputSearch = styled.TouchableOpacity`
  width: 20%;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

const ButtonTextHideInputSearch = styled.Text`
  font-family: 'NunitoSansBold';
  font-size: 18px;
  color: #0F90D9;
`;

type Props = {
    title: String;
    searchVisible: boolean;
    searchQuery: string;
    setSearchVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const NavBar: React.FC<Props> = ({
    title,
    searchVisible,
    searchQuery,
    setSearchVisible,
    setSearchQuery,
}) => {
    return (
        <NavBarContainer>
            {searchVisible ? (
                <SearchContainer>
                    <SearchInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Buscar publicação"
                        autoFocus
                        onBlur={() => setSearchVisible(false)}
                    />
                    <ButtonHideInputSearch onPress={() => setSearchVisible(false)}>
                        <ButtonTextHideInputSearch>Cancelar</ButtonTextHideInputSearch>
                    </ButtonHideInputSearch>
                </SearchContainer>
            ) : (
                <TitleNavBarContainer>
                    <TitleNavBar>{title}</TitleNavBar>
                    <Icon
                        name="search"
                        size={25}
                        color="#333"
                        onPress={() => setSearchVisible(true)}
                    />
                </TitleNavBarContainer>
            )}
        </NavBarContainer>
    );
};

export default NavBar;
