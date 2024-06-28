describe('Pruebas del Componente Moderadores', () => {
  beforeEach(() => {
    // Antes de cada prueba, visitamos la página de inicio de sesión y nos autenticamos
    cy.visit('http://localhost:5173/mod/login'); 

    cy.get('input[name="email"]').type('eric@hotmail.com');
    cy.get('input[name="password"]').type('lfe5@Kaws46'+'{enter}'); 
    cy.location('pathname').should('eq', '/dashboard'); // Verificamos que se redirija al dashboard después del inicio de sesión
  });

  it('debería mostrar la lista de moderadores correctamente', () => {
    // Una vez autenticados, visitamos la página donde está el componente de moderadores
    cy.visit('http://localhost:5173/moderadores'); 
    cy.get('.flex.justify-center.items-center.h-screen').should('exist');
    cy.get('.flex.justify-center.items-center.h-screen').should('not.exist');

    // Verificamos que se muestre la tabla de moderadores
    cy.get('table').should('exist');

    // Verificamos que al menos un moderador esté presente en la tabla
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });

  it('debería filtrar usuarios correctamente por nombre', () => {
    cy.visit('http://localhost:5173/moderadores'); 
    // Simulamos escribir en el campo de búsqueda
    cy.get('input[placeholder="Buscar moderador"]').type('Gilmar');

  });
  
})