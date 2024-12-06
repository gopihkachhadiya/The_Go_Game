import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Modal, Text, View, StyleSheet, Animated, Platform } from 'react-native';
import { font, hp, spacing, wp } from '../styles/GlobalSizes';
import { colors } from '../constants/Colors';
import { CustomToastRef } from '../@types/customComponents';

const CustomToast = forwardRef<CustomToastRef>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const translateY = useRef(new Animated.Value(100)).current;
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'default'>('success');

  // Expose methods to parent via `ref`
  useImperativeHandle(ref, () => ({
    showToast: (toastMessage: string, toastType = 'success', duration = 3000) => {
      setMessage(toastMessage);
      setType(toastType);
      setVisible(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => hideToast(), duration);
      });
    },
  }));

  const hideToast = () => {
    Animated.timing(translateY, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  const getBackgroundColor = (): string => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      default:
        return colors.gray200;
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.toastContainer,
            { transform: [{ translateY }], borderLeftColor: getBackgroundColor() },
          ]}
        >
          <View>
            <Text style={styles.typeText}>{type}</Text>
            <Text style={styles.toastText}>{message}</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.transparent,
  },
  toastContainer: {
    position: 'absolute',
    // top: hp(5),
    left: Platform.OS === 'web' ? wp(30) : wp(5),
    right: Platform.OS === 'web' ? wp(30) : wp(5),
    bottom : hp(5),
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.base,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: colors.white,
    borderLeftWidth: 5,
    shadowColor: colors.black,
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  typeText: {
    color: colors.black,
    fontSize: font.size.base,
    fontFamily: font.family.Poppins_medium,
  },
  toastText: {
    color: colors.gray200,
    fontSize: font.size.small,
    fontFamily: font.family.Poppins_medium,
  },
});

export default CustomToast;
