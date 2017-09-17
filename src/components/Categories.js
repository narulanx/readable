import React from 'react'
import { Button } from 'react-bootstrap'
import { capitalize } from '../utils/helpers'

export default function Categories ({ categories, onClickHandle }) {
  return (
    <div>
      <h3>Categories</h3>
      <div className="category-buttons">
        { categories.map((category) => (
        <Button key={category.name} bsStyle="primary" bsSize="large" block
          onClick={() => onClickHandle(category.name)}>{capitalize(category.name)}</Button>
        ))}
      </div>
    </div>
  )
}