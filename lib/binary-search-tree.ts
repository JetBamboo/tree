/**
 * 二叉搜索树（Binary Search Tree），又叫：二叉查找树，二叉排序树
 * 它或者是一棵空树，或者是具有下列性质的二叉树： 
 * 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 
 * 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 
 * 它的左、右子树也分别为二叉搜索树。
 */

import BinarySearchTreeNode from './binary-search-tree-node'

type Callback = (node: number) => void

export default class BinarySearchTree {
  private root: BinarySearchTreeNode | null

  constructor(initValue?: number) {
    this.root = typeof initValue !== 'undefined'
      ? new BinarySearchTreeNode(initValue)
      : null
  }

  public insert(data: number | number[]): void {
    if (!this.root)
      return

    if (Array.isArray(data))
      data.forEach(this.insert.bind(this))

    return this.insert(data)
  }

  public inOrder(callback: Callback): number[] {
    const result = [] as number[]

    this.root && this.root.inOrder((node: BinarySearchTreeNode) => {
      result.push(node.value)
      callback(node.value)
    })

    return result
  }

  public preorder(callback: Callback): number[] {
    const result = [] as number[]

    this.root && this.root.preOrder((node: BinarySearchTreeNode) => {
      result.push(node.value)
      callback(node.value)
    })

    return result
  }

  public postorder(callback: Callback): number[] {
    const result = [] as number[]

    this.root && this.root.postOrder((node: BinarySearchTreeNode) => {
      result.push(node.value)
      callback(node.value)
    })

    return result
  }

  public toArray(): number[] {
    return this.root ? this.root.toArray() : []
  }

  public getMin(): number {
    return this.root ? this.root.getMinNode().value : 0
  }

  public getMax(): number {
    return this.root ? this.root.getMaxNode().value : 0
  }

  public getRoot(): number {
    return this.root ? this.root.value : 0
  }

  public toString(): string {
    return `[${this.toArray().join(',')}]`
  }

  public remove(value: number): void {
    // 如果要删除的是根节点
    if (!this.root || this.root.value === value)
      return

    this.root.remove(value)
  }
}
