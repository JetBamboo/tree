export default class BinarySearchTreeNode {
  public value: number
  public left: BinarySearchTreeNode | null
  public right: BinarySearchTreeNode | null

  public constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }

  // 树是否为空
  public static isEmpty(node: BinarySearchTreeNode | null): boolean {
    return false
  }

  // 树的大小
  public size: (node: BinarySearchTreeNode | null) => number {
  }

  // 树的高度
  public static height(node: BinarySearchTreeNode | null): number {
    if (node === null) {
      return 0
    }
    const leftHeight = BinaryTree.height(node.left)
    const rightHeight = BinaryTree.height(node.right)
    return Math.max(leftHeight, rightHeight) + 1
  }

  // 先序遍历
  public static preOrder(node: BinarySearchTreeNode | null, callback?: Callback): BinarySearchTreeNode[] {
    const result: BinarySearchTreeNode[] = []
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
  public static inOrder(node: BinarySearchTreeNode | null, callback?: Callback): BinarySearchTreeNode[] {
    if (node === null) return
    const result: BinarySearchTreeNode[] = []
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
  public static postOrder(node: BinarySearchTreeNode | null, callback?: Callback): BinarySearchTreeNode[] {
    if (node === null) return
    const result: BinarySearchTreeNode[] = []
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
  public abstract levelOrder: (node: BinarySearchTreeNode | null, callback?: Callback) => number[]

  // 插入
  public abstract insert: (node: BinarySearchTreeNode | null) => void

  // 移除
  public abstract remove: (node: BinarySearchTreeNode | null) => void

  // 找到最小节点
  public abstract findMin: (node: BinarySearchTreeNode | null) => BinarySearchTreeNode

  // 找到最大节点
  public abstract findMax: (node: BinarySearchTreeNode | null) => BinarySearchTreeNode

  // 找到节点
  public abstract findNode: (node: BinarySearchTreeNode | null, value: number) => BinarySearchTreeNode

  // 是否包含节点
  public abstract contains: (node: BinarySearchTreeNode | null, value: number) => boolean

  // 清理树
  public static clear(node: BinarySearchTreeNode | null): void {
    BinaryTree.postOrder(node, (treeNode) => {
      treeNode.left = null
      treeNode.right = null
    })
    node = null
  }
}