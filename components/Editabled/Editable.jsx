import React, { useState } from 'react';
import styles from './Editable.module.css';
import { X } from 'react-feather';

const Editable = ({
  text,
  placeholder,
  displayClass,
  editClass,
  buttonText,
  onSubmit,
  method,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText && onSubmit && method === 'addBoard') {
      onSubmit(inputText);
      setInputText('');
      setIsEditable(false);
    }
  };

  return (
    <div className={styles.editable}>
      {isEditable ? (
        <form
          className={styles.editableEdit || (editClass ? editClass : '')}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(e) => setInputText(e.target.value)}
            autoFocus
          />
          <div className={styles.editableEditFooter}>
            <button type="submit">{buttonText || 'Add'}</button>
            <X onClick={() => setIsEditable(false)} className="closeIcon" />
          </div>
        </form>
      ) : (
        <p
          className={
            styles.editableDisplay || (displayClass ? displayClass : '')
          }
          onClick={() => setIsEditable(true)}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default Editable;
