describe('Pruebas del Componente Reportes', () => {
  beforeEach(() => {
    // Antes de cada prueba, visitamos la página de inicio de sesión y nos autenticamos
    cy.visit('http://localhost:5173/mod/login');

    // Llenamos los campos de inicio de sesión y enviamos el formulario
    cy.get('input[name="email"]').type('eric@hotmail.com');
    cy.get('input[name="password"]').type('lfe5@Kaws46{enter}');

    // Verificamos que se redirija correctamente al dashboard después del inicio de sesión
    cy.location('pathname').should('eq', '/dashboard');
  });

  it('debería mostrar la lista de reportes correctamente', () => {
    cy.visit('http://localhost:5173/reportes');

    // Esperamos a que se muestre el mensaje de carga inicial con el Spinner y luego desaparezca
    cy.get('.flex.justify-center.items-center.h-screen').should('exist');
    cy.get('.flex.justify-center.items-center.h-screen').should('not.exist', { timeout: 50000 }); // Aumenta el tiempo de espera si es necesario

    // Aumentamos el tiempo de espera explícitamente para asegurar que los reportes se carguen
    cy.wait(30000); // Esperamos 30 segundos, ajusta según sea necesario

    // Verificamos que se muestre al menos un elemento que represente un reporte
    cy.get('[to^="/reporte/"]').should('have.length.greaterThan', 0);
  });

});
