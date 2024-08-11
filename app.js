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
            bars[j + 1].style.backgroundColor = "#9AE975";
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

async function QuickSort(items, left = 0, right = items.length - 1) {
    if (left < right) {
        let index = await partition(items, left, right);
        await QuickSort(items, left, index - 1);
        await QuickSort(items, index, right);
    }
    return items;
}

async function partition(items, left, right) {
    let pivotIndex = Math.floor((right + left) / 2);
    let pivot = items[pivotIndex];
    let i = left, j = right;
    let bars = document.getElementsByClassName("bar");
    let maxArrayValue = Math.max(...items);
    let heightFactor = maxHeight / maxArrayValue;

    while (i <= j) {
        while (items[i] < pivot) i++;
        while (items[j] > pivot) j--;
        if (i <= j) {
            [items[i], items[j]] = [items[j], items[i]];

            bars[i].style.height = items[i] * heightFactor + "px";
            bars[i].style.backgroundColor = "#9AE975";
            bars[i].style.color = "#191a22"; 
            bars[i].innerText = items[i];

            bars[j].style.height = items[j] * heightFactor + "px";
            bars[j].style.backgroundColor = "#9AE975";
            bars[j].style.color = "#191a22"; 
            bars[j].innerText = items[j];

            await sleep(speedFactor);

            bars[i].style.backgroundColor = "#191a22";
            bars[i].style.color = "#f3f3f3"; 
            bars[j].style.backgroundColor = "#191a22";
            bars[j].style.color = "#f3f3f3";

            i++;
            j--;
        }
    }
    return i;
}

sortBtn.addEventListener("click", function () {
    switch (selectedAlgo) {
        case "bubble": BubbleSort(unsorted_array); break;
        case "insertion": InsertionSort(unsorted_array); break;
        case "selection": SelectionSort(unsorted_array); break;
        case "quick": QuickSort(unsorted_array); break;
        default: BubbleSort(unsorted_array); break;
    }
});
