import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

const handleRegister = async () => {
    if (email === '' || password === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const userData = { email, password };

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Home'); 
    
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao tentar cadastrar o usuário.');
    }
  };


    return (
        <Container>
            <InputContainer>
                <TitleInput>Nome de Usuário</TitleInput>
                <Input placeholder='Nome de Usuário'></Input>
                <TitleInput>E-mail</TitleInput>
                <Input 
                    placeholder='Endereço de e-mail'
                    value={email}
                    onChangeText={setEmail}
                />

                <TitleInput>Senha</TitleInput>
                <Input 
                    placeholder='Senha'
                    value={password}
                    onChangeText={setPassword}
                />
            </InputContainer>
            <Button onPress={handleRegister}>
                <ButtonText>Criar conta</ButtonText>
            </Button>
        </Container>
    );
};

export default Register;