import {Platform, StyleSheet} from 'react-native';
import {font, hp, spacing, wp} from '../../styles/GlobalSizes';
import {colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    padding: Platform.OS === 'web' ? spacing.lg : spacing.base,
    minWidth: Platform.OS === 'web' ? '50%' : '100%',
    alignSelf: 'center',
    ...(Platform.OS === 'web' && {
      backgroundColor: colors.white,
      borderRadius: 10,
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    }),
    marginVertical: Platform.OS === 'web' ? hp(2) : 0,
    flex: 1,
  },
  title: {
    color: colors.blue,
    fontSize: font.size.lg as number,
    fontFamily: font.family.Poppins_bold,
  },
  shadowProps: {
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addTaskView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.gray,
    marginVertical: spacing.base,
    borderRadius: 100,
  },
  txtInput: {
    margin: spacing.base,
    color: colors.blue,
    flex: 1,
    fontFamily: font.family.Poppins_medium,
    padding : 0
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: colors.orange100,
    paddingHorizontal: spacing.lg,
    borderRadius: 100,
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: font.size.base as number,
    fontFamily: font.family.Poppins_bold,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: colors.loader,
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1),
    paddingHorizontal: spacing.md,
  },
  radioButton: {
    height: Platform.OS === 'web' ? wp(1.5) : wp(6),
    width: Platform.OS === 'web' ? wp(1.5) : wp(6),
    borderRadius: wp(3),
    borderWidth: 2,
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.base,
  },
  radioButtonSelected: {
    backgroundColor: colors.orange,
  },
  titleContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: font.size.base as number,
    color: colors.black,
    fontFamily: font.family.Poppins_medium,
  },
  editDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.base,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: 'grey',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageSize: {
    height: Platform.OS === 'web' ? wp(1) : wp(5),
    width: Platform.OS === 'web' ? wp(1.5) : wp(5),
  },
  smallImage: {
    height: Platform.OS === 'web' ? wp(1) : wp(4),
    width: Platform.OS === 'web' ? wp(1.5) : wp(4),
  },
  whiteTick: {
    height: Platform.OS === 'web' ? wp(1) : wp(4),
    width: Platform.OS === 'web' ? wp(1) : wp(4),
  },
  logoutImage: {
    height: Platform.OS === 'web' ? wp(1.5) : wp(7),
    width: Platform.OS === 'web' ? wp(1.5) : wp(7),
  },
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noDataText: {
    fontSize: font.size.lg,
    fontFamily: font.family.Poppins_medium,
    color: colors.gray300,
  },
});
export const dynamicStyle = {
  dynamicOpacity: (task: string) => ({
    opacity: !task ? 0.7 : 1,
  }),
};

export default styles;
