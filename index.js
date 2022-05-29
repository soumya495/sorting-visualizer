const array = []
let sorted = false
// get random number b/w 5 and 585
const getRandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// filling array with random values
for (let i = 0; i < 100; i++) {
  array[i] = getRandomNumber(585, 5)
}

const container = document.querySelector('.container')
// creating the visual
function createVisual(array, spInd1, spInd2, spInd3) {
  array.map((ele, index) => {
    const newEle = document.createElement('div')
    newEle.style.width = '3px'
    newEle.style.height = `${ele}px`
    newEle.classList.add('numEle')
    if (index === spInd1) newEle.classList.add('spInd1')
    if (index === spInd2) newEle.classList.add('spInd2')
    if (index === spInd3) newEle.classList.add('spInd3')
    container.appendChild(newEle)
  })
}
// clearing the visual
function clearVisual() {
  container.innerHTML = ''
}

// implementing bubble sort
async function bubbleSort(arr) {
  clearVisual()
  const arrLen = arr.length
  for (let i = 0; i < arrLen - 1; i++) {
    createVisual(arr)
    let swapped = false
    for (let j = 0; j < arrLen - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
        swapped = true
      }
    }
    if (!swapped) {
      sorted = true
      return
    }
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve()
      }, 200)
    )
    clearVisual()
  }
}

// implementing selection sort
async function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    clearVisual()
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    if (min !== i) {
      let temp = arr[i]
      arr[i] = arr[min]
      arr[min] = temp
    }
    createVisual(arr)
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 200)
    })
  }
  sorted = true
}

// implementing merge sort
async function merge(arr, s, m, e) {
  const newArr = []
  let i = s,
    j = m + 1,
    k = 0

  while (i <= m && j <= e) {
    if (arr[i] <= arr[j]) {
      newArr.push(arr[i])
      i++
    } else {
      newArr.push(arr[j])
      j++
    }
  }
  while (i <= m) {
    newArr.push(arr[i])
    i++
  }
  while (j <= e) {
    newArr.push(arr[j])
    j++
  }
  for (let p = s; p <= e; p++) {
    arr[p] = newArr[k]
    k++
  }

  createVisual(arr, s, m, e)
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 200)
  })
  clearVisual()
}

async function mergeSort(arr, s, e) {
  if (s < e) {
    const mid = parseInt((s + e) / 2)
    await mergeSort(arr, s, mid)
    await mergeSort(arr, mid + 1, e)
    await merge(arr, s, mid, e)
  }
  sorted = true
}

// implementing quick sort
async function partition(arr, l, h) {
  // pivot at any random position
  let pivot = arr[h]
  let pIndex = l

  for (let i = l; i < h; i++) {
    if (arr[i] <= pivot) {
      let temp = arr[i]
      arr[i] = arr[pIndex]
      arr[pIndex] = temp
      pIndex = pIndex + 1
    }
  }

  let temp = arr[pIndex]
  arr[pIndex] = pivot
  arr[h] = temp

  createVisual(arr, l, pIndex, h)
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 200)
  })
  clearVisual()

  return pIndex
}

async function quickSort(arr, l, h) {
  if (l < h) {
    const pIndex = await partition(arr, l, h)
    await quickSort(arr, l, pIndex - 1)
    await quickSort(arr, pIndex + 1, h)
  }
  sorted = true
}

// initial render
createVisual(array)

const algo = document.getElementById('algorithm')
const sortBtn = document.getElementById('sort')
const newBtn = document.getElementById('new')

async function visualizeMerge() {
  await mergeSort(array, 0, array.length - 1)
  createVisual(array)
}

async function visualizeQuick() {
  await quickSort(array, 0, array.length - 1)
  createVisual(array)
}

newBtn.addEventListener('click', () => {
  window.location.reload()
})

sortBtn.addEventListener('click', () => {
  if (!sorted) {
    if (algo.value === 'bubble') bubbleSort(array)
    else if (algo.value === 'selection') selectionSort(array)
    else if (algo.value === 'merge') visualizeMerge()
    else if (algo.value === 'quick') visualizeQuick()
  } else {
    alert('Already Sorted!')
  }
})
