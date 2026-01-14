/// <reference types="cypress" />


 const usuariosSchema = require('../contracts/usuarios.contract')
describe('Testes da Funcionalidade Usuários', () => {
 
  it('Deve validar contrato de usuários', () => {
  cy.listarUsuarios().then((responseBody) => {
    usuariosSchema.validate(responseBody)
  })
})

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method:'GET',
      url: '/usuarios',
    }).then((response) =>{
      expect(response.status).to.eq(200)
      expect(response.body.quantidade).to.be.a('number')
      expect(response.body.quantidade).to.be.greaterThan(0)
      expect(response.body.usuarios).to.be.an('array')
      expect(response.body.usuarios[0]).to.have.property('_id')
      expect(response.body.usuarios[0]).to.have.property('nome')
      expect(response.body.usuarios[0]).to.have.property('email')
      expect(response.body.usuarios[0]).to.have.property('administrador')
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
  const nome = 'Usuario Teste'
  const email = `usuario_${Date.now()}@teste.com`
  const password = 'teste123'

  cy.cadastrarUsuario(nome, email, password).then((response) => {
    expect(response.body.message).to.eq('Cadastro realizado com sucesso')
  })
})


  it('Deve validar um usuário com email inválido', () => {
  cy.request({
    method: 'POST',
    url: '/usuarios',
    failOnStatusCode: false,
    body: {
      nome: 'Usuario Email Invalido',
      email: 'emailinvalido.com',
      password: '123456',
      administrador: 'true'
    }
  }).then((response) => {
    expect(response.status).to.eq(400)
    expect(response.body).to.have.property('email')
    expect(response.body.email).to.match(/email/i)
  })

  });

  it('Deve editar um usuário previamente cadastrado', () => {
  const emailOriginal = `usuario_${Date.now()}@qa.com.br`
  const emailEditado = `usuario_editado_${Date.now()}@qa.com.br`
  cy.request({
    method: 'POST',
    url: '/usuarios',
    body: {
      nome: 'Usuário Original',
      email: emailOriginal,
      password: 'teste',
      administrador: "true"
      }
  }).then((createResponse) => {
    expect(createResponse.status).to.eq(201)

    const userId = createResponse.body._id
    cy.request({
      method: 'PUT',
      url: `/usuarios/${userId}`,
      body: {
        nome: 'Usuário Editado',
        email: emailEditado,
        password: 'teste',
        administrador: "false"
      }
    }).then((updateResponse) => {
      expect(updateResponse.status).to.eq(200)
      expect(updateResponse.body.message)
        .to.eq('Registro alterado com sucesso')
    })
  })
})

it('Deve deletar um usuário previamente cadastrado', () => {
  const email = `usuario_${Date.now()}@qa.com.br`
  cy.request({
    method: 'POST',
    url: '/usuarios',
    body: {
      nome: 'Usuário para Delete',
      email: email,
      password: 'teste',
      administrador: "true" 
    }
  }).then((createResponse) => {
    expect(createResponse.status).to.eq(201)

    const userId = createResponse.body._id
    cy.request({
      method: 'DELETE',
      url: `/usuarios/${userId}`
    }).then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(200)
      expect(deleteResponse.body.message)
        .to.eq('Registro excluído com sucesso')
    })
  })
})

  });
