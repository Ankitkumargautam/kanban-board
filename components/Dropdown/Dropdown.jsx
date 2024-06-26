import React, { useEffect, useRef } from 'react';
import styles from './Dropdown.module.css';

const Dropdown = (props) => {
  const dropdownRef = useRef();
  const handleClick = (event) => {
    if (
      dropdownRef &&
      !dropdownRef.current?.contains(event.target) &&
      props.onClose
    )
      props.onClose();
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return (
    <div
      ref={dropdownRef}
      className={
        styles.dropdown || styles.customScroll
        // || props.class ? props.class : ''
      }
    >
      {props.children}
    </div>
  );
};

export default Dropdown;
