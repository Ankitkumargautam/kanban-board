// import React, { useState } from 'react';
// import styles from './Card.module.css';
// import { CheckSquare, Clock, MoreHorizontal } from 'react-feather';
// import Dropdown from '../Dropdown/Dropdown';

// const Card = () => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   return (
//     <div className={styles.card}>
//       <div className={styles.cardTop}>
//         <div className={styles.cardTopLabels}>
//           <label style={{ backgroundColor: 'blue' }}>urgent</label>
//         </div>
//         <div
//           className={styles.cardTopMore}
//           onClick={(event) => {
//             event.stopPropagation();
//             setShowDropdown(true);
//           }}
//         >
//           <MoreHorizontal />
//           {showDropdown && (
//             <Dropdown
//               className={styles.boardDropdown}
//               onClose={() => setShowDropdown(false)}
//             >
//               <p
//                 // onClick={() => props.removeCard(props.boardId, id)}
//                 style={{ fontSize: '14px' }}
//               >
//                 Delete Card
//               </p>
//             </Dropdown>
//           )}
//         </div>
//       </div>
//       <div className={styles.cardTitle}>Card title</div>
//       <div className={styles.cardDescription}>
//         Card Description lksjflsdlk lsjfka lfjlksjala lkdjlkdsjfla alf
//       </div>
//       <div className={styles.cardFooter}>
//         <p className={styles.cardFooterItem}>
//           <Clock className={styles.cardFooterIcon} />
//           29 Sep
//         </p>
//         <p className={styles.cardFooterItem}>
//           <CheckSquare className={styles.cardFooterIcon} />
//           1/4
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Card;

import React, { useState } from 'react';
import styles from './Card.module.css';
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather';
import Dropdown from '../Dropdown/Dropdown';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ContextState } from '../../Context/ContextProvider';

const Card = ({ task, fetchBoardsAndTasks }) => {
  const { user } = ContextState();
  const [showDropdown, setShowDropdown] = useState(false);

  const deleteTaskHandler = async () => {
    try {
      console.log(user?.token, ':ll', task._id);

      await axios.delete('/api/tasks', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        data: { taskId: task._id },
      });

      fetchBoardsAndTasks();
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
      console.error(error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.cardTopLabels}>
          <label style={{ backgroundColor: 'blue' }}>{task.priority}</label>
        </div>
        <div
          className={styles.cardTopMore}
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
              <p onClick={deleteTaskHandler} style={{ fontSize: '14px' }}>
                Delete Card
              </p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className={styles.cardTitle}>{task.title}</div>
      <div className={styles.cardDescription}>{task.description}</div>
      <div className={styles.cardFooter}>
        <p className={styles.cardFooterItem}>
          <Clock className={styles.cardFooterIcon} />
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p className={styles.cardFooterItem}>
          <CheckSquare className={styles.cardFooterIcon} />
          {/* Placeholder for task completion status */}
        </p>
      </div>
    </div>
  );
};

export default Card;
