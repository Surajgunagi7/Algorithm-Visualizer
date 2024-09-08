// Access the HTML components
let randomizeArray = document.getElementById("randomize_array_btn");
let sortBtn = document.getElementById("sort_btn");
let barsContainer = document.getElementById("bars_container");
let selectAlgo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");

// Define values
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor;
let maxHeight = 0.7 * window.innerHeight;
let speedFactor = 800;
let unsorted_array = [numOfBars];
let selectedAlgo = "";

slider.addEventListener("input", function () {
    numOfBars = slider.value;
    maxRange = slider.value;

    barsContainer.innerHTML = "";
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
    speedFactor = Number(e.target.value);
});

selectAlgo.addEventListener("change", function () {
    selectedAlgo = selectAlgo.value;
});

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
    let array = new Array(numOfBars);
    let usedNumbers = new Set();
    for (let i = 0; i < numOfBars; i++) {
        let num;
        do {
            num = randomNum(minRange, maxRange);
        } while (usedNumbers.has(num));
        array[i] = num;
        usedNumbers.add(num);
    }
    return array;
}

document.addEventListener("DOMContentLoaded", function () {
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
});

function renderBars(array) {
    let maxArrayValue = Math.max(...array);
    let heightFactor = maxHeight / maxArrayValue;
    for (let i = 0; i < numOfBars; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * heightFactor + "px";
        bar.style.backgroundColor = "#191a22";
        bar.innerHTML = array[i];
        barsContainer.appendChild(bar);
    }
}

randomizeArray.addEventListener("click", function () {
    unsorted_array = createRandomArray();
    barsContainer.innerHTML = "";
    renderBars(unsorted_array);
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function BubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    let maxArrayValue = Math.max(...array);
    let heightFactor = maxHeight / maxArrayValue;

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor = "#191a22";
                        bars[k].style.color = "#f3f3f3"; // Black font color for readability
                    }
                }

                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = array[j] * heightFactor + "px";
                bars[j].style.backgroundColor = "#9AE975";
                bars[j].style.color = "#191a22"; 
                bars[j].innerHTML = array[j];

                bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
                bars[j + 1].style.backgroundColor = "#9AE975";
                bars[j + 1].style.color = "#191a22"; 
                bars[j + 1].innerHTML = array[j + 1];

                await sleep(speedFactor);
            }
        }
        await sleep(speedFactor);
    }
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "#191a22";
        bars[k].style.color = "#f3f3f3"; // Reset font color
    }
    return array;
}

async function InsertionSort(array) {
    let bars = document.getElementsByClassName("bar");
    let maxArrayValue = Math.max(...array);
    let heightFactor = maxHeight / maxArrayValue;

    for (let i = 0; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
            bars[j + 1].style.backgroundColor = "#6bdd36";
            bars[j + 1].style.color = "#191a22"; 
            bars[j + 1].innerHTML = array[j + 1];

            await sleep(speedFactor);

            for (let k = 0; k < bars.length; k++) {
                if (k != j + 1) {
                    bars[k].style.backgroundColor = "#191a22";
                    bars[k].style.color = "#f3f3f3";
                }
            }
            j = j - 1;
        }

        array[j + 1] = key;
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "#9AE975";
        bars[j + 1].style.color = "#191a22";
        bars[j + 1].innerHTML = array[j + 1];

        await sleep(speedFactor);
    }
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "#191a22";
        bars[k].style.color = "#f3f3f3"; 
    }
    return array;
}

async function SelectionSort(array) {
    let bars = document.getElementsByClassName("bar");
    let maxArrayValue = Math.max(...array);
    let heightFactor = maxHeight / maxArrayValue;

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        let temp = array[minIndex];
        array[minIndex] = array[i];
        array[i] = temp;

        bars[minIndex].style.height = array[minIndex] * heightFactor + "px";
        bars[minIndex].style.height = array[minIndex] * heightFactor + "px";
        bars[minIndex].style.backgroundColor = " #c8fd";
        bars[minIndex].style.color = "#f3f3f3";
        bars[minIndex].innerText = array[minIndex];

        bars[i].style.height = array[i] * heightFactor + "px";
        bars[i].style.backgroundColor = "#c8fd7c";
        bars[i].style.color = "#191a22"; 
        bars[i].innerText = array[i];

        await sleep(speedFactor);

        bars[minIndex].style.backgroundColor = "#191a22";
        bars[minIndex].style.color = "#f3f3f3"; 
        bars[i].style.backgroundColor = "#191a22";
        bars[i].style.color = "#f3f3f3"; 
    }

    bars[array.length - 1].style.backgroundColor = "#c8fd7c";
    bars[array.length - 1].style.color = "#191a22"; 

    return array;
}

async function QuickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        let pivotIndex = await partition(arr, low, high);
        await QuickSort(arr, low, pivotIndex - 1);
        await QuickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}

async function partition(array, low, high) {
    let pivot = array[low];
    let i = low;
    let j = high;
    let bars = document.getElementsByClassName("bar");
    let maxArrayValue = Math.max(...array);
    let heightFactor = maxHeight / maxArrayValue;

    bars[low].style.backgroundColor = "#FF4949"; // Mark pivot

    while (i < j) {
        while (array[i] <= pivot && i <= high - 1) i++;
        while (array[j] > pivot && j >= low + 1) j--;

        if (i < j) {
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            bars[i].style.height = array[i] * heightFactor + "px";
            bars[i].style.backgroundColor = "#9AE975"; 
            bars[i].innerHTML = array[i];

            bars[j].style.height = array[j] * heightFactor + "px";
            bars[j].style.backgroundColor = "#9AE975"; 
            bars[j].innerHTML = array[j];

            await sleep(speedFactor);

            bars[i].style.backgroundColor = "#191a22"; 
            bars[j].style.backgroundColor = "#191a22";
        }
    }

    let temp = array[low];
    array[low] = array[j];
    array[j] = temp;

    bars[low].style.height = array[low] * heightFactor + "px";
    bars[low].style.backgroundColor = "#191a22"; 
    bars[low].innerHTML = array[low];

    bars[j].style.height = array[j] * heightFactor + "px";
    bars[j].style.backgroundColor = "#FF4949"; 
    bars[j].innerHTML = array[j];

    await sleep(speedFactor);

    bars[j].style.backgroundColor = "#191a22"; 

    return j;
}

async function MergeSort(array, low = 0, high = array.length - 1) {
    if (low < high) {
        let mid = Math.floor(low + (high - low) / 2);
        await MergeSort(array, low, mid);
        await MergeSort(array, mid + 1, high);
        await merge(array, low, mid, high);
    }
}

async function merge(array, low, mid, high) {
    let bars = document.getElementsByClassName("bar");
    let maxArrayValue = Math.max(...array);
    let heightFactor = maxHeight / maxArrayValue;

    const temp = new Array(high - low + 1);
    let left = low;
    let right = mid + 1;
    let i = 0;

    for (let j = low; j <= high; j++) {
        bars[j].style.backgroundColor = "#191a22"; 
        bars[j].style.color = "#f3f3f3";
    }

    while (left <= mid && right <= high) {
        if (array[left] <= array[right]) {
            temp[i] = array[left];

            bars[left].style.backgroundColor = "#6bdd36"; 
            bars[left].style.color = "#191a22"; 

            await sleep(speedFactor);

            left++;
        } else {
            temp[i] = array[right];

            
            bars[right].style.backgroundColor = "#ff8c00"; 
            bars[right].style.color = "#191a22"; 

            await sleep(speedFactor);

            right++;
        }
        i++;
    }

    while (left <= mid) {
        temp[i] = array[left];

        bars[left].style.backgroundColor = "#6bdd36";
        bars[left].style.color = "#191a22"; 

        await sleep(speedFactor);

        left++;
        i++;
    }

    while (right <= high) {
        temp[i] = array[right];

        bars[right].style.backgroundColor = "#ff8c00";
        bars[right].style.color = "#191a22"; 

        await sleep(speedFactor);

        right++;
        i++;
    }

    for (let j = low; j <= high; j++) {
        array[j] = temp[j - low];

        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "#9AE975"; // Sorted color
        bars[j].style.color = "#191a22";
        bars[j].innerText = array[j];

        await sleep(speedFactor);
    }
    
    for (let j = low; j <= high; j++) {
        bars[j].style.backgroundColor = "#191a22";
        bars[j].style.color = "#f3f3f3";
    }
}

sortBtn.addEventListener("click", function () {
    switch (selectedAlgo) {
        case "bubble": BubbleSort(unsorted_array); break;
        case "insertion": InsertionSort(unsorted_array); break;
        case "selection": SelectionSort(unsorted_array); break;
        case "quick": QuickSort(unsorted_array); break;
        case "merge": MergeSort(unsorted_array); break;
        default: BubbleSort(unsorted_array); break;
    }
});
