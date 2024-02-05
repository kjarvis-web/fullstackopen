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
  // it('Log in form is shown', function () {
  //   cy.contains('Log in')
  //   cy.contains('login')
  // })

  // describe('Login', function () {
  //   it('successful login', function () {
  //     cy.get('#username').type('kevin')
  //     cy.get('#password').type('password')
  //     cy.get('#login-button').click()
  //     cy.contains('kevin is logged in')
  //   })

  //   it('fails with wrong credentials', function () {
  //     cy.get('#username').type('wrong')
  //     cy.get('#password').type('password')
  //     cy.get('#login-button').click()
  //     cy.contains('Wrong credentials')
  //   })
  // })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'kevin', password: 'password' })
      cy.contains('kevin is logged in')
    })
    // it('A blog can be created', function () {
    //   cy.contains('add blog').click()
    //   cy.get('#title').type('title')
    //   cy.get('#author').type('author')
    //   cy.get('#url').type('url')
    //   cy.get('#create').click()
    //   cy.contains('title author')
    // })
    // it('user can like a blog', function () {
    //   cy.contains('add blog').click()
    //   cy.get('#title').type('2001')
    //   cy.get('#author').type('Arthur C. Clarke')
    //   cy.get('#url').type('2001.com')
    //   cy.get('#create').click()
    //   cy.contains('2001 Arthur C. Clarke')
    //   cy.contains('view').click()
    //   cy.contains('like').click()
    //   cy.contains('1')
    // })
    // it('user can delete blog', function () {
    //   cy.contains('add blog').click()
    //   cy.get('#title').type('2001')
    //   cy.get('#author').type('Arthur C. Clarke')
    //   cy.get('#url').type('2001.com')
    //   cy.get('#create').click()
    //   cy.contains('2001 Arthur C. Clarke')
    //   cy.contains('view').click()
    //   cy.contains('Remove').click()
    //   cy.get('body').should('not.contain', '2001 Arthur C. Clarke')
    // })
    // it('only user who created post can see delete', function () {
    //   cy.contains('add blog').click()
    //   cy.get('#title').type('title')
    //   cy.get('#author').type('author')
    //   cy.get('#url').type('url')
    //   cy.get('#create').click()
    //   cy.contains('title author')
    //   cy.get('#logout').click()

    //   const user = {
    //     name: 'Second User',
    //     username: 'second',
    //     password: 'user',
    //   }
    //   cy.request('POST', 'http://localhost:3004/api/users/', user)

    //   cy.login({ username: 'second', password: 'user' })
    //   cy.contains('second is logged in')
    //   cy.contains('view').click()
    //   cy.get('.allInfo').should('not.contain', 'Remove')
    // })
    it('blogs are ordered based on number of likes in descending order', function () {
      cy.contains('add blog').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create').click()
      cy.contains('title author')

      cy.contains('add blog').click()
      cy.get('#title').type('Two')
      cy.get('#author').type('2')
      cy.get('#url').type('222')
      cy.get('#create').click()
      cy.contains('Two 2')

      cy.contains('add blog').click()
      cy.get('#title').type('Three')
      cy.get('#author').type('3')
      cy.get('#url').type('333')
      cy.get('#create').click()
      cy.contains('Three 3')

      cy.get('.preview>button').eq(0).click()
      cy.get('.allInfo').eq(0).find('.likeBtn').click()
      cy.get('.preview>button').eq(1).click()
      cy.get('.allInfo').eq(1).find('.likeBtn').click()
      cy.get('.allInfo').eq(1).find('.likeBtn').click()
      cy.contains('view').click()
      cy.get('.allInfo').eq(0).should('contain', 'Three')
      cy.get('.allInfo').eq(1).should('contain', 'title')
      cy.get('.allInfo').eq(2).should('contain', 'Two')
    })
  })
})
