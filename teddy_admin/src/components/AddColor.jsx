import { useState, useRef, useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Divider, Input, Select, Space, Button } from 'antd'
import { v4 as uuidv4 } from 'uuid'


const AddColor = ({ onChange, title, data }) => {
  const [properties, setProperties] = useState([])
  const [newProperties, setNewProperties] = useState()
  const inputRef = useRef(null)

  useEffect(() => {
    setProperties(data)
  }, [data])

  const onColorChange = (event) => {
    setNewProperties(event.target.value)
  }

  const properitesOptions = []
  properties?.forEach((property) => {
    return properitesOptions.push({
      label: property.name,
      value: property.code
    })
  })

  const addColor = (e) => {
    e.preventDefault()
    const newColorsWithCode = { name: newProperties, code: uuidv4() }
    setProperties([...properties, newColorsWithCode])
    setNewProperties('')
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleChangeProperty = (value) => {
    setProperties(value)
  }

  useEffect(() => {
    onChange(properties)
  }, [properties])

  return (
    <div className="mb-3">
      <p style={{ marginBottom: '4px' }}>{title}</p>
      <Select
        style={{
          width: '100%',
          height: '50px'
        }}
        placeholder={title}
        mode="multiple"
        onChange={(_, value) => handleChangeProperty(value)}
        value={properties.map((property) => property.code) || []}
        optionLabelProp="label"
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space style={{ padding: '0 8px 4px' }}>
              <Input
                placeholder="Thêm mới"
                ref={inputRef}
                value={newProperties}
                onChange={onColorChange}
                onKeyDown={(e) => e.stopPropagation()}
                style={{ padding: '6px 12px' }}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addColor}>
                Thêm mới
              </Button>
            </Space>
          </>
        )}
        options={properitesOptions}
      />
    </div>
  )
}

export default AddColor
