import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-duplicate-filled')

export const DuplicateFilled = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, ...rest }, ref) => {
    const cls = cx(prefixCls, className)

    return (
      <svg
        className={cls}
        ref={ref}
        role="icon"
        {...rest}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        version="1.1"
      >
        <path
          d="M618.666667 277.333333a128 128 0 0 1 127.914666 123.2L746.666667 405.333333v384a128 128 0 0 1-123.2 127.914667L618.666667 917.333333H234.666667a128 128 0 0 1-127.914667-123.2L106.666667 789.333333V405.333333a128 128 0 0 1 123.2-127.914666L234.666667 277.333333h384z m-192 149.333334a42.666667 42.666667 0 0 0-42.666667 42.666666v85.333334h-85.333333a42.666667 42.666667 0 1 0 0 85.333333h85.333333v85.333333a42.666667 42.666667 0 1 0 85.333333 0v-85.333333h85.333334a42.666667 42.666667 0 1 0 0-85.333333h-85.333334v-85.333334a42.666667 42.666667 0 0 0-42.666666-42.666666zM789.333333 106.666667a128 128 0 0 1 127.914667 123.2L917.333333 234.666667v384a128 128 0 0 1-123.2 127.914666L789.333333 746.666667v-85.333334a42.666667 42.666667 0 0 0 42.56-39.466666L832 618.666667V234.666667a42.666667 42.666667 0 0 0-39.466667-42.56L789.333333 192H405.333333a42.666667 42.666667 0 0 0-42.56 39.466667L362.666667 234.666667h-85.333334a128 128 0 0 1 123.2-127.914667L405.333333 106.666667h384z"
          p-id="44756"
        ></path>
      </svg>
    )
  }
)

if (__DEV__) {
  DuplicateFilled.displayName = 'DuplicateFilled'
}
