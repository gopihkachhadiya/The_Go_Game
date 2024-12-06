import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../constants/Colors';
import {font, spacing} from '../styles/GlobalSizes';
import {CustomAlertProps} from '../@types/customComponents';

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.alertContainer}>
        <Text style={styles.alertMessage}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    width: 250,
  },
  alertMessage: {
    fontSize: font.size.base,
    marginBottom: spacing.md,
    textAlign: 'center',
    fontFamily: font.family.Poppins_medium,
  },
  buttonContainer: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: colors.orange,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.lg,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: colors.dark_gray,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.lg,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: font.size.base,
    fontFamily: font.family.Poppins_medium,
  },
});

export default CustomAlert;
