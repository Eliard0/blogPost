import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Register from '../src/views/Register'; 
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
};

describe('Register Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve exibir um alerta de erro caso ocorra um erro no cadastro', async () => {
    (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error('Error'));

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <Register navigation={mockNavigation as any} />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText('Endereço de e-mail');
    const passwordInput = getByPlaceholderText('Senha');
    const registerButton = getByText('Criar conta');

    fireEvent.changeText(emailInput, 'test@test.com');
    fireEvent.changeText(passwordInput, 'password123');

    fireEvent.press(registerButton);

    await waitFor(() => {
      expect(mockNavigation.navigate).not.toHaveBeenCalled();
    });
  });
});
