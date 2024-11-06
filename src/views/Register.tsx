import React from 'react';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Register: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
    navigation: RegisterScreenNavigationProp;
}

const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
`;

const InputContainer = styled.View`
  width: 90%;
  margin-bottom: 16px;
  margin-top: 25px;
`;

const TitleInput = styled.Text`
  font-family: 'NunitoSansRegular';
  align-self: flex-start;
  font-size: 17px;
  font-weight: 400;
  color: #1C1F24;
  margin-bottom: 5px;
`;

const Input = styled.TextInput`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: #EFF1F5;
`;

const Button = styled.TouchableOpacity`
  background-color: #0F90D9;
  padding: 15px 30px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

const ButtonText = styled.Text`
  font-family: 'NunitoSansBold';
  font-size: 18px;
  font-weight: 700;
  color: #fff;
`;

const Register = ({ navigation }: Props) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Criar nova conta',
            headerStyle: {
                borderBottomWidth: 0.2,
                shadowOpacity: 0,
                elevation: 0,
            },
        });
    }, [navigation]);

    return (
        <Container>
            <InputContainer>
                <TitleInput>Nome de Usuário</TitleInput>
                <Input placeholder='Nome de Usuário'></Input>
                <TitleInput>E-mail</TitleInput>
                <Input placeholder='Endereço de e-mail'></Input>
                <TitleInput>Senha</TitleInput>
                <Input placeholder='Senha'></Input>
            </InputContainer>
            <Button>
                <ButtonText>Criar conta</ButtonText>
            </Button>
        </Container>
    );
};

export default Register;