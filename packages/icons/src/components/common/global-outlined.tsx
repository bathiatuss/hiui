import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-global-outlined')

export const GlobalOutlined = forwardRef<SVGSVGElement | null, IconProps>(
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
          d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m107.946667 597.354667H404.053333c8.682667 34.538667 19.946667 65.92 33.429334 92.842667C464.256 829.12 492.885333 853.333333 512 853.333333c19.114667 0 47.744-24.213333 74.517333-77.802666 13.482667-26.922667 24.746667-58.304 33.429334-92.842667zM316.437333 682.666667h-100.096a342.826667 342.826667 0 0 0 147.904 137.109333 457.301333 457.301333 0 0 1-17.642666-38.293333l-4.885334-12.416a613.930667 613.930667 0 0 1-24.277333-81.813334L316.437333 682.666667z m491.221334 0h-100.117334l-0.981333 4.586666a613.930667 613.930667 0 0 1-24.277333 81.813334l-4.885334 12.416c-5.482667 13.482667-11.392 26.261333-17.642666 38.293333A342.72 342.72 0 0 0 807.658667 682.666667zM302.933333 426.666667H181.418667A341.952 341.952 0 0 0 170.666667 512c0 29.461333 3.733333 58.069333 10.752 85.333333l121.514666 0.021334a843.2 843.2 0 0 1-4.224-76.864L298.666667 512c0-29.226667 1.472-57.770667 4.266666-85.333333z m332.309334 0H388.757333A757.888 757.888 0 0 0 384 512c0 29.226667 1.642667 57.834667 4.757333 85.354667h246.485334c3.114667-27.52 4.757333-56.106667 4.757333-85.354667 0-29.226667-1.642667-57.813333-4.757333-85.333333z m207.36 0H721.066667c2.794667 27.562667 4.266667 56.106667 4.266666 85.333333s-1.472 57.770667-4.266666 85.354667h121.514666C849.6 570.026667 853.333333 541.44 853.333333 512c0-29.44-3.733333-58.048-10.752-85.333333zM364.224 204.245333l-2.346667 1.130667A342.848 342.848 0 0 0 216.32 341.333333h100.117333l1.002667-4.586666a613.930667 613.930667 0 0 1 24.277333-81.813334l4.885334-12.416c5.482667-13.482667 11.392-26.261333 17.642666-38.293333zM512 170.666667c-19.114667 0-47.744 24.213333-74.517333 77.802666-13.482667 26.922667-24.746667 58.325333-33.429334 92.864h215.893334c-8.661333-34.56-19.946667-65.92-33.429334-92.864-25.792-51.605333-53.290667-75.968-72.362666-77.696L512 170.666667z m147.754667 33.557333l2.453333 4.778667c5.333333 10.624 10.432 21.802667 15.189333 33.493333l4.885334 12.437333c9.536 25.237333 17.706667 52.650667 24.277333 81.813334l0.981333 4.586666h100.138667a342.826667 342.826667 0 0 0-147.925333-137.109333z"
          p-id="39635"
        ></path>
      </svg>
    )
  }
)

if (__DEV__) {
  GlobalOutlined.displayName = 'GlobalOutlined'
}
