import React, { forwardRef, useCallback, useMemo, useState } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { CascaderItem, ExpandTrigger, FlattedCascaderItem, NodeRoot } from './types'
import { debounce } from './utils'
import { CascaderOption } from './CascaderOption'
import { CascaderProvider } from './context'
import { getActiveMenus } from './utils/index'

const _role = 'cascader-menus'
const _prefix = getPrefixCls(_role)

/**
 * TODO: What is CascaderMenus
 */
export const CascaderMenus = forwardRef<HTMLDivElement | null, CascaderMenusProps>(
  (
    {
      prefixCls = _prefix,
      role = _role,
      className,
      children,
      overlayClassName,
      data,
      value,
      onChange,
      expandTrigger = 'click',
      ...rest
    },
    ref
  ) => {
    const [selectedIds, setSelectedIds] = useState<React.ReactText[]>([])

    const onOptionSelect = useCallback((option: FlattedCascaderItem) => {
      setSelectedIds((prev) => {
        console.log(option)
        const nextSelectedIds = prev.slice(0, option.depth)
        nextSelectedIds.push(option.id)
        return nextSelectedIds
      })
    }, [])

    const onOptionCheck = useCallback(
      (option, index, shouldSelected, evt) => {
        console.log('onOptionSelect', evt, option, index)
        let nextMenuValue = value[index] || []

        if (shouldSelected) {
          if (nextMenuValue.indexOf(option.id) === -1) {
            nextMenuValue = nextMenuValue.concat(option.id)
          }
        } else {
          nextMenuValue = nextMenuValue.filter((item) => item !== option.id)
        }

        const nextValue = [...value]
        nextValue[index] = nextMenuValue

        onChange(nextValue)
        onOptionSelect(option)
      },
      [value, onChange, onOptionSelect]
    )

    const providedValue = useMemo(
      () => ({
        expandTrigger,
        onCheck: onOptionCheck,
        onSelect: onOptionSelect,
      }),
      [expandTrigger, onOptionCheck, onOptionSelect]
    )

    const cls = cx(prefixCls, overlayClassName, className)

    const menus = getActiveMenus(data, selectedIds)

    return (
      <CascaderProvider value={providedValue}>
        <div ref={ref} role={role} className={cls} {...rest}>
          {menus.map((menu, menuIdx) => {
            const menuValue = value[menuIdx]
            return (
              <ul className={`${prefixCls}-menu`} key={menuIdx}>
                {menu.map((option) => {
                  const selected = menuValue.indexOf(option.id) !== -1
                  return (
                    <li className={`${prefixCls}-menu__item`} key={option.id}>
                      <CascaderOption data={option} menuIndex={menuIdx} selected={selected} />
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </div>
      </CascaderProvider>
    )
  }
)

export interface CascaderMenusProps {
  /**
   * 组件默认的选择器类
   */
  prefixCls?: string
  /**
   * 组件的语义化 Role 属性
   */
  role?: string
  /**
   * 组件的注入选择器类
   */
  className?: string
  /**
   * 组件的注入样式
   */
  style?: React.CSSProperties
  overlayClassName?: string
  /**
   * 设置选择项数据源
   */
  data: FlattedCascaderItem[]
  /**
   * 设置当前选中值
   */
  value: React.ReactText[][]
  onSelect?: () => void
  /**
   * 次级菜单的展开方式
   */
  expandTrigger?: ExpandTrigger
}

if (__DEV__) {
  CascaderMenus.displayName = 'CascaderMenus'
}
