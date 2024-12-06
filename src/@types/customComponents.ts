export interface CustomAlertProps {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface CustomToastRef {
  showToast: (
    toastMessage: string,
    toastType?: 'success' | 'error' | 'warning',
    duration?: number,
  ) => void;
}

export interface CustomButtonProps {
  onPress: () => void;
  label: string;
  loader?: boolean;
}

export interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error: string;
  isPassword: boolean;
}
