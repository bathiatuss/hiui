import {
  CascaderItem,
  FlattedCascaderItem,
  FlattedCascaderItemWithChildren,
  NodeRoot,
} from '../types'
import React from 'react'

export const debounce = <T extends (...args: any[]) => void>(func?: T, delay = 150) => {
  let timer = 0

  const cancel = () => {
    if (timer) {
      window.clearTimeout(timer)
      timer = 0
    }
  }

  const debounceFn = (...args: any[]) => {
    if (timer) {
      cancel()
    }

    if (func) {
      timer = window.setTimeout(() => {
        func.apply(null, args)
        timer = 0
      }, delay)
    }
  }

  debounceFn.cancel = cancel

  return debounceFn as T & { cancel: () => void }
}

/**
 * 扁平化树数据结构，基于前序遍历
 *
 * @param treeData
 * @returns
 */
export const flattenTreeData = (treeData: CascaderItem[]) => {
  const flattedTreeData: FlattedCascaderItem[] = []

  const dig = (node: CascaderItem, depth: number, parent: FlattedCascaderItemWithChildren) => {
    const {
      id,
      title,
      children,
      checkable = true,
      isLeaf = false,
      disabled = false,
      disabledCheckbox = false,
    } = node

    const flattedNode: FlattedCascaderItem = {
      id,
      title,
      depth,
      parent,
      raw: node,
      isLeaf,
      disabled,
      disabledCheckbox,
      checkable,
      // pos: flattedTreeData.length,
    }

    flattedTreeData.push(flattedNode)

    if (children) {
      const childDepth = depth + 1

      flattedNode.children = children.map((child) => {
        return dig(child, childDepth, flattedNode as FlattedCascaderItemWithChildren)
      })
    }

    return flattedNode
  }

  // @ts-ignore
  const treeRoot: NodeRoot<FlattedCascaderItem> = getTreeRoot()
  // @ts-ignore
  treeRoot.children = treeData.map((node) => dig(node, 0, treeRoot))

  return flattedTreeData
}

const getTreeRoot = () => {
  return {
    depth: -1,
  }
}

export const getNodeAncestors = (node: FlattedCascaderItem) => {
  const ancestors: FlattedCascaderItem[] = []

  while (node.parent) {
    ancestors.push(node)
    node = node.parent
  }
  return ancestors
}

export const getActiveMenus = (data: FlattedCascaderItem[], selectedIds: React.ReactText[]) => {
  const menu: FlattedCascaderItem[][] = []

  if (data.length === 0) return []

  // 从 value 中 找到指定的 options（逐层查找）
  const dig = (data: FlattedCascaderItem[], depth: number) => {
    menu.push(data)

    for (let i = 0; i < data.length; i++) {
      const node = data[i]
      // 找到下一级
      if (selectedIds[depth] === node.id) {
        if (node.children) {
          dig(node.children, depth + 1)
        }
        break
      }
    }
  }

  const root = data[0].parent
  dig(root!.children, 0)

  return menu
}
