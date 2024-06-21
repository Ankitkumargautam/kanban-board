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

// import React, { useState } from 'react';
// import styles from './Editable.module.css';

// const Editable = ({ text, placeholder, displayClass, editClass, onSubmit }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [inputValue, setInputValue] = useState('');

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       onSubmit(inputValue);
//       setIsEditing(false);
//       setInputValue('');
//     }
//   };

//   return (
//     <div>
//       {isEditing ? (
//         <input
//           className={editClass}
//           type="text"
//           placeholder={placeholder}
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={handleKeyDown}
//           onBlur={() => setIsEditing(false)}
//           autoFocus
//         />
//       ) : (
//         <p className={displayClass} onClick={() => setIsEditing(true)}>
//           {text}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Editable;
