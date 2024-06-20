import React from 'react';
import { ContextState } from '../Context/ContextProvider';

const kanban = () => {
  const { user } = ContextState();
  console.log('user==', user);
  return <div>kanban</div>;
};

export default kanban;
