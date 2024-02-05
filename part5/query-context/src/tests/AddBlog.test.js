import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlog from '../components/AddBlog'

test('<AddBlog /> updates parent state and calls onSubmit', () => {
  const mockCreate = jest.fn()
  //   const user = userEvent.setup()
  const setErrorMessage = jest.fn()
  const setAdded = jest.fn()
  const setBlogs = jest.fn()
  const blogRef = { current: { toggleVisibility: jest.fn() } }

  render(
    <AddBlog
      setAdded={setAdded}
      setErrorMessage={setErrorMessage}
      setBlogs={setBlogs}
      blogRef={blogRef}
    />
  )

  const input = screen.getByPlaceholderText('title')
  const sendButton = screen.getByText('create')
  sendButton.onclick = mockCreate

  userEvent.type(input, 'testing a form...')
  userEvent.click(sendButton)

  expect(mockCreate.mock.calls).toHaveLength(1)
  expect(mockCreate.mock.calls[0].title).toBe('testing a form...')
})
