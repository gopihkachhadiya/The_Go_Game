import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {hp, wp} from '../../styles/GlobalSizes';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {colors} from '../../constants/Colors';
import {RootStackParamList} from '../../@types/navigation';
import {getId} from '../../utils/session';
import Logo from '../../../assets/Images/Logo.png';

const Splash: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkUserId = async () => {
      const userId = await getId();
      setTimeout(() => {
        if (userId) {
          navigation.navigate('ToDoList');
        } else {
          navigation.navigate('Login');
        }
      }, 2000);
    };

    checkUserId();
  }, [navigation]);

  return (
    <View style={styles.mainView}>
      <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: hp(60),
    width: wp(60),
  },
});
