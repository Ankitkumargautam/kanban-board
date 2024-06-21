import React, { useState } from 'react';
import styles from './Editable.module.css';
import { X } from 'react-feather';

const Editable = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState(props.defaultValue || '');

  const submission = (e) => {
    e.preventDefault();
    if (inputText && props.onSubmit) {
      setInputText('');
      props.onSubmit(inputText);
    }
    setIsEditable(false);
  };
  return (
    <div className={styles.editable}>
      {isEditable ? (
        <form
          className={
            styles.editableEdit || (props.editClass ? props.editClass : '')
          }
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={props.placeholder || props.text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className={styles.editableEditFooter}>
            <button type="submit">{props.buttonText || 'Add'}</button>
            <X onClick={() => setIsEditable(false)} className="closeIcon" />
          </div>
        </form>
      ) : (
        <p
          className={
            styles.editableDisplay ||
            (props.displayClass ? props.displayClass : '')
          }
          onClick={() => setIsEditable(true)}
        >
          {props.text}
        </p>
      )}
    </div>
  );
};

export default Editable;
