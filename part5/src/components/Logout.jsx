import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogUser')
      dispatch(logout())
    } catch (exception) {
      console.log(exception)
    }
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link>
            <Link to={'/'}>
              <div>blogs</div>
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to={'users'}>
              <div>users</div>
            </Link>
          </Nav.Link>
          <em style={{ color: 'white', padding: '10px' }}>
            {user.username} is logged in
          </em>
          <Button id="logout" onClick={handleLogout}>
            Log out
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Logout
