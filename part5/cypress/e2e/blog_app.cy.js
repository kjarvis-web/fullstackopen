describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3004/api/testing/reset')
    const user = {
      name: 'Kevin Jarvis',
      username: 'kevin',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3004/api/users/', user)
    cy.visit('http://localhost:5173')
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
})
