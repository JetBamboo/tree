import 'mocha'
import { expect } from 'chai'
import BinarySearchTree from '../lib/binary-search-tree'

describe('BST二叉搜索树测试', () => {

  describe('初始化测试', () => {

    it('能够正确的创建对象', () => {
      const tree = new BinarySearchTree(5)
      expect(tree).is.instanceOf(BinarySearchTree)
      expect(tree.getRoot()).to.equal(5)
      expect(tree.getMax()).to.equal(5)
      expect(tree.getMin()).to.equal(5)
      expect(tree.toArray()).is.a('array')
      expect(tree.toArray()).is.lengthOf(1)
      expect(tree.toString()).is.a('string')
      expect(tree.toString()).is.equal('[5]')
    })

    it('能够正确创建空树', () => {
      const tree = new BinarySearchTree()
      expect(tree).is.instanceOf(BinarySearchTree)
      expect(tree.getRoot()).is.NaN
      expect(tree.getMax()).is.NaN
      expect(tree.getMin()).is.NaN
      expect(tree.toArray()).is.a('array')
      expect(tree.toArray()).is.lengthOf(0)
      expect(tree.toString()).is.a('string')
      expect(tree.toString()).is.equal('[]')
    })
  })

  describe('插入测试', () => {
    it('能够正确插入比root小的值', () => {
      const tree = new BinarySearchTree(4)
      tree.insert(2)
      expect(tree.toString()).is.equal('[2,4]')
      tree.insert(3)
      expect(tree.toString()).is.equal('[2,3,4]')
    })

    it('能够正确插入比root大的值', () => {
      const tree = new BinarySearchTree(4)
      tree.insert(5)
      expect(tree.toString()).is.equal('[4,5]')
    })

    it('不能够插入已存在的值', () => {
      const tree = new BinarySearchTree(4)
      expect(tree.insert(4)).is.false
      expect(tree.toString()).is.equal('[4]')
    })
  })

  describe('遍历测试', () => {
    
    it('能够进行中序遍历', () => {
      const tree = new BinarySearchTree(4)
      tree.insert([2, 1, 3, 6, 5])
      const arr = []
      tree.inorder(arr.push.bind(arr))
      expect(arr.toString()).is.equal('1,2,3,4,5,6')
    })

    it('能够进行前序遍历', () => {
      const tree = new BinarySearchTree(4)
      tree.insert([2, 1, 3, 6, 5])
      const arr = []
      tree.preorder(arr.push.bind(arr))
      expect(arr.toString()).is.equal('4,2,1,3,6,5')
    })

    it('能够进行后序遍历', () => {
      const tree = new BinarySearchTree(4)
      tree.insert([2, 1, 3, 6, 5])
      const arr = []
      tree.postorder(arr.push.bind(arr))
      expect(arr.toString()).is.equal('1,3,2,5,6,4')
    })
  })

  describe('计算测试', () => {

    it('能够获得最大值', () => {
      const tree = new BinarySearchTree(4)
      tree.insert([1, 2, 3, 4, 5, 6, 7])
      expect(tree.getMax()).is.equal(7)
    })

    it('能够获得最小值', () => {
      const tree = new BinarySearchTree(4)
      tree.insert([1, 2, 3, 4, 5, 6, 7]) 
      expect(tree.getMin()).is.equal(1)
    })
  })

  describe('特性测试', () => {

    it('插入顺序不影响中序遍历', () => {
      const tree = new BinarySearchTree(4)
      tree.insert([1, 2, 3, 4, 5, 6])
      const arr = []
      tree.inorder(arr.push.bind(arr))
      expect(arr.toString()).is.equal('1,2,3,4,5,6')
    })

    it('插入顺序影响前序遍历', () => {
      const tree = new BinarySearchTree(4)
      tree.insert([1, 2, 3, 4, 5, 6])
      const arr = []
      tree.preorder(arr.push.bind(arr))
      expect(arr.toString()).is.not.equal('1,2,3,4,5,6')
    })

    it('插入顺序影响后序遍历', () => {
      const tree = new BinarySearchTree(4)
      tree.insert([1, 2, 3, 4, 5, 6])
      const arr = []
      tree.postorder(arr.push.bind(arr))
      expect(arr.toString()).is.not.equal('1,2,3,4,5,6')
    })
  })
})
