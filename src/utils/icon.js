import { createVNode } from 'vue'
import * as Icons from '@ant-design/icons-vue'

const Icon = (props) => {
  const { type } = props
  return createVNode(Icons[type])
}

export function setupAntdIcon(app) {
  app.component('AIcon', Icon)
}
