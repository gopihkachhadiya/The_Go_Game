import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {font, spacing, wp} from '../../../styles/GlobalSizes';
import {colors} from '../../../constants/Colors';
import {CustomButtonProps} from '../../../@types/customComponents';

const CustomButton: React.FC<CustomButtonProps> = props => {
  return (
    <TouchableOpacity
      style={styles.loginButton}
      onPress={() => props.onPress()}>
      {props.loader ? (
        <ActivityIndicator size={'small'} color={colors.white} />
      ) : (
        <Text style={styles.whiteBoldTxt}>{props.label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  loginButton: {
    width: Platform.OS === 'web' ? wp(20) : wp(80),
    backgroundColor: colors.orange200,
    padding: spacing.semiSmall,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.small,
    marginTop: spacing.md,
  },
  whiteBoldTxt: {
    color: colors.white,
    fontSize: font.size.base,
    fontFamily: font.family.Poppins_bold,
  },
});
