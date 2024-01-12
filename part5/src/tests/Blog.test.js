import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import { element } from 'prop-types'

test('renders author and title but not url and likes initially', () => {
  const blogs = {
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkein',
    url: 'www.lotr.com',
    likes: 33,
  }

  const setBlog = jest.fn()

  const { container } = render(<Blog blog={blogs} setBlog={setBlog} />)
  const preview = container.querySelector('.preview')
  expect(preview).toHaveTextContent('Lord of the Rings')
  expect(preview).toHaveTextContent('J.R.R. Tolkein')
  expect(preview).not.toHaveTextContent('www.lotr.com')
  expect(preview).not.toHaveTextContent(33)
})
