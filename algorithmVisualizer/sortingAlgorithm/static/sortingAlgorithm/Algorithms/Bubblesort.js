

const alpha = "lightgreen";
const beta = "green";
const sorted = "#AAFF00";
const unsorted = "#808000"
export default function* (array) {

    for (let i = 0;i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            yield [alpha, j];
            yield [beta, j + 1];

            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                yield [beta, j];
                yield [alpha, j + 1];
            }

            yield [unsorted, j];
            yield [unsorted, j + 1];
        }

        yield [sorted, array.length - i - 1];
    }
}