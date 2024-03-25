import React, { useContext } from 'react';
import './Array.css';
import { Context,Algorithm } from '../App';
import Bar from './Bar';

function Array() {
  const length = 20;
  const sorted = useContext(Context)
  const algo = useContext(Algorithm)
  function generateArray() {
    clearTimeout()
    const newArray = [];
    for (let i = 0; i < length; i++) {
      newArray.push(Math.floor(Math.random() * 100));
    }
    algo.setNums(newArray);
    sorted.setShowSort(false)
  }

  // bubble sort
  async function bubbleSort(array) {
    const n = array.length;
    let sortedArray = [...array]; // Create a copy of the original array to avoid mutating it directly
    let swapped;
  
    function swap(arr, idx1, idx2) {
      let temp = arr[idx1];
      arr[idx1] = arr[idx2];
      arr[idx2] = temp;
    }
  
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (sortedArray[i] > sortedArray[i + 1]) {
          // Swap elements
          swap(sortedArray, i, i + 1);
          swapped = true;
        }
      }
      // Update the UI after each iteration to show the sorting process
      await new Promise(resolve => {
        algo.timeoutId = setTimeout(() => {
          algo.setNums([...sortedArray]);
          resolve();
        }, 1000);
      });
    } while (swapped);
  
    return sortedArray;
  }

  // selection sort
  async function selectionSort(array) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
      let min = i;
      for (let j = i + 1; j < n; j++) {
        if (array[j] < array[min]) {
          min = j;
        }
      }
      if (min !== i) {
        // Swap elements
        let temp = array[i];
        array[i] = array[min];
        array[min] = temp;
      }
      // Update the UI after each iteration to show the sorting process
      await new Promise(resolve => {
        setTimeout(() => {
          algo.setNums([...array]); // Update the UI with the current state of the array
          resolve();
        }, 1000); // Adjust the timeout duration as needed
      });
    }
    return array;
  }

  // insertion sort
  async function insertionSort(array) {
    const n = array.length;
    for (let i = 1; i < n; i++) {
      let current = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > current) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = current;
      
      // Update the UI after each iteration to show the sorting process
      await new Promise(resolve => {
        setTimeout(() => {
          algo.setNums([...array]); // Update the UI with the current state of the array
          resolve();
        }, 1000); // Adjust the timeout duration as needed
      });
    }
    return array;
  }
  
  // Merge Sort
async function mergeSort(array, start = 0, end = array.length - 1) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    await mergeSort(array, start, mid);
    await mergeSort(array, mid + 1, end);
    await merge(array, start, mid, end);
  }
  return array;
}

async function merge(array, start, mid, end) {
  const leftArray = array.slice(start, mid + 1);
  const rightArray = array.slice(mid + 1, end + 1);

  let i = 0,
    j = 0,
    k = start;

  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] <= rightArray[j]) {
      array[k++] = leftArray[i++];
    } else {
      array[k++] = rightArray[j++];
    }
  }

  while (i < leftArray.length) {
    array[k++] = leftArray[i++];
  }

  while (j < rightArray.length) {
    array[k++] = rightArray[j++];
  }

  // Update the UI after each merge operation
  await new Promise(resolve => {
    setTimeout(() => {
      algo.setNums([...array]);
      resolve();
    }, 300); // Adjust the timeout duration as needed
  });
}

// Quick Sort
async function quickSort(array, low = 0, high = array.length - 1) {
  if (low < high) {
    const pi = await partition(array, low, high);
    await quickSort(array, low, pi - 1);
    await quickSort(array, pi + 1, high);
  }
  return array;
}

async function partition(array, low, high) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]]; // Swap elements

  // Update the UI after each partition operation
  await new Promise(resolve => {
    setTimeout(() => {
      algo.setNums([...array]);
      resolve();
    }, 1000); // Adjust the timeout duration as needed
  });

  return i + 1;
}

  


  async function changeAlgo(){
    sorted.setShowSort(false)
    algo.setAlgorithm('')
    switch(algo.algorithm) {
      case "Bubble Sort":
        const bubble  = await bubbleSort(algo.nums);
        algo.setNums(bubble);
        break;
      case "Selection Sort":
        const selection = await selectionSort(algo.nums);
        algo.setNums(selection);
        break;
      case "Insertion Sort":
        const insertion = await insertionSort(algo.nums)  ;
        algo.setNums(insertion);
        break;
      case "Merge Sort":
        const merge = await mergeSort(algo.nums);
        algo.setNums(merge);
        break;
      case "Quick Sort":
        const  quick = await quickSort(algo.nums);
        algo.setNums(quick);
        break;
      default:
        break;
    }
  }
  return (
    <div className='visualizer'>
        <div className='buttons'>
          <button className='btn' onClick={generateArray}>Generate Array</button>
          {sorted.showSort ? <button className='btn' onClick={changeAlgo}>Sort using {algo.algorithm}</button> : "" }
        </div>
      <div className='array'>
        {algo.nums.map(num => <div className='element' key={num+(Math.random()*10)}>
          <Bar value={num} /> 
        </div>)}
      </div>
    </div>
  );
}

export default Array;
