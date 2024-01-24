describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3004/api/testing/reset')
    const user = {
      name: 'Kevin Jarvis',
      username: 'kevin',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3004/api/users/', user)
  })
  it('Log in form is shown', function () {
    cy.contains('Log in')
    cy.contains('login')
  })

  describe('Login', function () {
    it('successful login', function () {
      cy.get('#username').type('kevin')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('kevin is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'kevin', password: 'password' })
      cy.contains('kevin is logged in')
    })
    it('A blog can be created', function () {
      cy.contains('add blog').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create').click()
      cy.contains('title author')
    })
    it('user can like a blog', function () {
      cy.contains('add blog').click()
      cy.get('#title').type('2001')
      cy.get('#author').type('Arthur C. Clarke')
      cy.get('#url').type('2001.com')
      cy.get('#create').click()
      cy.contains('2001 Arthur C. Clarke')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
    })
  })
})
