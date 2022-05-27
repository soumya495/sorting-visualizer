const array = []

// get random number b/w 5 and 585
const getRandomNumber = () => {
  return Math.floor(Math.random() * (585 - 5 + 1) + 5)
}

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

function clearVisual() {
  container.innerHTML = ''
}

createVisual(array)

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
      }, 300)
    )
    clearVisual()
  }
  console.log('sorted array!!')
}

document.querySelector('button').addEventListener('click', () => {
  bubbleSort(array)
})
