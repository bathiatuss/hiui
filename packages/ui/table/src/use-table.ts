import { cloneTree, groupByTreeDepth, flattenTree } from '@hi-ui/tree-utils'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useUncontrolledState } from '@hi-ui/use-uncontrolled-state'
import {
  HeaderRowFunc,
  TableColumnItem,
  TableFrozenColumnOptions,
  TableRowEventData,
  TableRowSelection,
} from './types'
import { PaginationProps } from '@hi-ui/pagination'
import { useColWidth } from './hooks/use-col-width'

import { getMaskItemsWIdth, parseFixedColumns, setColumnsDefaultWidth } from './utils'
import { isArrayNonEmpty, isNullish } from '@hi-ui/type-assertion'
import { useCheck, useSelect } from '@hi-ui/use-check'
import { invariant } from '@hi-ui/env'
import { useAsyncSwitch, useExpand } from './hooks'
import { useColumns } from './hooks/use-colgroup'
import { setAttrStatus } from '@hi-ui/dom-utils'
import { useCache } from '@hi-ui/use-cache'
import { useTableDrag } from './hooks/use-drag'

const DEFAULT_COLUMNS = [] as []
const DEFAULT_DATA = [] as []
const DEFAULT_ERROR_ROW_KEYS = [] as []
const DEFAULT_HIGHLIGHTED_ROW_KEYS = [] as []
const DEFAULT_HIGHLIGHTED_COL_KEYS = [] as []
const DEFAULT_CHECKED_ROW_KEYS = [] as any[]
const DEFAULT_EXPAND_ROW_KEYS = [] as []
const DEFAULT_ROW_SELECTION = {} as TableRowSelection
const DEFAULT_ALLOW = () => true

export const useTable = ({
  data = DEFAULT_DATA,
  columns: columnsProp = DEFAULT_COLUMNS,
  fixedToColumn,
  rowSelection,
  striped = false,
  resizable = false,
  size,
  errorRowKeys = DEFAULT_ERROR_ROW_KEYS,
  highlightedRowKeys: highlightedRowKeysProp,
  highlightedColKeys: highlightedColKeysProp,
  defaultExpandRowKeys = DEFAULT_EXPAND_ROW_KEYS,
  expandRowKeys: expandRowKeysProp,
  onExpand,
  defaultExpandAll = false,
  // expandERowKeys: expandRowKeysProp,
  expandEmbedRowKeys: expandEmbedRowKeysProp,
  onEmbedExpand,
  onHeaderRow,
  expandedRender,
  maxHeight,
  dataSource,
  showColMenu,
  showColHighlight,
  sticky,
  stickyTop = 0,
  onLoadChildren,
  rowExpandable = DEFAULT_ALLOW,
  scrollWidth,
  draggable = false,
  fieldKey = 'key',
  onDragStart,
  onDrop: onDropProp,
  onDropEnd,
  emptyContent,
}: UseTableProps) => {
  /**
   * 获取 key 字段值
   */
  const getRowKeyField = React.useCallback(
    (item: any) => {
      const val = item[fieldKey]
      invariant(
        !isNullish(val),
        'Not found for the unique %s attribute in each row of data prop.',
        fieldKey
      )
      return val
    },
    [fieldKey]
  )

  // ********************** cache *********************** //

  const [cacheData, setCacheData] = useCache(data)
  const [columns, setColumns] = useCache(columnsProp)

  /**
   * 扁平化数据，支持树形 table
   */
  const flattedData = useMemo(() => {
    const clonedData = cloneTree(cacheData)

    // @ts-ignore
    return flattenTree(clonedData, (node: any) => {
      // TODO: flattenTree 内置了 id 结构，需要处理 key 映射为 id
      return { ...node, id: getRowKeyField(node.raw) }
    })
  }, [cacheData, getRowKeyField])

  // ********************** 树形表格 *********************** //

  const [transitionData, onExpandTreeRowsChange, isExpandTreeRows] = useExpand(
    flattedData,
    defaultExpandRowKeys,
    expandRowKeysProp,
    onExpand,
    defaultExpandAll
  )

  // 异步展开子树
  const [isLoadingTreeNodeId, onTreeNodeSwitch] = useAsyncSwitch(
    setCacheData,
    onExpandTreeRowsChange,
    onLoadChildren
  )

  // ********************** 内嵌式面板 *********************** //

  /**
   * 行内嵌面板展开
   */
  const [expandEmbedRows, trySetExpandEmbedRows] = useUncontrolledState(
    // 展开全部
    [],
    expandEmbedRowKeysProp,
    onEmbedExpand
  )

  const [onExpandEmbedRowsChange, isExpandEmbedRows] = useCheck({
    checkedIds: expandEmbedRows,
    onCheck: trySetExpandEmbedRows as any,
    idFieldName: 'key',
  })

  // 异步展开内嵌面板

  // ************************ 拖拽 ************************ //

  const { onDrop, dragRowRef } = useTableDrag({
    cacheData,
    setCacheData,
    draggable,
    flattedData,
    onDropEnd,
    onDrop: onDropProp,
  })

  // ************************ colgroup ************************ //

  const {
    flattedColumns,
    mergedColumns: mergedColumns2,
    // groupedColumns,
    // flattedColumnsWithoutChildren,
  } = useColumns({ columns })

  // ************************ 列冻结 ************************ //

  // 冻结列
  // const [leftFrozenColKeys, setLeftFrozenColKeys] = useState<React.ReactText[]>([])
  // const [rightFrozenColKeys, setRightFrozenColKeys] = useState<React.ReactText[]>([])

  // 冻结列总宽度
  const [leftFrozenColWidth, setLeftFrozenColWidth] = useState(0)
  const [rightFrozenColWidth, setRightFrozenColWidth] = useState(0)

  const [fixedColWidth, setFixedColWidth] = useState<number[]>([])
  const firstRowElementRef = useRef<HTMLTableRowElement>(null)

  const bodyTableRef = useRef<HTMLTableElement>(null)
  const scrollBodyElementRef = useRef<HTMLTableElement>(null)

  /**
   * 左右 fixed 所在的列，抹平数据结构
   *
   * TODO: 支持 2 种模式：从左往右冻结到指定列、只抽离并冻结指定列
   */
  const fixedToColumnMemo = React.useMemo(() => {
    if (!fixedToColumn) return {}
    if (typeof fixedToColumn === 'string') return { left: fixedToColumn }
    return fixedToColumn
  }, [fixedToColumn])

  const {
    leftFrozenColKeys,
    rightFrozenColKeys,
    columns: mergedColumns1,
    leftFixedColumnsWidth,
    rightFixedColumnsWidth,
    // scrollRight,
    // scrollLeft,
  } = React.useMemo(() => {
    const { left: leftFrozenColKey, right: rightFrozenKey } = fixedToColumnMemo

    // 获取左右冻结列的下标
    let leftFrozenColIndex: number | undefined
    let rightFrozenColIndex: number | undefined

    mergedColumns2.some((column, index) => {
      if (typeof leftFrozenColKey === 'string' && leftFrozenColKey === column.dataKey) {
        // 指向原始 column 根节点序列
        leftFrozenColIndex = column.rootIndex
      }

      if (typeof rightFrozenKey === 'string' && rightFrozenKey === column.dataKey) {
        rightFrozenColIndex = column.rootIndex
      }

      return leftFrozenColIndex !== undefined && rightFrozenColIndex !== undefined
    })

    let nextColumns = cloneTree(mergedColumns2)

    // TODO: 为什么冻结列，需要设置默认宽度
    if (
      typeof leftFrozenColIndex === 'number' ||
      typeof rightFrozenColIndex === 'number' ||
      scrollWidth
    ) {
      // const lastColumns = flattedColumns.filter((item) => {
      //   return Array.isArray(item.children)  true
      // })

      const lastColumns = mergedColumns2

      nextColumns = setColumnsDefaultWidth(
        nextColumns,
        scrollWidth ? scrollWidth / lastColumns.length : 100
      )
    }

    let leftColumns = [] as any[]
    // 左侧
    if (typeof leftFrozenColIndex === 'number') {
      leftColumns = nextColumns.slice(0, leftFrozenColIndex + 1)
      leftColumns.forEach((currentItem, index) => {
        parseFixedColumns(
          currentItem,
          index,
          leftColumns,
          'leftStickyWidth',
          expandedRender || rowSelection
        )

        nextColumns[index] = currentItem
      })
    }

    const leftFixedColumnsWidth = getMaskItemsWIdth(leftColumns)

    // 右侧
    let rightColumns = [] as any[]
    if (typeof rightFrozenColIndex === 'number') {
      rightColumns = nextColumns.slice(rightFrozenColIndex).reverse()

      rightColumns.forEach((currentItem, index) => {
        const _item = parseFixedColumns(
          currentItem,
          index,
          rightColumns,
          'rightStickyWidth',
          expandedRender || rowSelection
        )

        nextColumns[nextColumns.length - 1 - index] = _item
      })
    }

    const rightFixedColumnsWidth = getMaskItemsWIdth(rightColumns)

    // console.log('tableWidth, tableBodyWidth', tableWidth, tableBodyWidth)
    console.log({
      leftFrozenColKeys: leftColumns,
      rightFrozenColKeys: rightColumns,
      columns: nextColumns,
      leftFixedColumnsWidth,
      rightFixedColumnsWidth,
    })

    return {
      leftFrozenColKeys: leftColumns,
      rightFrozenColKeys: rightColumns,
      columns: nextColumns,
      leftFixedColumnsWidth,
      rightFixedColumnsWidth,
      // scrollRight: tableWidth - tableBodyWidth,
      // scrollLeft: 0,
    }
  }, [mergedColumns2, fixedToColumnMemo, rowSelection, expandedRender, scrollWidth])

  const [scrollSize, setScrollSize] = useState({ scrollLeft: 0, scrollRight: 1 })

  useEffect(() => {
    // 计算冻结列的宽度
    // mutationObserver
    const tableWidth = bodyTableRef.current?.getBoundingClientRect?.().width ?? 0
    const tableBodyWidth = scrollBodyElementRef.current?.getBoundingClientRect?.().width ?? 0
    const scrollRight = tableWidth - tableBodyWidth
    // const scrollLeft = 0

    setScrollSize((prev) => ({
      scrollLeft: prev.scrollLeft,
      scrollRight,
    }))
  }, [leftFrozenColKeys, rightFrozenColKeys])

  /**
   * 同步 双 table 左右滚动偏移
   */
  const syncScrollLeft = React.useCallback(
    (scrollLeft, syncTarget) => {
      let scrollRight = scrollSize.scrollRight
      if (syncTarget && syncTarget.scrollLeft !== scrollLeft) {
        syncTarget.scrollLeft = scrollLeft
      }
      if (
        bodyTableRef &&
        bodyTableRef.current &&
        scrollBodyElementRef &&
        scrollBodyElementRef.current &&
        isArrayNonEmpty(rightFrozenColKeys)
      ) {
        const { right: tableTefRight } = bodyTableRef.current.getBoundingClientRect()
        const { right } = scrollBodyElementRef.current.getBoundingClientRect()

        scrollRight = tableTefRight - right
      }

      setScrollSize({ scrollLeft, scrollRight })
    },
    [rightFrozenColKeys, scrollSize]
  )

  const scrollHeaderElementRef = useRef<HTMLTableElement>(null)

  const onTableBodyScroll = React.useCallback(
    (evt) => {
      evt.stopPropagation()
      if (scrollBodyElementRef.current) {
        syncScrollLeft(scrollBodyElementRef.current.scrollLeft, scrollHeaderElementRef.current)
      }
    },
    [syncScrollLeft]
  )

  // 1. 对于 sticky 的元素，触发滚轮滚动，需要模拟 onScroll 触发，比如 tableHeader 固定吸顶时
  // 2. 同时不允许其出现滚动条
  const onTableBodyScrollMock = React.useCallback(
    (evt) => {
      if (!scrollHeaderElementRef.current) return

      evt.stopPropagation()

      const { deltaX } = evt

      scrollHeaderElementRef.current.scrollLeft = scrollHeaderElementRef.current.scrollLeft + deltaX
      syncScrollLeft(scrollHeaderElementRef.current.scrollLeft, scrollBodyElementRef.current)
    },
    [syncScrollLeft]
  )

  // // 同步滚动条
  // const stickyHeaderRef = useRef(null)
  // const leftFixedscrollBodyElementRef = useRef(null)
  // const rightFixedscrollBodyElementRef = useRef(null)

  // const hiTable = useRef(null)
  // const [activeSorterColumn, setActiveSorterColumn] = useState(null)
  // const [activeSorterType, setActiveSorterType] = useState(null)

  // ************************ 列高亮 ************************ //

  /**
   * 控制列高亮，依据 column 中的 dataKey 控制
   */
  const [highlightedColKeys, trySetHighlightedColKeys] = useUncontrolledState(
    DEFAULT_HIGHLIGHTED_COL_KEYS,
    highlightedColKeysProp
  )

  const [onHighlightedColChange, isHighlightedCol] = useCheck({
    checkedIds: highlightedColKeys,
    onCheck: trySetHighlightedColKeys as any,
    idFieldName: 'dataKey',
  })

  /**
   * 设置列 hover 时高亮，依据 column 中的 dataKey 控制
   * 与 highlightedColKeys 互不影响
   */
  const [hoveredColKey, setHoveredColKey] = useState<React.ReactText>('')

  const [onHoveredColChange, isHoveredCol] = useSelect({
    selectedId: hoveredColKey,
    onSelect: setHoveredColKey,
    idFieldName: 'dataKey',
  })

  // ************************ 列宽 resizable ************************ //

  const { getColgroupProps, onColumnResizable, setHeaderTableElement, colWidths } = useColWidth({
    data,
    columns,
    resizable,
    dataSource,
    firstRowElementRef,
    isHoveredCol,
  })

  // ************************ 行高亮 ************************ //

  /**
   * 控制行高亮，依据 data 中的 key 控制
   */
  const [highlightedRowKeys, trySetHighlightedRowKeys] = useUncontrolledState(
    DEFAULT_HIGHLIGHTED_ROW_KEYS,
    highlightedRowKeysProp
  )
  const [onHighlightedRowChange, isHighlightedRow] = useCheck({
    checkedIds: highlightedRowKeys,
    onCheck: trySetHighlightedRowKeys as any,
    idFieldName: 'key',
  })

  const isErrorRow = useCallback((key: string) => errorRowKeys.includes(key), [errorRowKeys])

  const [eachRowHeight, setEachRowHeight] = useState({})
  const loadChildren = useRef(null)

  // const isStickyHeaderRef = useRef(false)
  // isStickyHeaderRef.current = flattedColumns.some((col) => {
  //   return typeof col.leftStickyWidth !== 'undefined' || typeof col.rightStickyWidth !== 'undefined'
  // })

  // 末级 column
  const flattedColumnsWithoutChildren = React.useMemo(() => {
    return mergedColumns1.filter((col) => !isArrayNonEmpty(col.children))
  }, [mergedColumns1])

  const groupedColumns = groupByTreeDepth(mergedColumns1)

  const getStickyColProps = React.useCallback((column) => {
    const { rightStickyWidth, leftStickyWidth, align } = column
    const sticky = typeof rightStickyWidth !== 'undefined' || typeof leftStickyWidth !== 'undefined'

    return {
      style: {
        position: sticky ? 'sticky' : undefined,
        textAlign: align,
        right: rightStickyWidth + 'px',
        left: leftStickyWidth + 'px',
        // backgroundColor: '#fff',
      },
      'data-sticky': setAttrStatus(sticky),
    }
  }, [])

  return {
    isErrorRow,
    bodyTableRef,
    scrollBodyElementRef,
    columns: mergedColumns1,
    data: cacheData,
    transitionData,
    flattedColumns,
    flattedColumnsWithoutChildren,
    fixedColWidth,
    expandedRender,
    // 行多选
    rowSelection,
    cacheData,
    firstRowElementRef,
    // ui
    // 有表头分组那么也要 bordered
    bordered: flattedColumns.length > columns.length,
    size,

    scrollHeaderElementRef,
    errorRowKeys: [],
    // 冻结列
    onTableBodyScroll,
    onTableBodyScrollMock,
    // freezeColKeys,
    // setFreezeColKeys,
    scrollSize,
    leftFrozenColKeys,
    rightFrozenColKeys,
    // fixedColumnsWidth,
    leftFixedColumnsWidth,
    rightFixedColumnsWidth,
    ...scrollSize,
    getColgroupProps,
    getStickyColProps,
    // 行高亮
    onHighlightedRowChange,
    isHighlightedRow,
    highlightedRowKeys,
    trySetHighlightedRowKeys,
    // 列高亮
    onHighlightedColChange,
    isHighlightedCol,
    highlightedColKeys,
    trySetHighlightedColKeys,
    // 列 hover
    showColHighlight,
    isHoveredCol,
    onHoveredColChange,
    // 行拖拽
    draggable,
    highlightColumns: [],
    dragRowRef,
    onDrop,
    // alignLeftColumns,
    groupedColumns,
    // 子树展开
    onExpandTreeRowsChange,
    isExpandTreeRows,
    isLoadingTreeNodeId,
    onTreeNodeSwitch,
    // 内嵌面板展开
    onExpandEmbedRowsChange,
    isExpandEmbedRows,
    rowExpandable,
    resizable,
    colWidths,
    onColumnResizable,
  }
}

export interface UseTableProps {
  /**
   *  表格数据
   */
  data?: object[]
  /**
   *  指定 data 表格数据中某一属性为 key
   */
  fieldKey?: string
  /**
   *  表格列配置信息
   */
  columns?: TableColumnItem[]
  /**
   *  是否显示边框（表头分组模式下，表格自带边框）
   */
  bordered?: boolean
  /**
   *  是否支持表头吸顶
   */
  sticky?: boolean
  /**
   *  表头吸顶距离视口顶部距离
   */
  stickyTop?: number
  /**
   *  高亮列（受控）
   */
  highlightedColKeys?: string[]
  /**
   *  表格展开项
   */
  expandedRender?: (
    record: TableColumnItem,
    index: number
  ) => React.ReactNode | Promise<React.ReactNode>
  /**
   *  设置是否允许行展开
   */
  rowExpandable?: (record: TableColumnItem) => React.ReactNode
  /**
   *  树形表格展开的行（受控）
   */
  expandRowKeys?: React.ReactText[]
  /**
   *  树形表格默认展开的行
   */
  defaultExpandRowKeys?: React.ReactText[]
  /**
   *  树形表格展开时的回调函数
   */
  onExpand?: (expandIds: React.ReactText[], targetRow: TableRowEventData, expanded: boolean) => void
  /**
   *  内嵌式表格展开的行（受控）
   */
  expandEmbedRowKeys?: React.ReactText[]
  /**
   *  内嵌式表格默认展开的行
   */
  defaultExpandEmbedRowKeys?: React.ReactText[]
  /**
   *  内嵌式表格展开时的回调函数
   */
  onEmbedExpand?: (
    expandIds: React.ReactText[],
    targetRow: TableColumnItem,
    expanded: boolean
  ) => void
  /**
   *  表格最大高度，当穿过该高度时，展示滚动条且表头固定
   */
  maxHeight?: number
  /**
   *  表格列冻结设置，为 string 时仅支持从左侧冻结至某一列
   */
  fixedToColumn?: string | TableFrozenColumnOptions
  /**
   *  配置表格尺寸
   */
  size?: string
  /**
   *  表格分页配置项
   */
  pagination?: PaginationProps
  /**
   *  错误列（受控）
   */
  errorRowKeys?: string[]
  /**
   *  高亮行（受控）
   */
  highlightedRowKeys?: React.ReactText[]
  /**
   *  行可选（受控）
   */
  rowSelection?: TableRowSelection
  /**
   *  异步数据源
   */
  // dataSource?: (current: number) => TableDataSource
  /**
   *  是否支持列操作
   */
  showColMenu?: boolean
  /**
   *  是否展示为斑马纹效果
   */
  striped?: boolean
  /**
   *  是否集成控制面板功能
   */
  setting?: boolean
  /**
   *  数据为空时的展示内容
   */
  emptyContent?: React.ReactNode
  /**
   *  是否能够动态控制列宽
   */
  resizable?: boolean
  /**
   *  加载中状态
   */
  loading?: boolean
  /**
   *  表格滚动的宽度（当表格总设置宽度（含自适应列）大于表格父级容器宽度时需要设置）**3.7.0 版本以后，该属性不建议使用**
   */
  scrollWidth?: number
  /**
   *  表格某一列`hover`时，该列高亮
   */
  showColHighlight?: boolean
  /**
   *  表格行可拖拽
   */
  draggable?: boolean
  /**
   * 唯一 id 前缀，废弃
   */
  uniqueId?: string
  onHeaderRow?: HeaderRowFunc
  onDragStart?: (rowData: object) => void
  onDrop?: (
    dragRowData: object,
    dropRowData: object,
    data: object,
    level: Level
  ) => boolean | Promise<any>
  onDropEnd?: (dragRowData: object, dropRowData: object, data: object) => void
  expandedRowKeys?: string[]
  defaultExpandAll?: boolean
  extra?: React.ReactNode
}

export type UseTableReturn = ReturnType<typeof useTable>
