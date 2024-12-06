import {Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import CustomButton from './components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../@types/navigation';
import {callRegisterApi} from '../../sevices/Authentication';
import {setId, setToken} from '../../utils/session';
import CustomTextInput from './components/CustomTextInput';
import LogoView from './components/LogoView';
import CustomToast from '../../components/CustomToast';
import styles from './styles';
import { CustomToastRef } from '../../@types/customComponents';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const SignUp: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    userName: string;
    password: string;
    confirmPassword: string;
  }>({
    userName: '',
    password: '',
    confirmPassword: '',
  });
  const toastRef = useRef<CustomToastRef>(null);

  const navigation = useNavigation<NavigationProps>();

  const handelCreateAcc = () => {
    setLoader(true);
    const body = {
      username: userName,
      password: password,
    };
    callRegisterApi(body)
      .then(res => {
        setId(res?.userId);
        setToken(res?.token);
        navigation.navigate('ToDoList');
      })
      .catch(err => {
        toastRef.current?.showToast(
          err?.response?.data?.message || 'Something went wrong',
          'error',
        );
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const validation = () => {
    setLoader(true);
    let valid = true;
    let newErrors = {userName: '', password: '', confirmPassword: ''};

    if (userName === '') {
      newErrors.userName = 'User name is required';
      valid = false;
    }

    if (password === '') {
      newErrors.password = 'Password is required';
      valid = false;
    }

    if (confirmPassword === '') {
      newErrors.confirmPassword = 'Confirm password is required';
      valid = false;
    }

    if (password !== confirmPassword) {
      console.log('check');
      newErrors.confirmPassword = 'Password and confirm password are not match';
      valid = false;
    }

    setErrors(newErrors);
    if (valid) {
      handelCreateAcc();
    } else {
      setLoader(false);
    }
  };
  const handelSignUp = () => {
    navigation.navigate('Login');
  };

  const onChangeName = (text: string) => {
    setUserName(text);
    if (errors.userName) {
      setErrors(prevErrors => ({...prevErrors, userName: ''}));
    }
  };
  const onChangePassword = (text: string) => {
    setPassword(text);
    if (errors.password) {
      setErrors(prevErrors => ({...prevErrors, password: ''}));
    }
  };

  const onChangeConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    if (errors.confirmPassword) {
      setErrors(prevErrors => ({...prevErrors, confirmPassword: ''}));
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        style={styles.scroll}>
        <LogoView />
        <View style={styles.heading}>
          <Text style={styles.blackBoldTxt}>Welcome to the Go Game</Text>
        </View>
        <View style={styles.subContainer}>
          <CustomTextInput
            error={errors.userName}
            value={userName}
            placeholder="User Name"
            onChangeText={onChangeName}
            isPassword={false}
          />
          <CustomTextInput
            error={errors.password}
            value={password}
            placeholder="Password"
            onChangeText={onChangePassword}
            isPassword={true}
          />
          <CustomTextInput
            error={errors.confirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            onChangeText={onChangeConfirmPassword}
            isPassword={true}
          />
          <CustomButton label={'CREATE ACCOUNT'} onPress={() => validation()} loader={loader}/>
          <View style={styles.bottomTxtView}>
            <Text style={styles.blackLightTxt}>
              You already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => handelSignUp()}>
              <Text style={styles.blackRegularTxt}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomToast ref={toastRef} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUp;
