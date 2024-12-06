import {Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import CustomButton from './components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../@types/navigation';
import {callLoginApi} from '../../sevices/Authentication';
import {setId, setToken} from '../../utils/session';
import styles from './styles';
import CustomTextInput from './components/CustomTextInput';
import LogoView from './components/LogoView';
import CustomToast from '../../components/CustomToast';
import { CustomToastRef } from '../../@types/customComponents';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const Login: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProps>();
  const [errors, setErrors] = useState<{
    userName: string;
    password: string;
  }>({
    userName: '',
    password: '',
  });
  const toastRef = useRef<CustomToastRef>(null);

  const handelLogin = () => {
    setLoader(true);
    const body = {
      username: userName,
      password: password,
    };
    callLoginApi(body)
      .then(res => {
        setToken(res?.token);
        setId(res?.userId);
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
    let newErrors = {userName: '', password: ''};

    if (userName === '') {
      newErrors.userName = 'User name is required';
      valid = false;
    }

    if (password === '') {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    if (valid) {
      handelLogin();
    } else {
      setLoader(false);
    }
  };

  const handelSignIn = () => {
    navigation.navigate('SignUp');
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
          <CustomButton label={'LOGIN'} onPress={() => validation()} loader={loader} />
          <View style={styles.bottomTxtView}>
            <Text style={styles.blackLightTxt}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => handelSignIn()}>
              <Text style={styles.blackRegularTxt}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomToast ref={toastRef} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;
