export { Tree };

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
                 // same key already exists
                return;
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
                 // node is found
                break;
            }
        }
        // node does not exist, return
        if (cur === null) return cur;
        // If there is 0 or 1 child
        if (cur.left === null || cur.right === null) {
            let newCur = (cur.left === null) ? cur.right : cur.left;
            // Check if we're deleting the root
            if (parent === null) return newCur;
            (cur === parent.left) ? parent.left = newCur : parent.right = newCur;
        } else {
            // Node to be deleted has 2 children
            let successorParent = null;
            let successor = cur.right;
            while (successor.left != null) {
                successorParent = successor;
                successor = successor.left;
            }

            // If successor is the direct right child of the deleting node
            // successorParent remains null as we have initialized it
            // ELSE successorParent's left pointer will be successor's right child
            (successorParent === null) ? cur.right = successor.right : successorParent.left = successor.right;
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

    levelOrder(callback) {
        if (!callback) throw new Error('callback function required');
        const queue = [];
        queue.push(this.root);
        let cur = null;
        while (queue.length > 0) {
            cur = queue.shift();
            callback(cur);
            if (cur.left != null) queue.push(cur.left);
            if (cur.right != null) queue.push(cur.right);
        }
    }

    // Returning inOrder array for rebalancing
    inOrder(callback, root = this.root, arr = []) {
        if (!callback) throw new Error('callback function required');
        if (root === null) return;
        this.inOrder(callback, root.left, arr);
        callback(root);
        arr.push(root.data);
        this.inOrder(callback, root.right, arr);

        return arr;
    }

    preOrder(callback, root = this.root) {
        if (!callback) throw new Error('callback function required');
        if (root === null) return;
        callback(root);
        this.preOrder(callback, root.left);
        this.preOrder(callback, root.right);
    }

    postOrder(callback, root = this.root) {
        if (!callback) throw new Error('callback function required');
        if (root === null) return;
        this.postOrder(callback, root.left);
        this.postOrder(callback, root.right);
        callback(root);
    }

    // Modified version of levelOrder traversal
    // Make an array of current level nodes and increase height when transitioning to next level
    // e.g. when all level array items have been consumed and their children pushed to the queue.
    height(node) {
        if (node === null) return 0;
        let height = 0;
        let cur = null;
        let queue = [];
        let level = []; // copy the current queue over to keep track of levels
        level.push(node);
        while (level.length > 0) {
            for (let i = 0; i < level.length; i++) {
                cur = level[i];
                if (cur.left) queue.push(cur.left);
                if (cur.right) queue.push(cur.right);
            }
            level = queue.slice();
            queue = [];
            if (level.length > 0) height++;
        }
        return height;
    }

    heightRecur(node) {
        if (node === null) return -1;

        let heightL = this.heightRecur(node.left);
        let heightR = this.heightRecur(node.right);
        if (heightL > heightR) {
            return heightL + 1;
        } else {
            return heightR + 1;
        }
    }

    depth(node) {
        let depth = 0;
        let cur = null;
        let queue = [];
        let level = [];
        level.push(this.root);
        while (level.length > 0) {
            for (let i = 0; i < level.length; i++) {
                cur = level[i];
                // return current height (depth) when one of the level items matches the given node argument
                if (cur.data === node.data) return depth;
                if (cur.left) queue.push(cur.left);
                if (cur.right) queue.push(cur.right);
            }
            level = queue.slice();
            queue = [];
            if (level.length > 0) depth++;
        }
        return depth;
    }

    isBalanced(root = this.root) {
        if (root === null) return true;

        let lh = this.height(root.left);
        let rh = this.height(root.right);

        if (Math.abs(lh - rh) <= 1 && this.isBalanced(root.left) == true && this.isBalanced(root.right) == true) {
            return true;
        } else {
            return false;
        }
    }

    rebalance() {
        const sortedArray = this.inOrder((value) => value);
        this.root = this.buildTree(sortedArray);
    }
}
