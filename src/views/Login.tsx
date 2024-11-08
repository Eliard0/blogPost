import React, { useEffect } from 'react';

import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackParamList } from '../App';

type LoginScreenNavigationProp = StackNavigationProp<StackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
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

const InputContainer = styled.View`
  width: 90%;
  margin-bottom: 16px;
`;

const TitleInput = styled.Text`
  font-family: 'NunitoSansRegular';
  align-self: flex-start;
  font-size: 17px;
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
  color: #fff;
`;

const TextRegister = styled.Text`
  font-family: 'NunitoSansBold';
  font-size: 16px;
  margin-top: 23px;
  color: #0F90D9;
`;

const Login = ({ navigation }: Props) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, [navigation]);

      useEffect(() => {
        const checkUserLoggedIn = async () => {
          try {
            const user = await AsyncStorage.getItem('user');
            if (user) {
              navigation.replace('Home');
            }
          } catch (error) {
            console.log('Erro ao verificar usuário no AsyncStorage:', error);
          }
        };
    
        checkUserLoggedIn();
      }, [navigation]);
    return (
      <Container>
        <TitleViewText>LOGIN</TitleViewText>
        <InputContainer>
          <TitleInput>E-mail</TitleInput>
          <Input placeholder='Endereço de e-mail' />
          <TitleInput>Senha</TitleInput>
          <Input placeholder='Senha' secureTextEntry={true}/>
        </InputContainer>
        <Button>
          <ButtonText>Entrar</ButtonText>
        </Button>
        <TextRegister onPress={() => navigation.navigate('Register')}>Criar nova conta</TextRegister>
      </Container>
    );
  };
  
  export default Login;