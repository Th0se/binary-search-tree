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
        return Node(array[0], null, null);
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
        const result = Node(sortedArray[middlePoint], leftBranch, rightBranch)
        return result;
    };
};

const Tree = (array) => {
    /* A factory to make an object which has the root
        of a binary search tree
    */
    const root = buildTree(array);
    return {
        root,
    };
};

const insert = (number, node) => {
    // A function to insert a number into a tree
    if (number === node.data) {
        return;
    } else if (number > node.data) {
        if (node.right === null) {
            node.right = Object(node.right);
            node.right.data = number;
            node.right.right = null;
            node.right.left = null;
        } else {
            insert(number, node.right)
        };
    } else if (number < node.data) {
        if (node.left === null) {
            node.left = Object(node.left);
            node.left.data = number;
            node.left.left = null;
            node.left.right = null;
        } else {
            insert(number, node.left)
        };
    };
};