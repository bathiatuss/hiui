import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-setting-filled')

export const SettingFilled = forwardRef<SVGSVGElement | null, IconProps>(
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
          d="M576 106.666667a85.333333 85.333333 0 0 1 85.333333 85.333333v12.992c14.549333 7.082667 28.522667 15.168 41.813334 24.192l11.306666-6.506667a85.333333 85.333333 0 0 1 116.565334 31.232l64 110.848a85.333333 85.333333 0 0 1-31.232 116.565334l-11.306667 6.549333a346.304 346.304 0 0 1 0 48.234667l11.306667 6.570666a85.333333 85.333333 0 0 1 31.232 116.565334l-64 110.848a85.333333 85.333333 0 0 1-116.565334 31.232l-11.306666-6.506667c-13.290667 9.024-27.264 17.109333-41.813334 24.192V832a85.333333 85.333333 0 0 1-85.333333 85.333333h-128a85.333333 85.333333 0 0 1-85.333333-85.333333v-12.970667a340.970667 340.970667 0 0 1-41.834667-24.213333l-11.306667 6.506667a85.333333 85.333333 0 0 1-116.544-31.232l-64-110.848a85.333333 85.333333 0 0 1 31.232-116.565334l11.306667-6.570666a346.304 346.304 0 0 1 0-48.234667l-11.306667-6.549333a85.333333 85.333333 0 0 1-31.232-116.565334l64-110.848a85.333333 85.333333 0 0 1 116.565334-31.232l11.285333 6.506667c13.312-9.024 27.285333-17.109333 41.834667-24.213333V192a85.333333 85.333333 0 0 1 85.333333-85.333333h128z m-64 234.666666a170.666667 170.666667 0 1 0 0 341.333334 170.666667 170.666667 0 0 0 0-341.333334z"
          p-id="15381"
        ></path>
      </svg>
    )
  }
)

if (__DEV__) {
  SettingFilled.displayName = 'SettingFilled'
}
