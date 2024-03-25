import React, { useContext } from 'react';
import './Header.css';
import { Context, Algorithm } from '../App';


function Header() {
  const sorted = useContext(Context);
  const algo = useContext(Algorithm);

  function sort(name) {
    sorted.setShowSort(true);
    algo.setAlgorithm(name);
  }

  return (
    <main>
      <div className='logo'>
        <h1>VisualSort</h1>
      </div>
      <div>
        <button className='btn' onClick={() => sort("Bubble Sort")}>Bubble Sort</button>
        <button className='btn' onClick={() => sort("Selection Sort")}>Selection Sort</button>
        <button className='btn' onClick={() => sort("Insertion Sort")}>Insertion Sort</button>
        <button className='btn' onClick={() => sort("Merge Sort")}>Merge Sort</button>
        <button className='btn' onClick={() => sort("Quick Sort")}>Quick Sort</button>
      </div>
    </main>
  );
}

export default Header;
