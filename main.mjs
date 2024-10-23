import { Tree } from './bst.mjs';

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
    return;
    }
    if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

function printNode(node) {
    if (node) console.log(node.data);
}

const test = [1, 7, 23, 8, 9, 4, 3, 5, 67, 90, 45, 6, 36];
let tree = new Tree(test);
// Initialized tree (balanced)
prettyPrint(tree.root);
console.log(`Is Tree Balanced? ${tree.isBalanced()}`);

console.log('InOrder Traversal');
console.log(tree.inOrder(() => {}));

console.log('PreOrder Traversal');
console.log(tree.preOrder(() => {}));

console.log('PostOrder Traversal');
console.log(tree.postOrder(() => {}));

console.log('Make the tree unbalanced');
tree.insert(100);
tree.insert(200);
prettyPrint(tree.root);

console.log(`Is Tree Balanced? ${tree.isBalanced()}`);

console.log('Rebalance the tree');
tree.rebalance();
prettyPrint(tree.root);
console.log(`Is Tree Balanced? ${tree.isBalanced()}`);