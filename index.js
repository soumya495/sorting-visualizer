const array = []
// get random number b/w 5 and 585
const getRandomNumber = () => {
  return Math.floor(Math.random() * (585 - 5 + 1) + 5)
}
// filling array with random values
for (let i = 0; i < 100; i++) {
  array[i] = getRandomNumber()
}

const container = document.querySelector('.container')
// creating the visual
function createVisual(array) {
  array.map((ele) => {
    const newEle = document.createElement('div')
    newEle.style.width = '3px'
    newEle.style.height = `${ele}px`
    newEle.classList.add('numEle')
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
    if (!swapped) return
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve()
      }, 200)
    )
    clearVisual()
  }
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

  createVisual(arr)
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

newBtn.addEventListener('click', () => {
  window.location.reload()
})

sortBtn.addEventListener('click', () => {
  if (algo.value === 'bubble') bubbleSort(array)
  else if (algo.value === 'merge') visualizeMerge()
})
