import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Full_Width, hp, spacing, wp} from '../../../styles/GlobalSizes';
import {colors} from '../../../constants/Colors';
import Logo from '../../../../assets/Images/Logo.png';

const LogoView: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

export default LogoView;

const styles = StyleSheet.create({
  container: {
    height: hp(35),
    width: Full_Width,
    borderBottomLeftRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.exMd,
    backgroundColor: colors.orange100,
  },
  logo: {
    height: hp(15),
    width: wp(25),
    borderRadius: 100,
  },
});
