# Binary Search Tree

Apply data structure and recursion algorithms to implement binary search tree from scratch.

## Documentation

- `Tree` class contains root attribute which initializes the tree with `buildTree(array)` function.
- `buildTree(array)` builds a balanced binary search tree with given array.
- `insert(value)` and `deleteItem(value)` inserts/deletes a node with the given value.
- `find(value)` returns the node with the given value. Returns null otherwise.
- `levelOrder(callback)` traverses the tree depth-first and calls the callback function on each node.
- `inOrder(callback)`, `preOrder(callback)`, `postOrder(callback)` traverses the tree breadth-first and calls the callback function on each node.
- `height(node)` and `heightRecur(node)` both returns the height of the given node argument. 
Height is defined as the number of edges in the longest path from a given node to a leaf node (Implemented with iteration and recursion).
- `depth(node)` returns the given node's depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.
- `isBalanced()` checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
- `rebalance()` rebalances an unbalanced tree.

<br/>

Tree functions are showcased in main.mjs
```bash
node main.mjs
```