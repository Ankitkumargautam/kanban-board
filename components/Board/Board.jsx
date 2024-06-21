import React, { useState } from 'react';
import styles from './Board.module.css';
import Card from '../Card/Card';
import { MoreHorizontal } from 'react-feather';
import Dropdown from '../Dropdown/Dropdown';
import { toast } from 'react-toastify';
import axios from 'axios';
import EditabledCard from '../EditabledCard/EditabledCard';
import { ContextState } from '../../Context/ContextProvider';

import { Droppable, Draggable } from 'react-beautiful-dnd';

const Board = ({ board, tasks, fetchBoardsAndTasks }) => {
  const { user } = ContextState();
  const [showDropdown, setShowDropdown] = useState(false);

  const addTaskHandler = async (title, description) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post(
        '/api/tasks',
        {
          title,
          description: description,
          dueDate: new Date(),
          priority: 'medium',
          boardId: board._id,
        },
        config
      );
      fetchBoardsAndTasks();
      toast.success(data.message);
    } catch (error) {
      toast.error('Failed to add task');
      console.error(error);
    }
  };

  const deleteBoardHandler = async (Id) => {
    try {
      console.log(user?.token, ':ll', Id);

      await axios.delete('/api/boards', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        data: { boardId: Id },
      });

      fetchBoardsAndTasks();
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
      console.error(error);
    }
  };

  return (
    <div className={styles.board}>
      <div className={styles.boardHeader}>
        <p className={styles.boardHeaderTitle}>
          {board.name}
          <span>{tasks.length}</span>
        </p>
        <div
          className={styles.boardHeaderTitleMore}
          onClick={(event) => {
            event.stopPropagation();
            setShowDropdown(true);
          }}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown
              className={styles.boardDropdown}
              onClose={() => setShowDropdown(false)}
            >
              <p
                onClick={() => deleteBoardHandler(board._id)}
                style={{ fontSize: '12px' }}
              >
                Delete Board
              </p>
            </Dropdown>
          )}
        </div>
      </div>
      <Droppable droppableId={board._id}>
        {(provided) => (
          <div
            className={styles.boardCards || styles.customScroll}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card
                      key={task._id}
                      task={task}
                      fetchBoardsAndTasks={fetchBoardsAndTasks}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <EditabledCard
              text="+ Add Card"
              placeholder="Enter Card Title"
              displayClass="board_add-card"
              editClass="board_add-card_edit"
              onSubmit={addTaskHandler}
            />
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Board;
