import React, { useState } from 'react';
import styles from './Board.module.css';
import Card from '../Card/Card';
import { MoreHorizontal } from 'react-feather';
import Editable from '../Editabled/Editable';
import Dropdown from '../Dropdown/Dropdown';

const Board = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={styles.board}>
      <div className={styles.boardHeader}>
        <p className={styles.boardHeaderTitle}>
          Todo
          <span>2</span>
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
              pen_spark
              onClose={() => setShowDropdown(false)}
            >
              <p
                //  onClick={() => props.removeBoard()}
                style={{ fontSize: '12px' }}
              >
                Delete Board
              </p>
            </Dropdown>
          )}
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
