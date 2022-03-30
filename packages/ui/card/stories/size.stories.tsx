import Button from '@hi-ui/button'
import React from 'react'
import Card from '../src'

export const Size = () => {
  return (
    <>
      <h1>Size</h1>
      <div className="card-size__wrap">
        <h2>常规</h2>
        <Card title="标题" size="md" extra={<Button appearance="link">链接</Button>}>
          <div
            style={{
              height: 174,
              backgroundColor: '#F5F7FA',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            此处展示卡片内容
          </div>
        </Card>
        <br />
        <h2>紧凑</h2>
        <Card title="标题" size="sm" extra={<Button appearance="link">链接</Button>}>
          <div
            style={{
              height: 174,
              backgroundColor: '#F5F7FA',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            此处展示卡片内容
          </div>
        </Card>
      </div>
    </>
  )
}
