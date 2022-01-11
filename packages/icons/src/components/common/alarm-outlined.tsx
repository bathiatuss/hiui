import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-alarm-outlined')

export const AlarmOutlined = forwardRef<SVGSVGElement | null, IconProps>(
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
          d="M149.333333 917.333333a42.666667 42.666667 0 1 1 0-85.333333h21.333334V448c0-188.522667 152.810667-341.333333 341.333333-341.333333s341.333333 152.810667 341.333333 341.333333v384h21.333334a42.666667 42.666667 0 1 1 0 85.333333H149.333333zM512 192c-139.2 0-252.458667 111.125333-255.914667 249.493333L256 448v384h512V448c0-139.2-111.125333-252.458667-249.493333-255.914667L512 192z m0 85.333333a170.666667 170.666667 0 0 1 170.581333 165.333334L682.666667 448v106.666667a42.666667 42.666667 0 0 1-85.226667 3.2L597.333333 554.666667v-106.666667a85.333333 85.333333 0 0 0-85.333333-85.333333 42.666667 42.666667 0 1 1 0-85.333334z"
          p-id="39095"
        ></path>
      </svg>
    )
  }
)

if (__DEV__) {
  AlarmOutlined.displayName = 'AlarmOutlined'
}
