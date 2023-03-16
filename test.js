

const randomise = (value) => {
    let result = [];
    while (value > 0) {
        result.push(value);
        value--
    };

    return result;
};

const rawArray = randomise(100);

let bst = Tree(rawArray);

console.log(bst.isBalanced());
console.log(bst.levelOrder());
console.log(bst.preorder());
console.log(bst.inorder());
console.log(bst.postorder());

const unbalance = (number) => {
    while (number > 0) {
        bst.insert(number);
        number--;
    };
};

unbalance(6000);
console.log(bst.isBalanced());
bst = bst.rebalance();
console.log(bst.isBalanced());
console.log(bst.levelOrder());
console.log(bst.preorder());
console.log(bst.inorder());
console.log(bst.postorder());