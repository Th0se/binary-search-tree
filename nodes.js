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
    
    const insert = function (value, node = this.root) {
        // This method adds a value into a binary search tree.
        // Do not supply the parameter `node` when calling this method.
        if (value === node.data) {
            return;
        } else if (value > node.data) {
            if (node.right === null) {
                /* Change node.right from null to a node,
                    then assign the value into it.
                */
                node.right = Node(value, null, null);
            } else {
                insert(value, node.right)
            };
        } else if (value < node.data) {
            if (node.left === null) {
                /* Change node.left from a null to a node,
                    then assign the value into it.
                */
                node.left = Node(value, null, null);
            } else {
                insert(value, node.left)
            };
        };
    };

    const remove = function (value, node = this.root, parent) {
        // this method removes a node of certain value from a binary search tree.
        // Do not supply the parameter `node` and `parent` when calling this method.
        if (value === node.data) {
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
                if (node.right.right !== null) {
                    node.right = node.right.right
                } else {
                    node.right = node.right.left;
                };
            };
        } else if (value <= node.data) {
            remove(value, node.left, node);
        } else if (value >= node.data) {
            remove(value, node.right, node);
        };
    };

    const find = function (value, node = this.root) {
        /* This method returns a node of a binary search tree
            which contains a given value.
        */
        // Do not supply the node when calling this method.
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
        };
    };

    const levelOrder = function (node = this.root, result = [], queue = []) {
        /* This method returns an array containing the value
            of every node in a binary search tree.
        */
        // Supply no argument when calling this method.
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

    const inorder = function (node = this.root, result = []) {
        // This method performs an inorder binary search tree traversal.
        // Supply no argument when calling this method.
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

    const preorder = function (node = this.root, result = []) {
        // This method performs an preorder binary search tree traversal.
        // Supply no argument when calling this method.
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

    const postorder = function (node = this.root, result = []) {
        // This method performs a postorder binary search tree traversal.
        // Supply no argument when calling this method.
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

    const height = function (node = this.root) {
        // This method returns the height of a binary search tree.
        // Supply no argument whenc calling this method.
        if (node === null) {
            return 0;
        } else {
            if (node.root) {
                node = node.root;
            };
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

    const depth = function (node, root = this.root, nodeDepth = 0) {
        // This method returns the depth of a given node in a binary search tree.
        /* Do not supply the parameter `root` and `nodeDepth` when 
            calling this method.
        */
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

    const isBalanced = function (root = this.root) {
        // This method checks whether a binary search tree is balanced.
        const leftHeight = height(root.left);
        const rightHeight = height(root.right);
        const difference = Math.abs(leftHeight - rightHeight);
        if (difference <= 1) {
            return `The binary search tree is balanced. Diferrence: ${difference}`;
        } else {
            return `The binary search tree is not balanced. Difference: ${difference}`;
        };
    };

    const rebalance = function (tree = this) {
        // This method balances a binary search tree.
        const array = preorder(tree.root);
        const result = Tree(array);
        return result;
    };

    return {
        root,
        insert,
        remove,
        find,
        levelOrder,
        inorder,
        preorder,
        postorder,
        height,
        depth,
        isBalanced,
        rebalance,
    };
};