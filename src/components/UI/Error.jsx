import React from 'react'
import { CloseSquareFilled } from '@ant-design/icons'
import { Alert } from 'antd'

const Error = () => {
  return (
    <div>
      <Alert
        message="Что то пошло не так..."
        description="Попробуйте обновить страницу или повторите попытку позже"
        type="error"
        closable
      />
    </div>
  )
}

export default Error
