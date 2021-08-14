import React, { useState, useCallback } from 'react'
import { FlattedCascaderItem } from '../types'
/**
 * 支持搜索功能的 hook
 */
export const useSearch = (data: FlattedCascaderItem[]) => {
  const [searchValue, setSearchValue] = useState('')
  const [matchedNodes, setMatchedNodes] = useState<FlattedCascaderItem[]>([])

  const handleChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const nextSearchValue = evt.target.value

      setSearchValue(nextSearchValue)
      // 匹配到搜索的节点，将这些节点进行展开显示，其它均隐藏
      const matchedNodes = getMatchedNodes(data, nextSearchValue)
      setMatchedNodes(matchedNodes)
    },

    // using latest Ref
    [data]
  )

  const inputProps = {
    value: searchValue,
    onChange: handleChange,
  }

  const isSearch = !!searchValue
  const isEmpty = isSearch && matchedNodes.length < 1

  return [isSearch, matchedNodes, inputProps, isEmpty] as const
}

/**
 * 从 value 中 找到指定的 options（逐层查找）
 */
const getMatchedNodes = (
  flattedData: FlattedCascaderItem[],
  searchValue: string
): FlattedCascaderItem[] => {
  if (!searchValue) return []

  return flattedData.filter((node) => {
    if (typeof node.title !== 'string') return false
    // 匹配策略：`String.include`
    return node.title.includes?.(searchValue)
  })
}
