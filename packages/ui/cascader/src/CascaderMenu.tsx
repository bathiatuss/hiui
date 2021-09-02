import React, { useCallback } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import {
  FlattedCascaderItem,
  CascaderItemEventData,
  CascaderItemRequiredProps,
  CascaderItem,
} from './types'
import { defaultLeafIcon, defaultLoadingIcon, defaultSuffixIcon } from './icons'
import Checkbox from '@hi-ui/checkbox'
import { useCascaderContext } from './context'
import { getCascaderItemEventData, getNodeAncestors } from './utils'

const _role = 'cascader-menu'
const _prefix = getPrefixCls(_role)

export const CascaderMenu = ({
  prefixCls = _prefix,
  role = _role,
  className,
  data: menu,
  getCascaderItemRequiredProps,
}: CascaderMenuProps) => {
  const {
    flatted = false,
    changeOnSelect = false,
    disabled: disabledContext = false,
    onLoadChildren,
    expandTrigger,
    onCheck,
    onSelect,
    titleRender,
  } = useCascaderContext()

  const renderTitle = useCallback(
    (option: CascaderItemEventData) => {
      // 如果 titleRender 返回 `true`，则使用默认 title
      const title = titleRender ? titleRender(option) : true

      if (title !== true) {
        return title
      }

      return flatted ? (
        <span className={cx(`title__text`, `title__text--cols`)}>
          {getNodeAncestors(option)
            .reverse()
            .map((item, index) => {
              return (
                <span className={`title__text--col`} key={item.id}>
                  {item.title}
                </span>
              )
            })}
        </span>
      ) : (
        <span className={`title__text`}>{option.title}</span>
      )
    },
    [titleRender, flatted]
  )

  const isCheckableMenu = menu.some(({ checkable }) => checkable)
  const cls = cx(prefixCls, className, isCheckableMenu && `${prefixCls}--checkable`)

  return (
    <ul className={cls} role={role}>
      {menu.map((option) => {
        const eventOption = getCascaderItemEventData(option, getCascaderItemRequiredProps(option))
        const { selected, checked, loading, semiChecked } = eventOption
        const disabled = disabledContext || option.disabled

        const optionCls = cx(
          `${prefixCls}-option`,
          option.checkable && checked && `${prefixCls}-option--checked`,
          selected && `${prefixCls}-option--selected`,
          loading && `${prefixCls}-option--loading`,
          disabled && `${prefixCls}-option--disabled`
        )

        return (
          <li role="menu-item" className={`${prefixCls}-item`} key={option.id}>
            <div
              className={optionCls}
              onClick={(evt) => {
                if (disabled) return

                onSelect?.(eventOption)
                if (changeOnSelect) {
                  onCheck?.(eventOption, !checked)
                }
              }}
              onMouseEnter={(evt) => {
                if (expandTrigger === 'hover') {
                  onSelect?.(eventOption)
                }
              }}
            >
              {option.checkable ? (
                <Checkbox
                  className={`${prefixCls}-checkbox`}
                  indeterminate={semiChecked}
                  checked={checked}
                  disabled={disabled || option.disabledCheckbox}
                  onClick={(evt) => evt.stopPropagation()}
                  onChange={(evt) => {
                    onCheck?.(eventOption, !checked)
                    onSelect?.(eventOption)
                  }}
                />
              ) : null}
              {renderTitle(eventOption)}
              {flatted ? null : renderSuffix(prefixCls, option, loading, onLoadChildren)}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export interface CascaderMenuProps {
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
  /**
   * 设置选择项数据源
   */
  data: FlattedCascaderItem[]
  /**
   * 自定义渲染节点的 title 内容
   */
  titleRender?: (item: FlattedCascaderItem) => React.ReactNode
  /**
   * 获取级联选项必要状态
   */
  getCascaderItemRequiredProps: (option: FlattedCascaderItem) => CascaderItemRequiredProps
}

/**
 * 渲染菜单子项的展开提示图标
 */
const renderSuffix = (
  prefixCls: string,
  node: FlattedCascaderItem,
  loading: boolean,
  onLoadChildren?: (item: CascaderItemEventData) => Promise<CascaderItem[] | void> | void
) => {
  if (loading) {
    return (
      <span className={cx(`${prefixCls}-switcher`, `${prefixCls}-switcher--loading`)}>
        {defaultLoadingIcon}
      </span>
    )
  }

  const hasChildren = node.children && node.children.length > 0
  const canLoadChildren = onLoadChildren && !node.children && !node.isLeaf

  if (hasChildren || canLoadChildren) {
    return (
      <span className={cx(`${prefixCls}-switcher`)} style={{ transform: `rotate(-90deg)` }}>
        {defaultSuffixIcon}
      </span>
    )
  }

  return (
    <span className={cx(`${prefixCls}-switcher`, `${prefixCls}-switcher--noop`)}>
      {defaultLeafIcon}
    </span>
  )
}
