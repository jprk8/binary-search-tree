class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.arr = arr;
        this.root = this.buildTree(arr);
    }

    buildTree(arr) {
        arr.sort((a, b) => a - b);
        // Use Set object to store only unique values (remove duplicates)
        const sortedArray = [...new Set(arr)];
        return this.recurBST(sortedArray, 0, sortedArray.length - 1);
    }

    recurBST(arr, start, end) {
        // If start > end, then the subtree is done
        if (start > end) return null;
        let mid = Math.floor((start + end) / 2);
        let root = new Node(arr[mid]);
        root.left = this.recurBST(arr, start, mid - 1);
        root.right = this.recurBST(arr, mid + 1, end);
        return root;
    }
}

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

const test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(test);
prettyPrint(tree.root);