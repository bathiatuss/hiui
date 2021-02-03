import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
import Select from '../../../components/select'
import Tooltip from '../../../components/tooltip'
const prefix = 'alert-autoClose'
const rightOptions = ['基础', '受控', '带默认值', '可清空', '无边框', '禁用']
const desc = '展示从多个收起的备选项中选出的一个选项'
const code = [
  {
    code: `import React from 'react'
import Select from '@hi-ui/hiui/es/select'\n
class Demo extends React.Component {
  constructor () {
    super()
    this.state = {
      value: '3',
      singleList: [
        { title:'电视', id:'3', disabled: true },
        { title:'手机', id:'2' },
        { title:'笔记本笔记本笔记本笔记本笔记本笔记本', id:'4' },
        { title:'生活周边', id:'5' },
        { title:'办公', id:'6' },
      ]
    }
  }
  getTextWidth(str) {
      let result = 0;
      let ele = document.createElement("div");
      ele.style.position = "absolute";
      ele.style.whiteSpace = "nowrap";
      ele.style.fontSize = '14px';
      ele.style.opacity = 0;
      ele.innerText = str;
      document.body.append(ele);
      result = ele.getBoundingClientRect().width;
      document.body.removeChild(ele);
      return result;
   }
  render () {
    const { value, singleList } = this.state
    return (
      <Select
        type='single'
        clearable={false}
        style={{ width: 200 }}
        data={singleList}
        render={(item)=>{
          const {title} = item
          const width = this.getTextWidth(title)
          console.log('width', width)
          return width > 174 ?<Tooltip title={title} className={'hi-select__dropdown--item__name'}>
          <div className={'hi-select__dropdown--item__name'} style={{ width: '168px'}}>{title}</div>
          </Tooltip> : <div className={'hi-select__dropdown--item__name'}   >title</div>
        }}
      />
    )
  }
}`,
    opt: ['基础']
  },
  {
    code: `import React from 'react'
import Select from '@hi-ui/hiui/es/select'\n
class Demo extends React.Component {
  constructor () {
    super()
    this.state = {
      value: '3',
      singleList: [
        { title:'电视', id:'3', disabled: true },
        { title:'手机', id:'2' },
        { title:'笔记本', id:'4', disabled: true },
        { title:'生活周边', id:'5' },
        { title:'办公', id:'6' },
      ]
    }
  }

  render () {
    const { value, singleList } = this.state
    return (
      <Select
        type='single'
        clearable={false}
        style={{ width: 200 }}
        data={singleList}
        disabled
      />
    )
  }
}`,
    opt: ['禁用']
  },
  {
    code: `import React from 'react'
import Select from '@hi-ui/hiui/es/select'\n
class Demo extends React.Component {
  constructor () {
    super()
    this.state = {
      value: '3',
      singleList: [
        { title:'电视', id:'3', disabled: true },
        { title:'手机', id:'2' },
        { title:'笔记本', id:'4', disabled: true },
        { title:'生活周边', id:'5' },
        { title:'办公', id:'6' },
      ]
    }
  }

  render () {
    const { value, singleList } = this.state
    return (
      <Select
        type='single'
        style={{ width: 200 }}
        data={singleList}
        clearable
      />
    )
  }
}`,
    opt: ['可清空']
  },
  {
    code: `import React from 'react'
import Select from '@hi-ui/hiui/es/select'\n
class Demo extends React.Component {
  constructor () {
    super()
    this.state = {
      value: '3',
      singleList: [
        { title:'电视', id:'3', disabled: true },
        { title:'手机', id:'2' },
        { title:'笔记本', id:'4', disabled: true },
        { title:'生活周边', id:'5' },
        { title:'办公', id:'6' },
      ]
    }
  }

  render () {
    const { value, singleList } = this.state
    return (
      <Select
        type='single'
        style={{ width: 100 }}
        defaultValue={['2']}
        bordered={false}
        data={singleList}
        clearable={false}
      />
    )
  }
}`,
    opt: ['无边框']
  },
  {
    code: `import React from 'react'
import Select from '@hi-ui/hiui/es/select'\n
class Demo extends React.Component {
  constructor () {
    super()
    this.state = {
      value: '3',
      singleList: [
        { title:'电视', id:'3', disabled: true },
        { title:'手机', id:'2' },
        { title:'笔记本', id:'4', disabled: true },
        { title:'生活周边', id:'5' },
        { title:'办公', id:'6' },
      ]
    }
  }

  render () {
    const { value, singleList } = this.state
    return (
      <Select
        type='single'
        clearable={false}
        style={{ width: 200 }}
        data={singleList}
        defaultValue={value}
      />
    )
  }
}`,
    opt: ['带默认值']
  },
  {
    code: `import React from 'react'
import Select from '@hi-ui/hiui/es/select'\n
class Demo extends React.Component {
  constructor () {
    super()
    this.state = {
      value: '3',
      singleList: [
        { title:'电视', id:'3', disabled: true },
        { title:'手机', id:'2' },
        { title:'笔记本', id:'4', disabled: true },
        { title:'生活周边', id:'5' },
        { title:'办公', id:'6' },
      ]
    }
  }

  render () {
    const { value, singleList } = this.state
    return (
      <Select
        type='single'
        style={{ width: 200 }}
        data={singleList}
        value={value}
        onChange={ids => {
          this.setState({
            value: ids
          })
        }}
      />
    )
  }
}`,
    opt: ['受控']
  },
  {
    code: `import React from 'react'
import Select from '@hi-ui/hiui/es/select'\n
class Demo extends React.Component {
  constructor () {
    super()
    this.state = {
      value: '3',
      singleList: [
        { title:'电视', id:'3', disabled: true },
        { title:'手机', id:'2' },
        { title:'笔记本', id:'4', disabled: true },
        { title:'生活周边', id:'5' },
        { title:'办公', id:'6' },
      ]
    }
  }

  render () {
    const { value, singleList } = this.state
    return (
      <Select
        type='single'
        legacyV2
        style={{ width: 200 }}
        data={singleList}
        value={value}
        onChange={ids => {
          this.setState({
            value: ids
          })
        }}
      />
    )
  }
}`,
    opt: ['v2']
  }
]
const DemoType = () => (
  <DocViewer code={code} scope={{ Select, Tooltip }} prefix={prefix} rightOptions={rightOptions} desc={desc} />
)
export default DemoType
