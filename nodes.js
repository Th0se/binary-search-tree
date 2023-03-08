const Node = (rootValue, leftArray, rightArray) => {
    // A factory to make a node 
    const result = {
        data: rootValue,
        left: leftArray,
        right: rightArray,
    };

    return result;
};

const mergeSort = (array) => {
    // A function to sort an array of numbers.
    if (array.length === 1) {
        return array;
    } else {
        const middlePoint = Math.floor(array.length / 2);
        const left = array.slice(0, middlePoint);
        const right = array.slice(middlePoint, array.length);
        const sortedLeft = mergeSort(left);
        const sortedRight = mergeSort(right);
        let result = [];
        let i = 0;
        let j = 0;
        while (result.length != array.length) {
            if (j === sortedRight.length) {
                result.push(sortedLeft[i]);
                i++;
            } else if (i === sortedLeft.length) {
                result.push(sortedRight[j]);
                j++;
            } else if (sortedLeft[i] > sortedRight[j]) {
                result.push(sortedRight[j]);
                j++;
            } else if (sortedLeft[i] < sortedRight[j]) {
                result.push(sortedLeft[i]);
                i++;
            } else if (sortedLeft[i] === sortedRight[j]) {
                result.push(sortedLeft[i]);
                i++;
            };
        };

        return result;
    };
};

const removeDuplicate = (array) => {
    // A function to remove duplicates.
    const encountered = new Set(array);
    const result = [...encountered];
    return result;
};

const buildTree = (array) => {
    // A function to build a binary search tree.
    if (array.length === 1) {
        return array;
    } else if (array.length === 0) {
        return null;
    } else {
        const strippedArray = removeDuplicate(array);
        // Remove duplicates in the array.
        const sortedArray = mergeSort(strippedArray);
        const middlePoint = Math.floor(sortedArray.length / 2);
        const left = sortedArray.slice(0, middlePoint);
        const right = sortedArray.slice(middlePoint+1, sortedArray.length);
        const leftBranch = buildTree(left);
        const rightBranch = buildTree(right);
        const result = {
            data: sortedArray[middlePoint],
            left: leftBranch,
            right: rightBranch
        };
        return result;
    };
};


const rawA = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const rawB = [53, 836, 86, 865, 486, 135];
const builtB = buildTree(rawB);
console.log(builtB);
console.log(builtB.left);
console.log(builtB.left.left);
console.log(builtB.left.right);
console.log(builtB.right);
console.log(builtB.right.left);
console.log(builtB.right.right);