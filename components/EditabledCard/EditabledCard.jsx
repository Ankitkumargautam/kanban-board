import React, { useState } from 'react';
import styles from './EditabledCard.module.css';
import { X } from 'react-feather';

const EditabledCard = ({
  text,
  placeholder,
  displayClass,
  editClass,
  buttonText,
  onSubmit,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      onSubmit(inputText, inputDescription);
      setInputText('');
      setInputDescription('');
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
          <input
            type="text"
            value={inputDescription}
            placeholder="description"
            onChange={(e) => setInputDescription(e.target.value)}
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

export default EditabledCard;
