import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constants/Colors';
import {
  AddListAPI,
  DeleteListAPI,
  getListAPI,
  UpdateListAPI,
} from '../../sevices/useList';
import {callLogOutApi} from '../../sevices/Authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {getId} from '../../utils/session';
import styles, {dynamicStyle} from './styles';
import {RootStackParamList} from '../../@types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LOGOUT from '../../../assets/Images/logout.png';
import REFRESH from '../../../assets/Images/refresh.png';
import {Task} from '../../@types/toDo';
import CustomToast from '../../components/CustomToast';
import axios from 'axios';
import RenderTask from './components/RenderTask';
import CustomAlert from '../../components/CustomAlert';
import { CustomToastRef } from '../../@types/customComponents';

const ToDoList: React.FC = () => {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;
  const navigation = useNavigation<NavigationProps>();
  const inputRef = useRef<Record<number, TextInput | null>>({});
  const toastRef = useRef<CustomToastRef>(null);

  const [task, setTask] = useState<string>('');
  const [loader, setLoader] = useState<{
    add: boolean;
    delete: boolean;
    update: boolean;
    get: boolean;
  }>({
    add: false,
    delete: false,
    update: false,
    get: false,
  });

  const [data, setData] = useState<Task[]>([]);
  const [showLogoutAlert, setShowLogoutAlert] = useState<boolean>(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const [editedTask, setEditedTask] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show error Toast
  const showErrorToast = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      toastRef.current?.showToast(
        error.response?.data?.message || 'Something went wrong',
        'error',
      );
    } else {
      toastRef.current?.showToast('Something went wrong', 'error');
    }
  };

  // Fetch Task List and filter such that completed task display at top
  const fetchTasks = async () => {
    setLoader(prevErrors => ({...prevErrors, get: true}));
    try {
      const response: Task[] = await getListAPI();
      setData(response);
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoader(prevErrors => ({...prevErrors, get: false}));
    }
  };

  // Add new Task
  const addTask = async () => {
    const userId = await getId();
    if (!task.trim()) {
      return;
    }
    setLoader(prevErrors => ({...prevErrors, add: true}));
    const newTask = {
      userId: userId,
      title: task,
      isCompleted: false,
    };
    try {
      await AddListAPI(newTask);
      toastRef.current?.showToast('Task added successfully.', 'success');
      setTask('');
      await fetchTasks();
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoader(prevErrors => ({...prevErrors, add: false}));
    }
  };

  // Delete Task
  const deleteTask = async () => {
    if (taskToDelete === null) {
      return;
    }
    setLoader(prevErrors => ({...prevErrors, delete: true}));
    try {
      const response = await DeleteListAPI(taskToDelete);
      toastRef.current?.showToast(response?.message, 'success');
      await fetchTasks();
      setShowDeleteAlert(false);
      setTaskToDelete(null);
    } catch (error) {
      showErrorToast(error);
      setShowDeleteAlert(false);
    } finally {
      setLoader(prevErrors => ({...prevErrors, delete: false}));
      setTaskToDelete(null);
    }
  };

  const handleLogout = async () => {
    try {
      await callLogOutApi();
      const keys = ['id', 'token'];
      await AsyncStorage.multiRemove(keys);
      setShowLogoutAlert(false);
      navigation.replace('Login');
    } catch (error: any) {
      showErrorToast(error);
      setShowLogoutAlert(false);
    }
  };

  const toggleSelection = async (item: Task, type: string) => {
    setLoader(prevErrors => ({...prevErrors, update: true}));
    const updatedTask = {
      title: type === 'update' ? editedTask : item.title,
      isCompleted: type === 'update' ? item?.isCompleted : !item.isCompleted,
    };
    try {
      const response = await UpdateListAPI(item?.id, updatedTask);
      if (type === 'update') {
        toastRef.current?.showToast(response?.message, 'success');
      }
      console.log('Success 1');
      setEditingTaskId(null);
      await fetchTasks();
    } catch (error) {
      showErrorToast(error);
      setLoader(prevErrors => ({...prevErrors, update: false}));
    } finally {
      setLoader(prevErrors => ({...prevErrors, update: false}));
    }
  };

  const handleEditTask = (item: Task) => {
    setEditingTaskId(item.id);
    setEditedTask(item.title);
    setTimeout(() => {
      inputRef.current[item.id]?.focus();
    }, 100);
  };

  const renderTask = ({item}: {item: Task}) => {
    const isSelected = item?.isCompleted;
    const isEditing = editingTaskId === item.id;

    return (
      <RenderTask
        item={item}
        isEditing={isEditing}
        isSelected={isSelected}
        loader={loader}
        editedTask={editedTask}
        taskToDelete={taskToDelete}
        toggleSelection={toggleSelection}
        setEditingTaskId={setEditingTaskId}
        handleEditTask={handleEditTask}
        setEditedTask={setEditedTask}
        setTaskToDelete={setTaskToDelete}
        setShowDeleteAlert={setShowDeleteAlert}
        inputRefs={inputRef}
      />
    );
  };

  const emptyItem = () => {
    return (
      <View style={styles.noDataView}>
        <Text style={styles.noDataText}>No Data Found</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>To-Do List</Text>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => fetchTasks()}>
              <Image
                source={REFRESH}
                style={styles.logoutImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowLogoutAlert(true)}>
              <Image
                source={LOGOUT}
                style={styles.logoutImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.addTaskView}>
          <TextInput
            value={task}
            onChangeText={text => {
              setTask(text);
              if (text.length > 0) {
                setTaskToDelete(null);
                setEditingTaskId(null);
              }
            }}
            placeholder="Add your task"
            style={[styles.txtInput, {outline: 'none'} as any]}
          />
          <TouchableOpacity
            style={[styles.addButton, dynamicStyle.dynamicOpacity(task)]}
            onPress={addTask}
            disabled={!task}>
            {loader.add ? (
              <ActivityIndicator size={'small'} color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>ADD</Text>
            )}
          </TouchableOpacity>
        </View>

        {data.length >= 0 ? (
          <FlatList
            data={data}
            renderItem={renderTask}
            ListEmptyComponent={emptyItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.container}
          />
        ) : (
          <ActivityIndicator
            size={'large'}
            color={colors.orange}
            style={styles.loader}
          />
        )}
        <CustomAlert
          visible={showLogoutAlert}
          message="Are you sure you want to logout?"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutAlert(false)}
        />
        <CustomAlert
          visible={showDeleteAlert}
          message="Are you sure you want to delete this task?"
          onConfirm={deleteTask}
          onCancel={() => {
            setShowDeleteAlert(false);
            setTaskToDelete(null);
          }}
        />
        <CustomToast ref={toastRef} />
      </View>
    </SafeAreaView>
  );
};
export default ToDoList;
