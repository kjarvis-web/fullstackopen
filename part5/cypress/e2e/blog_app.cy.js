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

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('kevin')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('kevin is logged in')
    })

    it('a new blog can be added', function () {
      cy.contains('add blog').click()
      cy.get('#title').type('blog created by cypress')
      cy.get('#author').type('blog created by cypress -author')
      cy.get('#url').type('url by cypress')
      cy.get('#create').click()
      cy.contains('blog created by cypress')
    })
  })
})
