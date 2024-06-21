import React from 'react';
import styles from './kanban.module.css';
import { ContextState } from '../Context/ContextProvider';
import Board from '../components/Board/Board';
import Editable from '../components/Editabled/Editable';

const kanban = () => {
  const { user } = ContextState();
  console.log('user==', user);
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
          <Board />
          <Board />
          <Board />
          <div className={styles.appBoardsLast}>
            <Editable
              displayClass={styles.appBoardsAddBoard}
              editClass={styles.appBoardsAddBoardEdit}
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              // onSubmit={addboardHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default kanban;
