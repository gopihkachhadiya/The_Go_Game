import React from 'react';
import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import CHECK_MARK from '../../../../assets/Images/checkmark.png';
import CLOSE from '../../../../assets/Images/close.png';
import EDIT from '../../../../assets/Images/edit.png';
import DELETE from '../../../../assets/Images/delete.png';
import styles from '../styles';
import {colors} from '../../../constants/Colors';
import {RenderTaskProps} from '../../../@types/toDo';

const RenderTask: React.FC<RenderTaskProps> = ({
  item,
  isEditing,
  isSelected,
  loader,
  editedTask,
  taskToDelete,
  toggleSelection,
  setEditingTaskId,
  handleEditTask,
  setEditedTask,
  setTaskToDelete,
  setShowDeleteAlert,
  inputRefs,
}) => {
  return (
    <View style={styles.taskItem}>
      {/* Radio Button */}
      <TouchableOpacity
        style={[styles.radioButton, isSelected && styles.radioButtonSelected]}
        onPress={() => toggleSelection(item, 'completed')}
        disabled={isEditing}>
        {isSelected && (
          <Image
            source={CHECK_MARK}
            style={styles.smallImage}
            resizeMode="contain"
            tintColor={colors.white}
          />
        )}
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.titleContainer}>
        <TextInput
          ref={ref => {
            inputRefs.current[item.id] = ref;
          }}
          value={isEditing ? editedTask : item.title}
          onChangeText={setEditedTask}
          style={[
            styles.itemTitle,
            isSelected && styles.completedTitle,
            {outline: 'none'} as any,
          ]}
          editable={isEditing}
          autoFocus={isEditing}
        />
      </View>

      {/* Edit/Delete */}
      <View style={styles.editDelete}>
        {isEditing ? (
          <>
            {loader.update ? (
              <ActivityIndicator size="small" color={colors.success} />
            ) : (
              <TouchableOpacity onPress={() => toggleSelection(item, 'update')}>
                <Image
                  source={CHECK_MARK}
                  style={styles.imageSize}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setEditingTaskId(null)}>
              <Image
                source={CLOSE}
                style={styles.smallImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              disabled={item.isCompleted}
              onPress={() => handleEditTask(item)}>
              <Image
                source={EDIT}
                style={styles.imageSize}
                resizeMode="contain"
                tintColor={isSelected ? colors.dark_gray : colors.black}
              />
            </TouchableOpacity>
            {loader.delete && taskToDelete === item.id ? (
              <ActivityIndicator size="small" color={colors.red} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setTaskToDelete(item.id);
                  setShowDeleteAlert(true);
                }}>
                <Image
                  source={DELETE}
                  style={styles.imageSize}
                  resizeMode="contain"
                  tintColor={colors.light_red}
                />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default RenderTask;
