import BinaryTreeNode from './binary-tree-node'

abstract class BinaryTree {
  // 树是否为空
  public static isEmpty(node: BinaryTreeNode | null): boolean {
    return node === null
  }

  // 树的大小
  public abstract size: (node: BinaryTreeNode | null) => number

  // 树的高度
  public static height(node: BinaryTreeNode | null): number {
    if (node === null) {
      return 0
    }
    const leftHeight = BinaryTree.height(node.left)
    const rightHeight = BinaryTree.height(node.right)
    return Math.max(leftHeight, rightHeight) + 1
  }

  // 先序遍历
  public static preOrder(node: BinaryTreeNode | null, callback?: Callback): BinaryTreeNode[] {
    const result: BinaryTreeNode[] = []
    if (node === null) {
      return result
    }
    result.push(node)
    BinaryTree.preOrder(node.left, (leftNode) => {
      result.push(leftNode)
      typeof callback === 'function' && callback(leftNode)
    })
    BinaryTree.preOrder(node.right, (rightNode) => {
      result.push(rightNode)
      typeof callback === 'function' && callback(rightNode)
    })
    return result;
  }

  // 中序遍历
  public static inOrder(node: BinaryTreeNode | null, callback?: Callback): BinaryTreeNode[] {
    if (node === null) return
    const result: BinaryTreeNode[] = []
    BinaryTree.inOrder(node.left, (leftNode) => {
      result.push(leftNode)
      typeof callback === 'function' && callback(leftNode)
    })
    result.push(node)
    BinaryTree.inOrder(node.right, (rightNode) => {
      result.push(rightNode)
      typeof callback === 'function' && callback(rightNode)
    })
    return result;
  }

  // 后序遍历
  public static postOrder(node: BinaryTreeNode | null, callback?: Callback): BinaryTreeNode[] {
    if (node === null) return
    const result: BinaryTreeNode[] = []
    BinaryTree.postOrder(node.left, (leftNode) => {
      result.push(leftNode)
      typeof callback === 'function' && callback(leftNode)
    })
    BinaryTree.postOrder(node.right, (rightNode) => {
      result.push(rightNode)
      typeof callback === 'function' && callback(rightNode)
    })
    result.push(node)
    return result;
  }
  
  // 层次遍历
  public abstract levelOrder: (node: BinaryTreeNode | null, callback?: Callback) => number[]

  // 插入
  public abstract insert: (node: BinaryTreeNode | null) => void

  // 移除
  public abstract remove: (node: BinaryTreeNode | null) => void

  // 找到最小节点
  public abstract findMin: (node: BinaryTreeNode | null) => BinaryTreeNode

  // 找到最大节点
  public abstract findMax: (node: BinaryTreeNode | null) => BinaryTreeNode

  // 找到节点
  public abstract findNode: (node: BinaryTreeNode | null, value: number) => BinaryTreeNode

  // 是否包含节点
  public abstract contains: (node: BinaryTreeNode | null, value: number) => boolean

  // 清理树
  public static clear(node: BinaryTreeNode | null): void {
    BinaryTree.postOrder(node, (treeNode) => {
      treeNode.left = null
      treeNode.right = null
    })
    node = null
  }
}

export default BinaryTree
