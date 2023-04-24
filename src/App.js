import './App.css';
import React, { useState } from 'react';

export default function App() {
const [newArray, setArray] = useState([]);
const [sorted, setSorted] = useState([]);

const generateArray = () => {
  const newArray = [];
  const sorted = [];
  for (let i = 0; i < 50; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    newArray.push(value);
    sorted.push(false);
  }
  setArray(newArray);
  setSorted(sorted);
}

const bubbleSort = async () => {
  let sorted = new Array(newArray.length).fill(false);
  for (let i = 0; i < newArray.length; i++) {
    let isSorted = true;
    for (let j = 0; j < newArray.length - i - 1; j++) {
      if (newArray[j] > newArray[j + 1]) {
        await swap(j, j + 1);
        isSorted = false;
      }
    }
    sorted[newArray.length - i - 1] = true;
    setSorted([...sorted]);
    if (isSorted) {
      for (let k = 0; k <= i; k++) {
        sorted[k] = true;
      }
      setSorted([...sorted]);
      return;
    }
  }
}

const selectionSort = async () => {
  let sorted = new Array(newArray.length).fill(false);
  for (let i = 0; i < newArray.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < newArray.length; j++) {
      if (newArray[j] < newArray[minIndex]) {
        minIndex = j;
      }
    }
    await swap(i, minIndex);
    sorted[i] = true;
    setSorted(sorted);
  }
}

const insertionSort = async () => {
  for (let i = 1; i < newArray.length; i++) {
    let j = i - 1;
    let temp = newArray[i];
    while (j >= 0 && newArray[j] > temp) {
      newArray[j + 1] = newArray[j];
      j--;
      await delay(50);
      setArray([...newArray]);
    }
    newArray[j + 1] = temp;
    await delay(50);
    setArray([...newArray]);
  }
  let sorted = new Array(newArray.length).fill(true);
  setSorted(sorted);
}

const heapSort = async () => {
  let sorted = new Array(newArray.length).fill(false);
  const n = newArray.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }
  for (let i = n - 1; i >= 0; i--) {
    await swap(0, i);
    await heapify(i, 0);
    sorted[i] = true;
    setSorted(sorted);
  }
}

const heapify = async (n, i) => {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  if (l < n && newArray[l] > newArray[largest]) {
    largest = l;
  }
  if (r < n && newArray[r] > newArray[largest]) {
    largest = r;
  }
  if (largest !== i) {
    await swap(i, largest);
    await heapify(n, largest);
  }
}

const mergeSort = async () => {
  await mergeSortHelper(0, newArray.length - 1);
  let sorted = new Array(newArray.length).fill(true);
  setSorted(sorted);
} 

const mergeSortHelper = async (left, right) => {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    await mergeSortHelper(left, mid);
    await mergeSortHelper(mid + 1, right);
    await merge(left, mid, right);
  }
}

const merge = async (left, mid, right) => {
  const leftArray = newArray.slice(left, mid + 1);
  const rightArray = newArray.slice(mid + 1, right + 1);
  let i = 0;
  let j = 0;
  let k = left;
  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] <= rightArray[j]) {
      newArray[k] = leftArray[i];
      i++;
    } else {
      newArray[k] = rightArray[j];
      j++;
    }
    k++;
    await delay(50);
    setArray([...newArray]);
  }
  while (i < leftArray.length) {
    newArray[k] = leftArray[i];
    i++;
    k++;
    await delay(50);
    setArray([...newArray]);
  }
  while (j < rightArray.length) {
    newArray[k] = rightArray[j];
    j++;
    k++;
    await delay(50);
    setArray([...newArray]);
  }
}

const quickSort = async () => {
  await quickSortHelper(0, newArray.length - 1);
  let sorted = new Array(newArray.length).fill(true);
  setSorted(sorted);
}

const quickSortHelper = async (left, right) => {
  if (left < right) {
    const pivot = await partition(left, right);
    await quickSortHelper(left, pivot - 1);
    await quickSortHelper(pivot + 1, right);
  }
}

const partition = async (left, right) => {
  const pivot = newArray[right];
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (newArray[j] < pivot) {
      i++;
      await swap(i, j);
    }
  }
  await swap(i + 1, right);
  return i + 1;
}

const swap = (i, j) => {
  return new Promise(resolve => {
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
    setTimeout(() => {
      setArray([...newArray]);
      resolve();
    }, 50);
  });
}

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  return (
    <div className="App">
      <head>
        <title>My Sorting Algorithm Visualizer</title>
      </head>
      <body>
        <h1>My Sorting Algorithm Visualizer</h1>
        <div className='graph-container'>
        {newArray.map((value, index) => (
          <div className={`bar ${sorted[index] ? 'sorted' : 'unsorted'}`} key={index} style={{ height: `${value * 3}px` }}></div>
        ))}
        </div>
        <div className="button-container">
          <button onClick={generateArray}>Generate New Array</button>
          <button onClick={bubbleSort}>Bubble Sort</button>
          <button onClick={selectionSort}>Selection Sort</button>
          <button onClick={insertionSort}>Insertion Sort</button>
          <button onClick={heapSort}>Heap Sort</button>
          <button onClick={mergeSort}>Merge Sort</button>
          <button onClick={quickSort}>Quick Sort</button>
        </div>
      </body>
    </div>
  );
}
