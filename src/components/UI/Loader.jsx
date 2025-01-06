import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Flex, Spin } from 'antd'

const Loader = () => {
  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 48,
          }}
          spin
        />
      }
    />
  )
}

export default Loader
