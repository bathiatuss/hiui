
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-jpg-colorful')

export const JpgColorful = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, ...rest }, ref) => {
    const cls = cx(prefixCls, className)

    return (
      <svg className={cls} ref={ref} role="icon" {...rest}     viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M643.669333 110.336l205.994667 205.994667A85.333333 85.333333 0 0 1 874.666667 376.682667V810.666667a128 128 0 0 1-128 128H277.333333a128 128 0 0 1-128-128V213.333333a128 128 0 0 1 128-128h305.984a85.333333 85.333333 0 0 1 60.352 25.002667z" fill="#0DAEFF" /><path d="M554.666667 128v234.666667a42.666667 42.666667 0 0 0 42.666666 42.666666h234.666667c38.016 0 57.045333-45.952 30.165333-72.832l-234.666666-234.666666C600.618667 70.954667 554.666667 89.984 554.666667 128z" fill="#8EE4FE" /><path d="M373.930667 551.509333V518.613333h-35.626667v32.853334h35.626667z m-40 207.488c15.850667 0 26.453333-3.285333 31.872-9.877333 5.418667-6.570667 8.128-16.746667 8.128-30.506667v-150.229333h-35.626667v149.610667c0 4.906667-0.896 8.234667-2.688 9.941333-1.792 1.706667-4.437333 2.56-7.936 2.56-0.64 0-1.408 0-2.24-0.064a148.181333 148.181333 0 0 1-4.266667-0.298667v28.501334c3.2 0.064 5.824 0.149333 7.957334 0.234666 2.133333 0.085333 3.733333 0.128 4.8 0.128z m108.138666-1.365333v-70.997333c3.733333 5.76 7.573333 10.112 11.498667 13.12 7.168 5.418667 16.170667 8.106667 26.986667 8.106666 17.002667 0 30.912-6.272 41.685333-18.858666 10.794667-12.586667 16.213333-30.869333 16.213333-54.869334 0-22.762667-5.546667-40-16.576-51.754666a53.376 53.376 0 0 0-40.448-17.621334c-10.901333 0-20.330667 3.029333-28.245333 9.109334a57.173333 57.173333 0 0 0-12.245333 14.016v-20.138667h-34.133334v189.866667h35.264z m29.12-79.637333c-6.826667 0-12.757333-1.877333-17.749333-5.610667-8.426667-6.421333-12.629333-17.557333-12.629333-33.386667 0-10.005333 1.258667-18.24 3.754666-24.746666 4.821333-12.245333 13.696-18.368 26.624-18.368 10.752 0 18.517333 4.053333 23.317334 12.117333 4.778667 8.085333 7.189333 17.365333 7.189333 27.882667 0 12.736-2.602667 22.954667-7.829333 30.613333-5.205333 7.68-12.757333 11.52-22.677334 11.52z m148.757334 81.749333c28.821333 0 48.32-7.68 58.496-22.997333 5.909333-8.917333 8.874667-22.165333 8.874666-39.744v-129.258667h-34.624v19.626667c-5.333333-9.578667-12.330667-16.170667-21.013333-19.754667a46.933333 46.933333 0 0 0-17.877333-3.114667c-18.496 0-32.789333 6.890667-42.88 20.693334-10.069333 13.781333-15.104 30.805333-15.104 51.050666 0 21.013333 5.226667 37.653333 15.68 49.941334 10.453333 12.288 24.448 18.432 41.941333 18.432 11.328 0 20.544-2.709333 27.626667-8.106667 3.904-2.922667 7.573333-7.296 10.986666-13.141333v8.746666c0 13.013333-1.408 22.250667-4.245333 27.754667-4.330667 8.576-12.906667 12.885333-25.749333 12.885333-9.088 0-15.530667-1.642667-19.370667-4.885333-2.24-1.834667-3.882667-4.821333-4.885333-9.002667h-38.741334c1.173333 13.589333 7.253333 23.786667 18.261334 30.634667 10.986667 6.826667 25.194667 10.24 42.624 10.24z m2.730666-84.992c-12.48 0-21.162667-5.76-25.984-17.258667a52.778667 52.778667 0 0 1-4.010666-21.12c0-9.173333 1.258667-16.853333 3.754666-23.125333 4.757333-11.733333 13.376-17.621333 25.877334-17.621333 9.173333 0 16.469333 3.370667 21.930666 10.133333 5.461333 6.741333 8.192 16.576 8.192 29.482667 0 13.76-2.88 23.786667-8.618666 30.08-5.76 6.272-12.8 9.429333-21.12 9.429333z" fill="#FFFFFF" /></svg>
    )
  }
)

if (__DEV__) {
  JpgColorful.displayName = 'JpgColorful'
}
