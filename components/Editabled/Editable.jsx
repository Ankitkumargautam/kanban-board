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
