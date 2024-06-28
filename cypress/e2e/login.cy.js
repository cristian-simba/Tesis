describe('Pruebas del Componente Login', () => {
  it('debería mostrar el formulario de inicio de sesión y manejar la carga correctamente', () => {
    // Visita la página donde está tu componente
    cy.visit('http://localhost:5173/mod/login'); // Ajusta la URL según tu configuración

    // Verifica que se muestre el mensaje inicial de carga con el Spinner
    cy.get('.flex.justify-center.items-center.h-screen').should('exist');

    // Verifica que se haya mostrado el formulario después de cargar
    cy.get('form').should('exist');

    // Simula la entrada de datos en el formulario
    cy.get('input[name="email"]').type('eric@hotmail.com');
    cy.get('input[name="password"]').type('lfe5@Kaws46'+'{enter}'); // Presiona Enter después de ingresar la contraseña

    // Verifica que se haya redirigido correctamente después del inicio de sesión
    cy.location('pathname').should('eq', '/dashboard'); // Ajusta la ruta según la redirección esperada
  });

  it('debería mostrar un mensaje de error cuando las credenciales son incorrectas', () => {
    // Visita la página donde está tu componente
    cy.visit('http://localhost:5173/mod/login'); // Ajusta la URL según tu configuración

    // Verifica que se muestre el formulario después de cargar
    cy.get('form').should('exist');

    // Simula la entrada de datos en el formulario
    cy.get('input[name="email"]').type('eric@hotmail.com');
    cy.get('input[name="password"]').type('passwordIncorrecta{enter}'); // Presiona Enter después de ingresar la contraseña incorrecta

    // Espera a que aparezca el mensaje de error
    cy.get('.Toastify__toast--error').should('exist');
    cy.get('.Toastify__toast--error').should('contain.text', 'Contraseña incorrecta');
  });

  it('debería mostrar el mensaje de "El Panel Administrativo solo está disponible en vista de ordenadores" en dispositivos móviles', () => {
    // Define el ancho de la ventana para simular una vista móvil
    cy.viewport('iphone-6');

    // Visita la página donde está tu componente
    cy.visit('http://localhost:5173/mod/login'); // Ajusta la URL según tu configuración

    // Verifica que se muestre el mensaje de disponibilidad en vista de ordenadores
    cy.contains('El Panel Administrativo solo está disponible en vista de ordenadores').should('exist');
  });
});
