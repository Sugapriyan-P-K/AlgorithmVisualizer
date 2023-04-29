
document.addEventListener("DOMContentLoaded", function () {
    let random_array = document.getElementById("randomize_array_btn");
    let sort_btn = document.getElementById("sort_btn");
    let bars_container = document.getElementById("bars_container");
    let selectAlgorithm = document.getElementById("algorithm");
    let speed = document.getElementById("speed");
    let input = document.getElementById("forNow");
    const codeBlock = document.getElementById('myNotes');
    const copyButton = document.getElementById('copy-button');
    let span = document.getElementsByClassName("close")[0];
    const noteBtn = document.getElementById('forNotes');
    let ipf = false;
    let array = [];
    let heightFactor = 4;
    let speedFactor = 100;
    let numberOfBars = 25;
    let unsorted_array = new Array(numberOfBars);
    let algorithmToUse = "bubbleSort";
    let notes;
    // let notes = document.createElement("div"); // not yet
    // notes.setAttribute("id", "note");
    const alpha = "lightgreen";
    const beta = "green";
    const sorted = "#AAFF00";
    const unsorted = "aqua";
    const special = "red";
    let parse = false;
    // let forMerge = [];
    // console.log(arr)

    const copyTextHandler = () => {
        const text = codeBlock.innerText;
        let element = document.createElement('textarea');
        document.body.appendChild(element);
        element.value = text;
        element.select();
        document.execCommand('copy');
        document.body.removeChild(element);

    }

    function showNotes() {
        codeBlock.style.display = "block";
    }
    span.onclick = function() {
        codeBlock.style.display = "none";
    }
    // window.onclick = function(event) {
    //     if (event.target == modal) {
    //       codeBlock.style.display = "none";
    //     }
    // }
    // console.log(numberOfBars, numberOfBars.length);
    noteBtn.disabled = true;
    function speedOfAlgorithm() {
        // console.log(this.value);
        speedFactor = parseInt(this.value);
    }
    
    function selectionOfAlgorithm() {
        algorithmToUse = selectAlgorithm.value;
    }
    

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    

    function createRandomArray() {
        let minNumber = randomNumber(1, 5);
        let maxNumber = randomNumber(100, 150);
        // let maxNumber = randomNumber(50,60);
        let array = new Array(numberOfBars);
        for (let i = 0; i < numberOfBars; i++) {
            array[i] = randomNumber(minNumber, maxNumber);
        }
        return array;
    }

    function renderBars(array) {
        for (let i = 0; i < numberOfBars; i++) {
            let bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.height = array[i] * heightFactor + "px";
            bars_container.appendChild(bar);
        }
    }
    
    function prepareBarAndArray(ipf = true) {
        if (ipf) {
            unsorted_array = createRandomArray();
            bars_container.innerHTML = ""; // here we are claring the previously generated bars
            renderBars(unsorted_array);
        }
        else {
            bars_container.innerHTML = ""; // here we are claring the previously generated bars
            renderBars(unsorted_array);
        }
    }
    

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    function disableButtons(stateOfButton) {
        sort_btn.disabled = stateOfButton;
        random_array.disabled = stateOfButton;
        speed.disabled = stateOfButton;
        selectAlgorithm.disabled = stateOfButton;
        
    }

    async function visualize(index, color) {
        let bars = document.getElementsByClassName("bar");
        const [value, bar] = [unsorted_array[index], bars[index]];
        if (bar) {
            console.log(speedFactor);
            await sleep(speedFactor);
            const { style } = bar;
            style.backgroundColor = color;
            style.height = `${value * heightFactor}px`;
        }
    }

    function* bubbleSort(array){
        let arrayLength = array.length;
        for (let i = 0;i < arrayLength; i++) {
            for (let j = 0; j < arrayLength - i - 1; j++) {
                notes += `<br>${array}<br>`;
                if (array[j] > array[j + 1]) {
                    notes += `<br>${array[j]} > ${array[j+1]} => swap ${array}<br>`;
                    yield* swap(array, j, j+1);
                }

                yield [unsorted, j];
                yield [unsorted, j + 1];
            }

            yield [sorted, array.length - i - 1];
        }
    }


    function* insertionSort(array) {
        let arrayLength = array.length;
        for (let i = 0; i < arrayLength; i++) {

            let temp = array[i];
    
            yield [beta, i];
    
            let j = i - 1;
    
           while (j >= 0 && array[j] > temp) {
    
                array[j + 1] = array[j];

                j -= 1;
                yield [alpha, j];
                yield [beta, j + 1];
                yield [sorted, j + 1];
                yield [sorted, j];
            }
    
            array[j + 1] = temp;
    
            yield [beta, i];
            yield [sorted, i];
            yield [beta, j + 1];
            yield [sorted, j + 1];
        }
    }

    function* selectionSort(array) {
        let arrayLength = array.length;
        for (let i = 0; i < arrayLength - 1; i++) {
            let currentMinIdx = i;
            
            for (let j = i + 1; j <  arrayLength; j++) {
                yield [alpha, j];

                if (array[j] < array[currentMinIdx]) {
                    currentMinIdx = j;
                }

                yield [unsorted, j];
            }

            [array[i], array[currentMinIdx]] = [array[currentMinIdx], array[i]];
            
            yield [sorted, i];
            if (currentMinIdx != i){
                yield [unsorted, currentMinIdx];
            }
        }
        yield [sorted, arrayLength - 1];
    }

    function* mergeSort(arr, start = 0, end = arr.length - 1) {
        if (start < end) {
            const middle = Math.floor((start + end) / 2);
            yield* mergeSort(arr, start, middle);
            yield* mergeSort(arr, middle + 1, end);
            yield* merge(arr, start, middle, end);
        }
    }

    function* merge(arr, start, middle, end) {
        let leftArr = arr.slice(start, middle + 1);
        let rightArr = arr.slice(middle + 1, end + 1);

        let leftIndex = 0;
        let rightIndex = 0;
        let arrIndex = start;

        while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
            if (leftArr[leftIndex] < rightArr[rightIndex]) {
                arr[arrIndex] = leftArr[leftIndex];
                leftIndex++;
            }
            else {
                arr[arrIndex] = rightArr[rightIndex];
                rightIndex++;
            }
            
            yield [sorted, arrIndex];
            arrIndex++;
        }

        while (leftIndex < leftArr.length) {
            arr[arrIndex] = leftArr[leftIndex];
            leftIndex++;
            yield [sorted, arrIndex];
            arrIndex++;
        }

        while (rightIndex < rightArr.length) {
            arr[arrIndex] = rightArr[rightIndex];
            rightIndex++;
            yield [sorted, arrIndex];
            arrIndex++;
        }
        return arr;
    }
    function* swap(arr, i, j) {
        yield [alpha, i];
        yield [beta, j];
        [arr[i], arr[j]] = [arr[j], arr[i]];
        yield [beta, i];
        yield [alpha, j];
    }
    
    function* shiftDown(arr, i, upper) {
        let l,
            r;
        while (true) {
            l = i*2+1;
            r = i*2+2;
            if (Math.max(l,r) < upper) {
                if (arr[i] > Math.max(arr[l], arr[r])) {
                    break;
                }
                else if (arr[l] > arr[r]) {
                    yield* swap(arr, i, l);
                    i = l;
                }
                else {
                    yield* swap(arr, i, r);
                    i = r;
                }
            }
            else if (l < upper) {
                if (arr[l] > arr[i]) {
                    yield* swap(arr, i, l);
                    i = l;
                }
                else {
                    break
                }
            }
            else if (r < upper) {
                if (arr[r] > arr[i]) {
                    yield* swap(arr, i, r);
                    i = r;
                }
                else {
                    break;
                }
            }
            else {
                break;
            }
        }
    }
    
    function* heapSort(arr) {
        for (let j = Math.floor((arr.length - 2) / 2); j > -1; j--) {
            yield* shiftDown(arr, j, arr.length);
        }
    
        for (let end = arr.length - 1; end > 0; end--) {
            yield* swap(arr, 0, end);
            yield* shiftDown(arr, 0, end);
            yield [sorted, end];
        }
        yield [sorted, 0];
    }

    function* quickSort(arr, left, right) {
        if (left < right) {
            partitionPosition = yield* partition(arr, left, right);
            yield* quickSort(arr, left, partitionPosition - 1);
            yield* quickSort(arr, partitionPosition + 1, right);
        }
    }
    
    function* partition(arr, left, right) { // pivot as last element
        let i = left;
        let j = right - 1;
        let pivot = arr[right];
        yield [alpha, i];
        yield [beta, j];
        yield [special,right];
        while (i < j) {
            while (i < right && arr[i] < pivot) {
                i += 1;
                yield [unsorted, i];
            }
            while (j > left && arr[j] >= pivot) {
                j -= 1;
                yield [unsorted, j];
            }
            if (i < j) {
                yield [alpha, i];
                yield [beta, j];
                [ arr[i], arr[j] ] = [ arr[j], arr[i] ];
                yield [beta, i];
                yield [alpha, j];
            }
        }
        if (arr[i] > pivot) {
            yield [alpha, i];
            yield [beta, right];
            [ arr[i], arr[right] ] = [ arr[right], arr[i] ];
            yield [unsorted, i];
            yield [sorted, right];
        }
        return i;
    }

    async function startSort() {
        // console.log(input.value);
        if (input.value !== "undefined") {
            // console.log(input.value);
            array = input.value.split(",");
            let integerArray = array.map(str => parseInt(str));
            // console.log(array);
            // console.log(array.length, "len");
            if (array.length > 5) {
                unsorted_array = integerArray;
                // console.log(unsorted_array);
                numberOfBars = unsorted_array.length;
                prepareBarAndArray(false);
            }
            else {
                numberOfBars = 25;
                // prepareBarAndArray();
            }
        }
        disableButtons(true);
        let process,
            cancel;
        // console.log(unsorted_array[0]);
        switch (algorithmToUse){
            case "bubbleSort":
                process = bubbleSort(unsorted_array);
                notes = "";
                notes = "Bubble sort, also known as sinking sort, is the easiest sorting algorithm. It works on the idea of repeatedly comparing the adjacent elements, from left to right, and swapping them if they are out-of-order.<br>In bubble sort, the repetition continues till the list we get the sorted list. Bubble compares all the elements in a list successively and sorts them based on their values.<br>1. Start with the first element.<br>2.  Compare the current element with the next element.<br>3.  If the current element is greater than the next element, then swap both the elements. If not, move to the next element.<br>4.  Repeat steps 1 to 3 until we get the sorted list.<br>Bubble Sort Algorithm<br>Run a loop over the entire list or array.<br>Compare the element at the index i with the element at i + 1.<br>If the element at i is greater than the element at i + 1, swap both the elements<br>Else, move to the next element.<br>begin bubbleSort(array)<br>\tfor i = 0 to sizeof(array) - 1<br>\tfor j = 0 to sizeof(array) - i - 1<br>\t\tif array[j] > array[j+1]<br>\t\t\tswap(array[i], array[i+1])<br>\t\tend if<br>\tend for<br>\tend for<br>end bubbleSort<br>bubble sort usually necessitates n(n-1)/2 swaps or comparisons to achieve a sorted array.<br>The bubble sort algorithm's average/worst time complexity is O(n²), as we have to pass through the array as many times as there are pairs in a provided array. Therefore, when time is a factor, there may be better options.<br>Time complexity Worst Case: O(n²)<br>Time complexity Average Case: O(n²)<br>Time complexity Best Case: O(n), the array is already sorted<br>";
                break;
            case "insertionSort":
                process = insertionSort(unsorted_array);
                break;
            case "selectionSort":
                process = selectionSort(unsorted_array);
                break;
            case "mergeSort":
                process = mergeSort(unsorted_array); // in async function no need of this because we have to color it for entire array
                break;
            case "heapSort":
                process = heapSort(unsorted_array);
                break;
            case "quickSort":
                process = quickSort(unsorted_array, 0, unsorted_array.length - 1);
                parse = true;
                break;
            default:
                process = bubbleSort(unsorted_array);
                break;
        }
        
        
        cancel = false;
        let result = process.next();
        while (!result.done) {
            const [color, index] = result.value;
            // forMerge.push(index,color);
            await visualize(index, color);
            result = process.next();
            // console.log(result);
            if (cancel) {
                break;
            }
        }
        if (parse) {
            for (let i = 0; i < unsorted_array.length; i++) {
                await visualize(i, sorted);
            }
        }
        noteBtn.disabled = false;
        input.value = "";
        // console.log(unsorted_array + " fdgdsg");
        // console.log(forMerge);
        disableButtons(false);
        numberOfBars = 25;
        document.getElementById('note').innerHTML = "";
        document.getElementById('note').innerHTML += `<p>${notes}</p>`;
    }

    // unsorted_array = input.value;
    prepareBarAndArray(true);
    // console.log("real" + unsorted_array)
    sort_btn.addEventListener("click", startSort);
    random_array.addEventListener("click", prepareBarAndArray);
    speed.addEventListener("change", speedOfAlgorithm);
    selectAlgorithm.addEventListener("change", selectionOfAlgorithm);
    noteBtn.addEventListener("click", showNotes);
    copyButton.addEventListener("click", copyTextHandler);
});
/*
Bubble sort, also known as sinking sort, is the easiest sorting algorithm. It works on the idea of repeatedly comparing the adjacent elements, from left to right, and swapping them if they are out-of-order.
In bubble sort, the repetition continues till the list we get the sorted list. Bubble compares all the elements in a list successively and sorts them based on their values.
1Start with the first element.
2Compare the current element with the next element.
3If the current element is greater than the next element, then swap both the elements. If not, move to the next element.
4Repeat steps 1 – 3 until we get the sorted list.
Bubble Sort Algorithm
Run a loop over the entire list or array.
Compare the element at the index i with the element at i + 1.
If the element at i is greater than the element at i + 1, swap both the elements
Else, move to the next element.
begin bubbleSort(array)
 
   for i = 0 to sizeof(array) - 1    
 
    for j = 0 to sizeof(array) - i - 1
        if array[j] > array[j+1]
             swap(array[i], array[i+1])
        end if
     end for
   
   end for
 
end bubbleSort
 bubble sort usually necessitates n(n-1)/2 swaps or comparisons to achieve a sorted array.

The bubble sort algorithm’s average/worst time complexity is O(n²), as we have to pass through the array as many times as there are pairs in a provided array. Therefore, when time is a factor, there may be better options.

Time complexity Worst Case: O(n²)
Time complexity Average Case: O(n²)
Time complexity Best Case: O(n), the array is already sorted
*/
