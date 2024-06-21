// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ContextState } from '../Context/ContextProvider';
// import Board from '../components/Board/Board';
// import styles from './kanban.module.css';
// import { useRouter } from 'next/router';
// import { toast } from 'react-toastify';
// import Editable from '../components/Editabled/Editable';

// const Kanban = () => {
//   const { user } = ContextState();
//   const router = useRouter();
//   const [boards, setBoards] = useState([]);

//   useEffect(() => {
//     if (user && user?.token) {
//       fetchBoards();
//     }
//   }, [user && user?.token]);

//   const fetchBoards = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user?.token}`,
//         },
//       };
//       const { data } = await axios.get('/api/boards', config);
//       setBoards(data.data);
//     } catch (error) {
//       toast.error('Failed to fetch tasks');
//       console.error(error);
//     }
//   };

//   const addBoardHandler = async (name) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user?.token}`,
//         },
//       };
//       const { data } = await axios.post('/api/boards', { name }, config);
//       setBoards((prevBoards) => [...prevBoards, data.data]);
//       toast.success(data.message);
//     } catch (error) {
//       toast.error('Failed to add board');
//       console.error(error);
//     }
//   };

//   return (
//     <div className={styles.app}>
//       <div className={styles.appNavbar}>
//         <h2>Kanban Board</h2>
//         <h3>
//           Welcome <span>{user?.name}</span>
//         </h3>
//       </div>
//       <div className={styles.appBoardsContainer}>
//         <div className={styles.appBoards}>
//           {boards?.length === 0
//             ? 'No Boards available'
//             : boards?.map((board) => <Board key={board._id} board={board} />)}
//           <div className={styles.appBoardsLast}>
//             <Editable
//               displayClass={styles.appBoardsAddBoard}
//               editClass={styles.appBoardsAddBoardEdit}
//               placeholder="Enter Board Name"
//               text="Add Board"
//               buttonText="Add Board"
//               onSubmit={addBoardHandler}
//               method="addBoard"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Kanban;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './kanban.module.css';
import { toast } from 'react-toastify';
import Board from '../components/Board/Board';
import { ContextState } from '../Context/ContextProvider';
import Editable from '../components/Editabled/Editable';

const KanbanPage = () => {
  const { user } = ContextState();
  const [boards, setBoards] = useState([]);
  const [tasksByBoard, setTasksByBoard] = useState({});
  const [loading, setLoading] = useState(true);

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
      // setBoards((prevBoards) => [...prevBoards, data.data]);
      fetchBoardsAndTasks();
      toast.success(data.message);
    } catch (error) {
      toast.error('Failed to add board');
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
      <div className={styles.appBoardsContainer}>
        <div className={styles.appBoards}>
          {boards.map((board) => (
            <Board
              key={board._id}
              board={board}
              tasks={tasksByBoard[board._id]}
              fetchBoardsAndTasks={fetchBoardsAndTasks}
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
    </div>
  );
};

export default KanbanPage;
