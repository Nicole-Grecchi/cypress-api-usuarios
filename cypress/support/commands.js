Cypress.Commands.add('token', (email, senha) => {
  return cy.request({
    method: 'POST',
    url: 'login',
    body: {
      email: email,
      password: senha
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
    Cypress.env('token', response.body.authorization)
    return response
  })
})
Cypress.Commands.add('cadastrarProduto', (produto, preco, descricao, quantidade) => {
  const token = Cypress.env('token')

  return cy.request({
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
    return response
  })
})
Cypress.Commands.add('atualizarProduto', (produto, preco, descricao, quantidade) => {
  const token = Cypress.env('token')
  const produtoId = Cypress.env('produtoId')

  return cy.request({
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
    return response
  })
})
Cypress.Commands.add('deletarProduto', () => {
  const token = Cypress.env('token')
  const produtoId = Cypress.env('produtoId')

  return cy.request({
    method: 'DELETE',
    url: `produtos/${produtoId}`,
    headers: {
      authorization: token
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
    return response
  })
})
Cypress.Commands.add('listarUsuarios', () => {
  return cy.request({
    method: 'GET',
    url: 'usuarios'
  }).then((response) => {
    expect(response.status).to.eq(200)
    return response.body
  })
})
Cypress.Commands.add('cadastrarUsuario', (nome, email, password) => {
  return cy.request({
    method: 'POST',
    url: 'usuarios',
    body: {
      nome,
      email,
      password,
      administrador: 'true'
    }
  }).then((response) => {
    expect(response.status).to.eq(201)
    Cypress.env('usuarioId', response.body._id)
    return response
  })
})

