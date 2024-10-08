/* global cy it beforeEach describe */

describe("To Do App Page", () => {
  beforeEach(() => {
    cy.visit(
      "https://front-todoapp.onrender.com"
    ); // Reemplaza con tu URL local
    cy.get("title").should("exist");
    cy.title().should("eq", "To Do App");

    cy.request(
      "POST",
      "https://back-todoapp-9pni.onrender.com/api/testing/reset"
    );
    cy.fixture("usuarios.json").then((usuarios) => {
      usuarios.forEach((usuario) => {
        cy.request(
          "POST",
          "https://back-todoapp-9pni.onrender.com/api/usuarios/register",
          usuario
        );
      });
    });
    // const user = {
    //   name: "Javier",
    //   email: "javier@gmail.com",
    //   password: "asdf",
    //   country: "Argentina",
    //   profesion: "software developer",
    // };
  });

  it("should display login form elements and link to register's url", () => {
    cy.contains("Login"); // Verifica que el texto "Login" esté presente en la página
    cy.get('input[name="email"]').should("exist"); // Verifica que el campo de email esté presente
    cy.get('input[type="email"]').should("have.attr", "placeholder", "E-mail");
    cy.get('input[name="password"]').should("exist"); // Verifica que el campo de contraseña esté presente
    cy.get('button[type="submit"]').should("exist"); // Verifica que el botón de login esté presente

    // Verifica que el botón "Register now" esté presente y haz clic en él
    cy.get("button").contains("Register now").click();
    // Verifica que la URL haya cambiado a la página de registro
    cy.url().should("include", "/register");
  });

  it("login fails with wrong password", () => {
    cy.get('[placeholder="E-mail"]').type("javier@gmail.com");
    cy.get('[placeholder="password"]').type("wrong-Password");
    cy.get("#form-login-button").click();
    cy.contains("Error de validación");
  });

  it("login fails with wrong user", () => {
    cy.get('[placeholder="E-mail"]').type("userNotExist@gmail.com");
    cy.get('[placeholder="password"]').type("wrong-Password");
    cy.get("#form-login-button").click();
    cy.contains("User does not exist in our data base");
  });

  it("user can login once registered", () => {
    cy.get('[placeholder="E-mail"]').type("sofia@gmail.com");
    cy.get('[placeholder="password"]').type("qwer");
    cy.get("#form-login-button").click();
    cy.contains("New Task");
    cy.contains("Task List");
    cy.contains("Welcome").should("exist");
  });

  describe("when user log in session", () => {
    beforeEach(() => {
      cy.login({ email: "javier@gmail.com", password: "asdf" });
    });
    //funcion que crea los tasks
    const createTask = (title, description) => {
      cy.contains("New Task").click();
      cy.url().should("include", "/tasks/new");
      cy.get("#title").type(title);
      cy.get("#descripcion").type(description);
      cy.get("#new-task-form").click();
    };

    it("a new task can be created", () => {
      createTask("work", "keep learning testing");
      cy.contains("work");
    });

    it("should edit a task", () => {
      createTask("work and study", "keep learning and working");
      // Verifica que la tarea "work" exista antes de intentar editarla
      cy.contains("work").should("exist");
      // Haz clic en el botón de editar para la nueva tarea
      cy.get("#cypress-edit").click();
      cy.get("#title").clear().type("Home");
      cy.get("#descripcion")
        .clear()
        .type("keep learning Node and testing cafe and clean the dishes");
      cy.get("#edit-task-form").click();
      // Verifica que la tarea se haya actualizado correctamente
      cy.contains("Home");
      cy.contains("keep learning Node and testing cafe and clean the dishes");
    });

    it("should delete a task", () => {
      createTask("work and study", "keep learning and working");
      cy.get("#cypress-delete").click();
      cy.contains("You have deleted a task!").should("exist");
    });

    it("should log out and disable protected routes", () => {
      cy.contains("Log Out").should("exist");
      cy.get("#login-cypress").click();
      cy.contains("You have log out successfully!").should("exist");
      cy.contains("Login").should("exist");
      cy.visit("http://localhost:5173/tasks/new");
      cy.url().should("include", "/");
      cy.contains(
        "You must be registered and logged in to use the Application."
      );
      cy.get("button").contains("Login here!");
      cy.contains("button", "Login here!").click();
    });
  });
});
