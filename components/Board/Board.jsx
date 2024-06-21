import React from 'react';
import styles from './Board.module.css';
import Card from '../Card/Card';
import { MoreHorizontal } from 'react-feather';
import Editable from '../Editabled/Editable';

const Board = () => {
  return (
    <div className={styles.board}>
      <div className={styles.boardHeader}>
        <p className={styles.boardHeaderTitle}>
          Todo
          <span>2</span>
        </p>
        <div
          className={styles.boardHeaderTitleMore}
          // onClick={() => setShowDropdown(true)}
        >
          <MoreHorizontal />
          {/* {showDropdown && (
            <Dropdown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )} */}
        </div>
      </div>
      <div className={styles.boardCards || styles.customScroll}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          // onSubmit={(value) => props.addCard(props.board?.id, value)}
        />{' '}
      </div>
    </div>
  );
};

export default Board;
