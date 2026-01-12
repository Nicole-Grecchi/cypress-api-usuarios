
Cypress.Commands.add('token', (email, senha) => {
  cy.request({
    method: 'POST',
    url: 'login',
    body: {
      email: email,
      password: senha
    }
  }).then((response) => {
    expect(response.status).to.eq(200)

    Cypress.env('token', response.body.authorization)
  })
})

Cypress.Commands.add('cadastrarProduto', (produto, preco, descricao, quantidade) => {
  const token = Cypress.env('token')

  cy.request({
    method: 'POST',
    url: 'produtos',
    headers: {
      authorization: token
    },
    body: {
      nome: produto,
      preco: preco,
      descricao: descricao,
      quantidade: quantidade
    }
  }).then((response) => {
    expect(response.status).to.eq(201)
    Cypress.env('produtoId', response.body._id)
  })
})

Cypress.Commands.add('atualizarProduto', (produto, preco, descricao, quantidade) => {
  const token = Cypress.env('token')
  const produtoId = Cypress.env('produtoId')

  cy.request({
    method: 'PUT',
    url: `produtos/${produtoId}`,
    headers: {
      authorization: token
    },
    body: {
      nome: produto,
      preco: preco,
      descricao: descricao,
      quantidade: quantidade
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})
Cypress.Commands.add('deletarProduto', () => {
  const token = Cypress.env('token')
  const produtoId = Cypress.env('produtoId')

  cy.request({
    method: 'DELETE',
    url: `produtos/${produtoId}`,
    headers: {
      authorization: token
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})

Cypress.Commands.add('listarUsuarios', () => {
  cy.request({
    method: 'GET',
    url: 'usuarios'
  }).then((response) => {
    expect(response.status).to.eq(200)
    return response.body
  })
})

