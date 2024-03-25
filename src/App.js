import './App.css';
import Header from './components/Header.js';
import Array from './components/Array.js';
import React from 'react';

export const Context = React.createContext();
export const Algorithm = React.createContext();


function App() {
  const [showSort, setShowSort] = React.useState(false);
  const [algorithm, setAlgorithm] = React.useState("");
  const [nums, setNums] = React.useState([1, 3, 5, 6, 3, 5, 7, 4, 2, 6, 7, 8, 9, 3, 5, 7, 8, 9, 2, 4]);
  return (
    <Context.Provider value={{showSort,setShowSort}}>
      <Algorithm.Provider value={{algorithm,setAlgorithm,nums,setNums}}>
        <Header></Header>
        <Array></Array>
      </Algorithm.Provider>
    </Context.Provider>
  );
}

export default App;
