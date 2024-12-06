import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../constants/Colors';
import {font, spacing, wp} from '../../styles/GlobalSizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
  },
  heading: {
    alignItems: 'center',
  },
  blackBoldTxt: {
    alignSelf: 'center',
    fontSize: font.size.lg,
    color: colors.black,
    marginVertical: spacing.base,
    fontFamily: font.family.Poppins_bold,
  },
  subContainer: {
    width: Platform.OS === 'web' ? wp(20) : wp(80),
    alignSelf: 'center',
  },

  bottomTxtView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  blackLightTxt: {
    color: colors.black,
    fontSize: font.size.mini,
    fontFamily: font.family.Poppins_regular,
  },
  blackRegularTxt: {
    color: colors.black,
    textDecorationLine: 'underline',
    fontFamily: font.family.Poppins_bold,
    fontSize: font.size.mini as number,
  },
  errorText: {
    color: 'red',
    fontSize: font.size.mini as number,
    fontFamily: font.family.Poppins_regular,
  },
});

export default styles;
