import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import ChangePasswordModal from '../ChangePasswordModal';

// Mock the Alert.alert
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

// Mock the useAuth hook
const mockChangePassword = jest.fn();
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    changePassword: mockChangePassword,
  }),
}));

// Mock the FormInput and FormButton components
jest.mock('../FormInput', () => {
  return function MockFormInput({ placeholder, value, onChangeText, secureTextEntry }) {
    const React = require('react');
    const { TextInput } = require('react-native');
    return (
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        testID={placeholder}
      />
    );
  };
});

jest.mock('../FormButton', () => {
  return function MockFormButton({ title, onPress, loading, style }) {
    const React = require('react');
    const { TouchableOpacity, Text, ActivityIndicator } = require('react-native');
    return (
      <TouchableOpacity onPress={onPress} disabled={loading} style={style}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text>{title}</Text>
        )}
      </TouchableOpacity>
    );
  };
});

describe('ChangePasswordModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <ChangePasswordModal visible={true} onClose={mockOnClose} />
    );

    expect(getByTestId('modal-title')).toBeTruthy();
    expect(getByPlaceholderText('Current Password')).toBeTruthy();
    expect(getByPlaceholderText('New Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm New Password')).toBeTruthy();
    expect(getByText('Password must be at least 6 characters long')).toBeTruthy();
    expect(getByTestId('cancel-button')).toBeTruthy();
    expect(getByTestId('change-password-button')).toBeTruthy();
  });

  it('shows error when fields are empty', async () => {
    const { getByTestId } = render(
      <ChangePasswordModal visible={true} onClose={mockOnClose} />
    );

    fireEvent.press(getByTestId('change-password-button'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please fill in all fields.');
    });
  });

  it('shows error when new password is too short', async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <ChangePasswordModal visible={true} onClose={mockOnClose} />
    );

    fireEvent.changeText(getByPlaceholderText('Current Password'), 'oldpass');
    fireEvent.changeText(getByPlaceholderText('New Password'), '123');
    fireEvent.changeText(getByPlaceholderText('Confirm New Password'), '123');

    fireEvent.press(getByTestId('change-password-button'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'New password must be at least 6 characters long.');
    });
  });

  it('shows error when passwords do not match', async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <ChangePasswordModal visible={true} onClose={mockOnClose} />
    );

    fireEvent.changeText(getByPlaceholderText('Current Password'), 'oldpass');
    fireEvent.changeText(getByPlaceholderText('New Password'), 'newpass123');
    fireEvent.changeText(getByPlaceholderText('Confirm New Password'), 'different123');

    fireEvent.press(getByTestId('change-password-button'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'New passwords do not match.');
    });
  });

  it('shows error when new password is same as current', async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <ChangePasswordModal visible={true} onClose={mockOnClose} />
    );

    fireEvent.changeText(getByPlaceholderText('Current Password'), 'samepass');
    fireEvent.changeText(getByPlaceholderText('New Password'), 'samepass');
    fireEvent.changeText(getByPlaceholderText('Confirm New Password'), 'samepass');

    fireEvent.press(getByTestId('change-password-button'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'New password must be different from current password.');
    });
  });

  it('calls changePassword when validation passes', async () => {
    mockChangePassword.mockResolvedValue({ success: true, message: 'Password changed successfully!' });

    const { getByTestId, getByPlaceholderText } = render(
      <ChangePasswordModal visible={true} onClose={mockOnClose} />
    );

    fireEvent.changeText(getByPlaceholderText('Current Password'), 'oldpass');
    fireEvent.changeText(getByPlaceholderText('New Password'), 'newpass123');
    fireEvent.changeText(getByPlaceholderText('Confirm New Password'), 'newpass123');

    fireEvent.press(getByTestId('change-password-button'));

    await waitFor(() => {
      expect(mockChangePassword).toHaveBeenCalledWith('oldpass', 'newpass123');
    });
  });

  it('closes modal and resets form on successful password change', async () => {
    mockChangePassword.mockResolvedValue({ success: true, message: 'Password changed successfully!' });

    const { getByTestId, getByPlaceholderText } = render(
      <ChangePasswordModal visible={true} onClose={mockOnClose} />
    );

    fireEvent.changeText(getByPlaceholderText('Current Password'), 'oldpass');
    fireEvent.changeText(getByPlaceholderText('New Password'), 'newpass123');
    fireEvent.changeText(getByPlaceholderText('Confirm New Password'), 'newpass123');

    fireEvent.press(getByTestId('change-password-button'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'Password changed successfully!', expect.any(Array));
    });

    // Simulate pressing OK on success alert
    const okButton = Alert.alert.mock.calls[0][2][0];
    okButton.onPress();

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('shows error message from changePassword function', async () => {
    mockChangePassword.mockResolvedValue({ success: false, message: 'Current password is incorrect.' });

    const { getByTestId, getByPlaceholderText } = render(
      <ChangePasswordModal visible={true} onClose={mockOnClose} />
    );

    fireEvent.changeText(getByPlaceholderText('Current Password'), 'wrongpass');
    fireEvent.changeText(getByPlaceholderText('New Password'), 'newpass123');
    fireEvent.changeText(getByPlaceholderText('Confirm New Password'), 'newpass123');

    fireEvent.press(getByTestId('change-password-button'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Current password is incorrect.');
    });
  });
});
