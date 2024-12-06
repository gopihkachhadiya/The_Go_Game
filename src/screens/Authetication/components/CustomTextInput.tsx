import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../constants/Colors';
import {font, hp, spacing, wp} from '../../../styles/GlobalSizes';
import SHOW_PASSWORD from '../../../../assets/Images/show.png';
import HIDE_PASSWORD from '../../../../assets/Images/hide.png';
import {CustomTextInputProps} from '../../../@types/customComponents';

const CustomTextInput: React.FC<CustomTextInputProps> = props => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  return (
    <>
      <View
        style={[
          styles.txtInputContainer,
          {borderColor: props.error && colors.red},
        ]}>
        <TextInput
          placeholder={props.placeholder}
          value={props?.value}
          onChangeText={props.onChangeText}
          style={[styles.txtInput, {outline: 'none'} as any]}
          placeholderTextColor={colors.dark_gray}
          secureTextEntry={props?.isPassword ? !isPasswordVisible : false}
        />
        {props?.isPassword ? (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Image
              source={isPasswordVisible ? SHOW_PASSWORD : HIDE_PASSWORD}
              style={styles.eyeImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {props?.error ? (
        <Text style={styles.errorText}>{props?.error}</Text>
      ) : null}
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  txtInputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? spacing.small : spacing.small,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.mini,
    marginTop: spacing.base,
  },
  txtInput: {
    flex: 1,
    padding: 0,
    fontFamily: font.family.Poppins_medium,
  },
  eyeImage: {
    height: hp(2),
    width: Platform.OS === 'web' ? wp(2) : wp(8),
  },

  errorText: {
    color: 'red',
    fontSize: font.size.mini as number,
    fontFamily: font.family.Poppins_regular,
  },
});
