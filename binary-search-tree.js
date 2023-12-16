const e = require("cors");
const { matchPath } = require("react-router-dom");
const { threadId } = require("worker_threads");

class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let current  = this,root;
    while (true) {
      if (val === current.val) return undefined;
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current.right
      }
    }
 
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, node = this.root) {
    if (this.root == null) {
      this.root = new Node(val);
      return this;
    }
    if (val < node.val) {
      if (node.left === null) {
        node.left = new Node(val);
      } else {
        this.insertRecursively(val,node.left);
      }
    } else if (val > node.val) {
      if (node.right === null ) {
        node.right = new Node(val);
      }
    } else {
      this.insertRecursively(val, node.right);
    }
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      }else {
        current = current.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val,node = this.root) {
    if (!node) return undefined;
    if (val === node.val) return node;
    if (val < node.val) {
      return this.findRecursively(val,node.left);
    } else {
      return this.findRecursively(val,node.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let visited = [];
    const traverse = (node) => {
      visited.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);

    }
    traverse(this.root);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let visited = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      visited.push(node.val);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let visited = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.val);
    }
    traverse(this.root);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let node = this.root;
    let queue = [];
    let data = [];
    queue.push(node);
    
    while (queue.length) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(enode.right);
    }
    return data;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    this.root = this._removNode(this.root,val);
    return this;
  }
  _removNode(node,val) {
    if (node === null) {
      return null;
    }
    if (val >  node.left) {
      node.left = this._removNode(node.left,val)
    } else if (val < node.right ) {
      node.right = this._removNode(node.right,val)
    } else {
      // Node with  no children
      if (node === null && node.right === null) { 
        return null;
      }
      // Node with one chil
      if (node.left == null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
      // Node with 2 children
      node.val = this._findMinVal(node.right)
      node.right = this._findMinVal(node.right,node.val)
    }
    return node;
  }

_findMinValue(node) {
  let minV = node.val;
  while (node.left !== null) {
    minV = node.left.val;
    node = node.left;
  }
  return minV;
}
  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    return this._checkHeight(this.root) !== -1;
  }
  _checkHeight(node) {
  if (node === null) {
    return 0;
  }
  let leftHeight = this._checkHeight(node.left);
  if (leftHeight === -1) {
    return -1;
  }
  let rightHeight = this._checkHeight(node.right);
  if (rightHeight === -1) {
    return -1;
  }
  if (Math.abs(leftHeight - rightHeight) > 1) {
    return -1;
  }
  return Math.max(leftHeight, rightHeight) + 1;
}

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
  if (!this.root || (!this.root.left && !this.root.right)) {
    return undefined; // Tree is too small
  }

  let current = this.root;
  while (current) {
    // Current is second highest if its right child is highest and has no right child
    if (current.right && !current.right.right && !current.right.left) {
      return current.val;
    }

    // If current has no right child, the second highest is the highest in left subtree
    if (!current.right) {
      return this._findMaxValue(current.left);
    }

    current = current.right;
  }
}

_findMaxValue(node) {
  while (node.right) {
    node = node.right;
  }
  return node.val;
}

}

module.exports = BinarySearchTree;
