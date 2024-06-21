// import React, { useEffect, useState } from 'react';
// import styles from './Board.module.css';
// import Card from '../Card/Card';
// import { MoreHorizontal } from 'react-feather';
// import Editable from '../Editabled/Editable';
// import Dropdown from '../Dropdown/Dropdown';
// import { ContextState } from '../../Context/ContextProvider';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const Board = ({ board }) => {
//   const { user } = ContextState();

//   const [tasks, setTasks] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     if (user && user?.token) {
//       fetchTasks();
//     }
//   }, [user && user?.token]);

//   const fetchTasks = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user?.token}`,
//         },
//       };
//       const { data } = await axios.get('/api/tasks', config);
//       setTasks(data.data);
//     } catch (error) {
//       toast.error('Failed to fetch tasks');
//       console.error(error);
//     }
//   };
//   return (
//     <div className={styles.board}>
//       <div className={styles.boardHeader}>
//         <p className={styles.boardHeaderTitle}>
//           {board?.name}
//           <span>{ board?._id ===tasks.id && tasks.length}</span>
//         </p>
//         <div
//           className={styles.boardHeaderTitleMore}
//           onClick={(event) => {
//             event.stopPropagation();
//             setShowDropdown(true);
//           }}
//         >
//           <MoreHorizontal />
//           {showDropdown && (
//             <Dropdown
//               className={styles.boardDropdown}
//               pen_spark
//               onClose={() => setShowDropdown(false)}
//             >
//               <p
//                 //  onClick={() => props.removeBoard()}
//                 style={{ fontSize: '12px' }}
//               >
//                 Delete Board
//               </p>
//             </Dropdown>
//           )}
//         </div>
//       </div>
//       <div className={styles.boardCards || styles.customScroll}>
//         <Card />
//         <Card />
//         <Card />
//         <Card />
//         <Card />
//         <Card />
//         <Card />
//         <Editable
//           text="+ Add Card"
//           placeholder="Enter Card Title"
//           displayClass="board_add-card"
//           editClass="board_add-card_edit"
//           // onSubmit={(value) => props.addCard(props.board?.id, value)}
//         />{' '}
//       </div>
//     </div>
//   );
// };

// export default Board;

import React, { useState } from 'react';
import styles from './Board.module.css';
import Card from '../Card/Card';
import { MoreHorizontal } from 'react-feather';
import Dropdown from '../Dropdown/Dropdown';
import { toast } from 'react-toastify';
import axios from 'axios';
import EditabledCard from '../EditabledCard/EditabledCard';
import { ContextState } from '../../Context/ContextProvider';

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
      // tasks.push(data.data);
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
      <div className={styles.boardCards || styles.customScroll}>
        {tasks.map((task) => (
          <Card
            key={task._id}
            task={task}
            fetchBoardsAndTasks={fetchBoardsAndTasks}
          />
        ))}
        <EditabledCard
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={addTaskHandler}
        />
      </div>
    </div>
  );
};

export default Board;
