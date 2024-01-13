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
  expect(container.querySelector('.preview')).toHaveTextContent(
    'Lord of the Rings'
  )
  expect(container.querySelector('.preview')).toHaveTextContent(
    'J.R.R. Tolkein'
  )
  expect(container.querySelector('.preview')).not.toHaveTextContent(
    'www.lotr.com'
  )
  expect(container.querySelector('.preview')).not.toHaveTextContent(33)
  const user = userEvent.setup()
  const button = container.querySelector('.viewBtn')
  await user.click(button)
  const div = container.querySelector('.allInfo')
  expect(div).toHaveTextContent('Lord of the Rings')
  expect(div).toHaveTextContent('J.R.R. Tolkein')
  expect(div).toHaveTextContent('www.lotr.com')
  expect(div).toHaveTextContent(33)
})

test('if like button is clicked twice, event handler received is called twice', async () => {
  const blogs = {
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkein',
    url: 'www.lotr.com',
    likes: 33,
  }
  const mockHandler = jest.fn()
  const setBlog = jest.fn()
  const { container } = render(<Blog blog={blogs} setBlog={setBlog} />)
  const user = userEvent.setup()
  const button = container.querySelector('.viewBtn')
  await user.click(button)
  const div = container.querySelector('.allInfo')
  const likeBtn = div.querySelector('.likeBtn')
  likeBtn.onclick = mockHandler
  await user.click(likeBtn)
  await user.click(likeBtn)
  expect(mockHandler.mock.calls).toHaveLength(2)
  screen.debug(div)
})
