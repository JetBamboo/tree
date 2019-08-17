import BinaryTree from "./binary-tree";
import BinaryTreeNode from "./binary-tree-node";

/**
 * 二叉搜索树（Binary Search Tree），又叫：二叉查找树，二叉排序树
 * 它或者是一棵空树，或者是具有下列性质的二叉树： 
 * 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 
 * 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 
 * 它的左、右子树也分别为二叉搜索树。
 */

class BinarySearchTreeNode {
  protected value: number;
  protected left: BinarySearchTreeNode | null;
  protected right: BinarySearchTreeNode | null;

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }

  // 插入
  public insert(node: BinarySearchTreeNode): boolean {
    if (node.value < this.value) {
      return this.left ? this.left.insert(node) : this.setLeftNode(node);
    }
    if (node.value > this.value) {
      return this.right ? this.right.insert(node) : this.setRightNode(node);
    }
    return false;
  }

  // 删除节点
  public remove(value: number): BinarySearchTreeNode | null {

    /**
     * 需要删的节点在左边
     * 如果左节点存在，那么就去删除左节点，并给this赋予新的左节点，并返回
     * 如果左节点不存在，说明要删的值不存在，返回null
     */
    if (value < this.value) {
      if (this.left) {
        this.left = this.left.remove(value)
        return this
      }
      return null
    }

    /**
     * 需要删的节点在右边
     * 如果右节点存在，那么就去删除右节点，并给this赋予新的右节点，并返回
     * 如果右节点不存在，说明要删的值不存在，返回null
     */
    if (value > this.value) {
      if (this.right) {
        this.right = this.right.remove(value)
        return this
      }
      return null
    }

    /**
     * 现在确定了value === this.value，也就是当前节点为需要删除的节点；
     * 当该节点同时存在左右子树时，找到右子树的最小节点，将其value赋值给this；
     * 同时根据该value去右子树删除那个节点；
     * 用替换value的方式来替换节点，所以需要返回this
     */
    if (this.left && this.right) {
      this.value = this.right.getMinNode().getValue()
      this.right = this.right.remove(this.value)
      return this
    }

    /**
     * 当只存在左子树或右子树时，返回该子树节点；
     * 同时如果左右子树均不存在，应当返回null；
     * 于是将两种情况可以归为一起写。
     * 
     * 解释：
     * 当left和right都不存在（为null）时，需要返回null，
     * 所以此时返回right是合理的。
     */
    return this.left ? this.left : this.right
  }

  // 转换为数组
  public toArray(): number[] {
    const result = []
    this.inorder((node: BinarySearchTreeNode) => result.push(node.getValue()))
    return result
  }

  // 获取大小
  public getSize(): number {
    return this.toArray().length
  }

  // 中序遍历
  public inorder(callback: Function): void {
    this.left && this.left.inorder(callback);
    callback(this);
    this.right && this.right.inorder(callback);
  }

  // 前序遍历
  public preorder(callback: Function): void {
    callback(this);
    this.left && this.left.preorder(callback);
    this.right && this.right.preorder(callback);
  }

  // 后序遍历
  public postorder(callback: Function): void {
    this.left && this.left.postorder(callback);
    this.right && this.right.postorder(callback);
    callback(this);
  }

  // 获取最小节点
  public getMinNode(): BinarySearchTreeNode {
    return this.left ? this.left.getMinNode() : this
  }

  // 获取最大节点
  public getMaxNode(): BinarySearchTreeNode {
    return this.right ? this.right.getMaxNode() : this
  }

  // 根据value获取节点
  public getNode(value: number): BinarySearchTreeNode | null {
    if (value < this.value) {
      return this.left.getNode(value);
    }
    if (value > this.value) {
      return this.right.getNode(value);
    }
    if (value === this.value) {
      return this;
    }
    return null;
  }

  // 根据value值判断节点是否存在
  public isNodeExsit(value: number): boolean {
    return !!this.getNode(value);
  }

  // 获取左节点
  public getLeftNode(): BinarySearchTreeNode | null {
    return this.left;
  }

  // 设置左节点
  public setLeftNode(node: BinarySearchTreeNode): boolean {
    return !!(this.left = node)
  }

  // 获取右节点
  public getRightNode(): BinarySearchTreeNode | null {
    return this.right
  }

  // 设置右节点
  public setRightNode(node: BinarySearchTreeNode): boolean {
    return !!(this.right = node)
  }

  // 获值
  public getValue(): number {
    return this.value;
  }

  // 设值
  public setValue(value: number): boolean {
    return !!(this.value = value)
  }
}

/**
 * 删除节点
 * TODO: 还不是很了解原理，建议多看几遍
 * @param {number} value 要删除的值
 * @param {BinarySearchTreeNode} node 父节点
 * @returns {BinarySearchTreeNode}
 */
function remove(value: number, node: BinarySearchTreeNode): BinarySearchTreeNode | null {

  const nodeLeft = node.getLeftNode()
  const nodeRight = node.getRightNode()
  let nodeNew = null

  // 啥都没找到，直接返回
  if (node === null) return null

  // 如果值比node小，去node的左节点找
  // 同时给node赋予新的左子树
  if (value < node.getValue())
    node.setLeftNode(remove(value, nodeLeft))

  // 如果值比node大，去node右节点找
  // 同时给node赋予新的右子树
  else if (value > node.getValue())
    node.setRightNode(remove(value, nodeRight))

  // 现在确定了当前node是我们需要删除的节点
  // 
  else if (nodeLeft !== null && nodeRight !== null) {
    
  }

  // 当左右子树均不存在时，将node置空即可
  else if (nodeLeft === null && nodeRight === null)
    nodeNew = null

  // 当值存在左子树或右子树时，只需要将子树与node替换即可
  else
    nodeNew = nodeLeft ? nodeLeft : nodeRight 

  return nodeNew
}

class BinarySearchTree {
  private size: number
  private root: BinarySearchTreeNode | null
  constructor(initValue?: number) {
    this.root = initValue ? new BinarySearchTreeNode(initValue) : null
  }
  public insert(data: number | number[]): boolean {
    if (this.root === null) {
      return false
    }
    let insertSuccess = Array.isArray(data)
      ? data.reduce((isPass: boolean, num: number) => {
        const ans = this.root.insert(new BinarySearchTreeNode(num))
        return !isPass ? isPass : ans
      }, true)
      : this.root.insert(new BinarySearchTreeNode(data))
    insertSuccess && this.size++
    return insertSuccess
  }
  public inorder(callback: Function): void {
    this.root && this.root.inorder(
      (node: BinarySearchTreeNode) => callback(node.getValue())
    )
  }
  public preorder(callback: Function): void {
    this.root && this.root.preorder(
      (node: BinarySearchTreeNode) => callback(node.getValue())
    )
  }
  public postorder(callback: Function): void {
    this.root && this.root.postorder(
      (node: BinarySearchTreeNode) => callback(node.getValue())
    )
  }
  public toArray(): number[] {
    return this.root ? this.root.toArray() : []
  }
  public getMin(): number {
    return this.root ? this.root.getMinNode().getValue() : NaN
  }
  public getMax(): number {
    return this.root ? this.root.getMaxNode().getValue() : NaN
  }
  public getRoot(): number {
    return this.root ? this.root.getValue() : NaN
  }
  public toString(): string {
    return `[${this.toArray().map((num: number) => num).join(',')}]`
  }
  public remove(value: number): boolean {
    // TODO: 只有一个元素判断
    if (!this.root || this.root.getValue() === value) {
      return false
    }
    return !!this.root.remove(value)
  }
}
