import React from 'react'
import { Input } from 'antd'

const SearchForm = ({ searchName, onChange }) => {
  return <Input value={searchName} onChange={onChange} placeholder="Type to search" />
}

export default SearchForm
