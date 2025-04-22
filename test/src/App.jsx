import React from 'react';
import Todo from './component/Todo';
import Des from './component/Des';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start p-8">
       <ToastContainer />
      {/* <Todo /> */}
      <Des />
    </div>
  );
};

export default App;
