import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const stylesAdded = {
    color: 'green',
    fontSize: 32,
    border: 'green solid 4px',
    marginBottom: 16,
    borderRadius: '5px',
    background: 'silver',
    padding: 4,
  }

  const stylesError = {
    color: 'red',
    fontSize: 32,
    border: 'red solid 4px',
    marginBottom: 16,
    borderRadius: '5px',
    background: 'silver',
    padding: 4,
  }

  const notification = useSelector((state) => state.notification)
  if (notification === null) return null

  return (
    <div className="container">
      {notification === 'WRONG CREDENTIALS' ? (
        <Alert variant="danger" className="notification">
          {notification}
        </Alert>
      ) : (
        <Alert variant="success" className="notification">
          {notification}
        </Alert>
      )}
    </div>
  )
}

export default Notification
