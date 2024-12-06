export interface Task {
  id: any;
  title: string;
  isCompleted: boolean;
}

export interface RenderTaskProps {
  item: Task;
  isEditing: boolean;
  isSelected: boolean;
  loader: {
    delete: boolean;
    update: boolean;
  };
  editedTask: string;
  taskToDelete: number | null;
  toggleSelection: (item: Task, type: string) => void;
  setEditingTaskId: (id: number | null) => void;
  handleEditTask: (item: Task) => void;
  setEditedTask: (text: string) => void;
  setTaskToDelete: (id: number | null) => void;
  setShowDeleteAlert: (visible: boolean) => void;
  inputRefs: any;
}
