import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './kanban.module.css';
import { toast } from 'react-toastify';
import Board from '../components/Board/Board';
import { ContextState } from '../Context/ContextProvider';
import Editable from '../components/Editabled/Editable';

import { DragDropContext } from 'react-beautiful-dnd';
import Modal from '../components/Modal/Modal';

const KanbanPage = () => {
  const { user } = ContextState();
  const [boards, setBoards] = useState([]);
  const [tasksByBoard, setTasksByBoard] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null); // State for selected task
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    if (user && user?.token) {
      fetchBoardsAndTasks();
    }
  }, [user && user?.token]);

  const fetchBoardsAndTasks = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const boardsResponse = await axios.get('/api/boards', config);
      const tasksResponse = await axios.get('/api/tasks', config);

      const boardsData = boardsResponse.data.data;
      const tasksData = tasksResponse.data.data;

      const tasksByBoardId = boardsData.reduce((acc, board) => {
        acc[board._id] =
          tasksData.find((taskGroup) => taskGroup._id === board._id)?.tasks ||
          [];
        return acc;
      }, {});

      setBoards(boardsData);
      setTasksByBoard(tasksByBoardId);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error(error);
      setLoading(false);
    }
  };

  const addBoardHandler = async (name) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post('/api/boards', { name }, config);
      fetchBoardsAndTasks();
      toast.success(data.message);
    } catch (error) {
      toast.error('Failed to add board');
      console.error(error);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceBoardId = source.droppableId;
    const destinationBoardId = destination.droppableId;

    const sourceTasks = Array.from(tasksByBoard[sourceBoardId]);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceBoardId === destinationBoardId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setTasksByBoard((prev) => ({
        ...prev,
        [sourceBoardId]: sourceTasks,
      }));
    } else {
      const destinationTasks = Array.from(tasksByBoard[destinationBoardId]);
      destinationTasks.splice(destination.index, 0, movedTask);

      setTasksByBoard((prev) => ({
        ...prev,
        [sourceBoardId]: sourceTasks,
        [destinationBoardId]: destinationTasks,
      }));
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      await axios.patch(
        '/api/tasks/update-position',
        {
          taskId: draggableId,
          sourceBoardId,
          destinationBoardId,
          position: destination.index,
        },
        config
      );
      toast.success('Task moved successfully');
    } catch (error) {
      toast.error('Failed to move task');
      console.error(error);
    }
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleSave = async (updatedTask) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      // await axios.put(
      //   `/api/tasks/tasks/${updatedTask._id}`,
      //   updatedTask,
      //   config
      // );
      await axios.put(`/api/tasks/${updatedTask._id}`, updatedTask, config);
      fetchBoardsAndTasks();
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.app}>
      <div className={styles.appNavbar}>
        <h2>Kanban Board</h2>
        <h3>
          Welcome <span>{user?.name}</span>
        </h3>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.appBoardsContainer}>
          <div className={styles.appBoards}>
            {boards.map((board) => (
              <Board
                key={board._id}
                board={board}
                tasks={tasksByBoard[board._id]}
                fetchBoardsAndTasks={fetchBoardsAndTasks}
                openModal={openModal} // Pass openModal to Board
              />
            ))}
            <div className={styles.appBoardsLast}>
              <Editable
                displayClass={styles.appBoardsAddBoard}
                editClass={styles.appBoardsAddBoardEdit}
                placeholder="Enter Board Name"
                text="Add Board"
                buttonText="Add Board"
                onSubmit={addBoardHandler}
                method="addBoard"
              />
            </div>
          </div>
        </div>
      </DragDropContext>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        task={selectedTask}
        onSave={handleSave}
      />
    </div>
  );
};

export default KanbanPage;
