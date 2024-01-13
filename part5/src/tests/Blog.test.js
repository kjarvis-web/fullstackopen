import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'

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

test('URL and likes are shown when view button is clicked', async () => {
  const blogs = {
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkein',
    url: 'www.lotr.com',
    likes: 33,
  }
  const setBlog = jest.fn()
  const { container } = render(<Blog blog={blogs} setBlog={setBlog} />)
  const user = userEvent.setup()
  const button = container.querySelector('.viewBtn')
  await user.click(button)
  const div = container.querySelector('.allInfo')
  screen.debug(div)
  expect(div).toHaveTextContent('Lord of the Rings')
  expect(div).toHaveTextContent('J.R.R. Tolkein')
  expect(div).toHaveTextContent('www.lotr.com')
  expect(div).toHaveTextContent(33)
})
