type Callback = (node: BinarySearchTreeNode) => void

export default class BinarySearchTreeNode {
  value: number;
  left: BinarySearchTreeNode | null;
  right: BinarySearchTreeNode | null;

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }

  // 插入
  public insert(value: number): void {
    if (value < this.value) {
      this.left
        ? (this.left = new BinarySearchTreeNode(value))
        : this.left.insert(value)
    }
    if (value > this.value) {
      this.right
        ? (this.right = new BinarySearchTreeNode(value))
        : this.right.insert(value)
    }
  }

  // 删除节点
  // 该操作直接删除root会带来Bug，需要Tree协助
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
      this.value = this.right.getMinNode().value
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
    this.inOrder((node: BinarySearchTreeNode) => result.push(node.value))
    return result
  }

  // 获取大小
  public getSize(): number {
    return 1
      + (this.left ? this.left.getSize() : 0)
      + (this.right ? this.right.getSize() : 0)
  }

  // 获取高度
  public getHeight(): number {
    return 1 + Math.max(
      this.left ? this.left.getHeight() : 0,
      this.right ? this.right.getHeight() : 0
    )
  }

  // 中序遍历
  public inOrder(callback: Callback): void {
    this.left && this.left.inOrder(callback)
    callback(this)
    this.right && this.right.inOrder(callback)
  }

  // 前序遍历
  public preOrder(callback: Callback): void {
    callback(this)
    this.left && this.left.preOrder(callback)
    this.right && this.right.preOrder(callback)
  }

  // 后序遍历
  public postOrder(callback: Callback): void {
    this.left && this.left.postOrder(callback)
    this.right && this.right.postOrder(callback)
    callback(this)
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
    if (value < this.value && this.left) {
      return this.left.getNode(value);
    }
    if (value > this.value && this.right) {
      return this.right.getNode(value);
    }
    if (value === this.value) {
      return this;
    }
    return null;
  }

  // 根据value值判断节点是否存在
  public contains(value: number): boolean {
    return !!this.getNode(value);
  }
}
