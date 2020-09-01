import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
import Button from '../../../components/button'
import Switch from '../../../components/switch'
import Icon from '../../../components/icon'
const desc = '状态识别，常见于功能或模块、板块启用，设置参数等'
const prefix = 'switch-base'
const code = `import React from 'react'
import Switch from '@hi-ui/hiui/es/switch'
import Button from '@hi-ui/hiui/es/button'\n
class Demo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: true,
      disabled: true
    }
  }
  onChange (status) {
    console.log(status)
  }
  render () {
    return (
      <div>
        <p>默认</p>
        <Switch />
        <p>自定义内容</p>
        <Switch content={['ON', 'OFF']} onChange={() => console.log('change')}/>
        <p>自定义图标 </p>
        <Switch content={[<Icon name='check' />, <Icon name='close' />]}/>
      </div>
    )
  }
}`

const DemoBase = () => (
  <DocViewer
    code={code}
    scope={{ Button, Switch, Icon }}
    prefix={prefix}
    desc={desc}
  />
)
export default DemoBase
