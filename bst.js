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

    // Iterative Insert
    insert(value) {
        const leaf = new Node(value);
        if (this.root === null) return;
        let parent = null;
        let cur = this.root;
        while (cur != null) {
            parent = cur;
            if (value < cur.data) {
                cur = cur.left;
            } else if (value > cur.data) {
                cur = cur.right;
            } else {
                return // same key already exists
            }
        }

        if (value < parent.data) {
            parent.left = leaf;
        } else {
            parent.right = leaf;
        }
    }

    // Iterative Delete
    deleteItem(value) {
        let cur = this.root;
        let parent = null;
        while (cur != null) {
            parent = cur;
            if (value < cur.data) {
                cur = cur.left;
            } else if (value > cur.data) {
                cur = cur.right;
            } else {
                break; // node is found
            }
        }

        if (cur === null) return cur; // node does not exist, return
        // If there is 0 or 1 child
        if (cur.left === null || cur.right === null) {
            let newCur = (cur.left === null) ? cur.right : cur.left;
            // Check if we're deleting the root
            if (parent === null) return newCur;
            (cur === parent.left) ? parent.left = newCur : parent.right = newCur;
        } else {
            // Node to be deleted has 2 children
            // Need to get the successor and its parent
            let successorParent = null;
            let successor = cur.right;
            while (successor.left != null) {
                successorParent = successor;
                successor = successor.left;
            }

            // If successor is the direct right child of the deleting node
            // successorParent remains null as we have initialized it
            if (successorParent === null) {
                cur.right = successor.right;
            } else {
                successorParent.left = successor.right;
            }

            // Replace the data(value)!
            cur.data = successor.data;
        }
    }

    find(value) {
        let cur = this.root;
        while (cur != null) {
            if(value < cur.data) {
                cur = cur.left;
            } else if (value > cur.data) {
                cur = cur.right;
            } else {
                // Node found
                return cur;
            }
        }
        // Node not found
        return cur;
    }

    inOrder(root) {
        if (root != null) {
            this.inOrder(root.left);
            console.log(root.data);
            this.inOrder(root.right);
        }
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
let tree = new Tree(test);

tree.insert(80);
tree.insert(90);
prettyPrint(tree.root);

tree.deleteItem(8);
prettyPrint(tree.root);