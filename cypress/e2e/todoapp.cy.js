/* global cy it beforeEach describe */

describe("To Do App Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // Reemplaza con tu URL local

    cy.request("POST", "http://localhost:8000/api/testing/reset");
    const user = {
      name: "Javier",
      email: "testing@gmail.com",
      password: "asdf",
      country: "Argentina",
      profesion: "software developer",
    };
    cy.request("POST", "http://localhost:8000/api/usuarios/register", user);
  });

  it("should display login form elements", () => {
    cy.contains("Login"); // Verifica que el texto "Login" esté presente en la página
    cy.get('input[name="email"]').should("exist"); // Verifica que el campo de email esté presente
    cy.get('input[name="password"]').should("exist"); // Verifica que el campo de contraseña esté presente
    cy.get('button[type="submit"]').should("exist"); // Verifica que el botón de login esté presente
    cy.get('button[type="submit"]').should("exist"); // Verifica que el botón de login esté presente
    // Verifica que el botón "Register now" esté presente y haz clic en él
    cy.get("button").contains("Register now").click();
    // Verifica que la URL haya cambiado a la página de registro
    cy.url().should("include", "/register");
  });

  it("user can login", () => {
    cy.get('[placeholder="E-mail"]').type("testing@gmail.com");
    cy.get('[placeholder="password"]').type("asdf");
    cy.get("#form-login-button").click();
    cy.contains("New Task");
    cy.contains("Task List");
  });

  it("login fails with wrong password", () => {
    cy.get('[placeholder="E-mail"]').type("testing@gmail.com");
    cy.get('[placeholder="password"]').type("wrong-Password");
    cy.get("#form-login-button").click();
    cy.contains("Error de validación");
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.get('[placeholder="E-mail"]').type("testing@gmail.com");
      cy.get('[placeholder="password"]').type("asdf");
      cy.get("#form-login-button").click();
      cy.contains("New Task");
      cy.contains("Task List");

      //probando esta ruta de abajo sino borrarla
      // cy.request("POST", "http://localhost:8000/api/usuarios/login", {
      //   email: "testing@gmail.com",
      //   password: "asdf",
      // }).then((res) => {
      //   // Asegúrate de que el inicio de sesión sea exitoso
      //   expect(res.status).to.eq(200);
      //   // Guarda el token en las cookies
      //   const token = res.body.token;
      //   expect(token).to.be.a("string");
      //   cy.setCookie("token", token);
      // });
    });
    it("a new task can be created", () => {
      cy.contains("New Task").click({ force: true });
      cy.url().should("include", "/tasks/new");
      cy.get("#title").type("work");
      cy.get("#descripcion").type("keep learning Node and testing");
      cy.get("#new-task-form").click();
    });
  });
});
