const Node = (rootValue, leftArray, rightArray) => {
    /* A factory to make a node for a binary search tree.
        This is to be used in functions that build a binary search tree.
    */
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
    // A function to remove duplicates from an array.
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
        const uniqueValues = removeDuplicate(array);
        // Remove duplicates in the array.
        const sortedUniqueValues = mergeSort(uniqueValues);
        const middlePoint = Math.floor(sortedUniqueValues.length / 2);
        const left = sortedUniqueValues.slice(0, middlePoint);
        const right = sortedUniqueValues.slice(middlePoint + 1, sortedUniqueValues.length);
        const leftBranch = buildTree(left);
        const rightBranch = buildTree(right);
        const result = Node(sortedUniqueValues[middlePoint], leftBranch, rightBranch)
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
    // A function to insert a number into a tree.
    /*  This is called on the root of a binary search tree,
        not the tree itself.
    */
    if (number === node.data) {
        return;
    } else if (number > node.data) {
        if (node.right === null) {
            /* Change node.right from null to a node,
                then assign the number into it.
            */
            node.right = Node(number, null, null);
        } else {
            insert(number, node.right)
        };
    } else if (number < node.data) {
        if (node.left === null) {
            /* Change node.left from a null to a node,
                then assign the number into it.
            */
            node.left = Node(number, null, null);
        } else {
            insert(number, node.left)
        };
    };
};

const remove = (number, node, parent) => {
    // A function to remove a number from a tree.
    /*  The parameter `parent` is not needed when calling the function.
        That parameter is only used when recursing.
    */
    /*  This function is called to the root of a binary search tree,
        not the tree itself.
    */
    if (number === node.data) {
        if (node.right === null) {
            if (node.left === null) {
                if (parent.left === node) {
                    parent.left = null;
                } else {
                    parent.right = null;
                };
            } else {
                node.data = node.left.data;
                node.left = node.left.left;
            };
        } else {
            node.data = node.right.data;
            if (!node.right.right === null) {
                node.right = node.right.right
            } else {
                node.right = node.right.left;
            };
        };
    } else if (number <= node.data) {
        remove(number, node.left, node);
    } else if (number >= node.data) {
        remove(number, node.right, node);
    };
};

const find = (value, node) => {
    /* A function to return the node containing the given value, if it exists.
        Otherwise, inform that the value does not exists.
    */
    // This function is called on the root of a tree, not the tree itself.

    if (node != null) {
        if (value === node.data) {
            return node;
        } else if (value < node.data) {
            return find(value, node.left);
        } else if (value > node.data) {
            return find(value, node.right);
        };
    } else {
        return `The value doesn't exist in this tree.`;
    }
};

const levelOrder = (node, result = [], queue = []) => {
    /* A function to return an array containing the value
        of every node in a binary search tree. 
    */
    //  This is called on the root of the tree, not the tree itself.
    /*  Do not supply the parameter `result` and `queue` when calling
        the function.
    */
    if (node === null) {
        return;
    } else {
        result.push(node.data);
        queue.push(node.left);
        queue.push(node.right);
        while (queue.length) {
            const currentLevel = queue[0];
            queue.shift();
            levelOrder(currentLevel, result, queue);
        };

        return result;
    };
};

const inorder = (node, result = []) => {
    // A function to do inorder binary search tree traversal.
    // Do not supply the parameter `result` when calling the function.
    // This function is called on the root of the tree.
    if (node === null) {
        return;
    } else {
        if (node.left) {
            inorder(node.left, result);
        };
        result.push(node.data);
        if (node.right) {
            inorder(node.right, result);
        };

        return result;
    };
};

const preorder = (node, result = []) => {
    // A function to do preorder binnary search tree traversal.
    // Do not supply the parameter `result` when calling the function.
    // The function is called on the root of the tree.
    if (node === null) {
        return;
    } else {
        result.push(node.data);
        if (node.left) {
            preorder(node.left, result);
        };
        if (node.right) {
            preorder(node.right, result);
        };

        return result;
    };
};

const postorder = (node, result = []) => {
    // A function to do postorder binnary search tree traversal.
    // Do not supply the parameter `result` when calling the function.
    // The function is called on the root of the tree.
    if (node === null) {
        return;
    } else {
        if (node.left) {
            postorder(node.left, result);
        };
        if (node.right) {
            postorder(node.right, result);
        };
        result.push(node.data);

        return result;
    };
};

const height = (node) => {
    // A function to return the height of a binary search tree.
    // Height is the length of the longest branch of a binary search tree.
    // Call this function on the root of the tree.
    if (node === null) {
        return 0;
    } else {
        let leftHeight = height(node.left);
        let rightHeight = height(node.right);
        if (leftHeight < rightHeight) {
            // Everytime it goes down a node, add one unit of height.
            rightHeight++;
            return rightHeight;
        } else {
            // Everytime it goes down a node, add one unit of height.
            /* As height is the length of the longest branch of a binary search tree,
                a branch must be chosen when the branches are of equal height. For this
                this function chooses the left branch's height if the left branch is the longest
                or if the branches are of equal height.
            */
            leftHeight++;
            return leftHeight;
        };
    };
};

const depth = (node, root, nodeDepth = 0) => {
    // A function to return the depth of a node in a binary search tree.
    // A depth is the number of edges in the path from the root to a particular node.
    if (node.data === root.data) {
        /* Since creating an exact copy of a desired node is difficult,
            I've decided to make this function accept an object containing `data`
            property. For example: {data: 5,}
        */
        return `Depth = ${nodeDepth}`;
    } else if (node.data > root.data) {
        nodeDepth++;
        return depth(node, root.right, nodeDepth);
    } else if (node.data < root.data) {
        nodeDepth++;
        return depth(node, root.left, nodeDepth);
    };
};

const isBalanced = (root) => {
    // A function to check whether a binary search tree is balanced.
    const leftHeight = height(root.left);
    const rightHeight = height(root.right);
    const difference = Math.abs(leftHeight - rightHeight);
    if (difference <= 1) {
        return `The binary search tree is balanced. Diferrence: ${difference}`;
    } else {
        return `The binary search tree is not balanced. Difference: ${difference}`;
    };
};

const rebalance = (tree) => {
    // A function to balance a binary search tree.
    const array = preorder(tree.root);
    const result = Tree(array);
    return result;
};