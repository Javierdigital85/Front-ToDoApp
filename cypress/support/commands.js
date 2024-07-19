/* global cy Cypress expect */

Cypress.Commands.add("login", ({ email, password }) => {
  cy.request("POST", "http://localhost:8000/api/usuarios/login", {
    email,
    password,
  }).then((res) => {
    // Imprimir la respuesta completa del servidor para depuración
    cy.log(JSON.stringify(res.body));
    console.log(res.body);
    // Asegúrate de que el inicio de sesión sea exitoso
    expect(res.status).to.eq(200);
    // Guarda el token en las cookies
    const token = res.body.token;
    expect(token).to.be.a("string");
    cy.setCookie("token", token);
    // Guarda el token en el local storage (opcional, si tu aplicación lo necesita)
    window.localStorage.setItem("token", token);
  });
  cy.visit("http://localhost:5173");
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
