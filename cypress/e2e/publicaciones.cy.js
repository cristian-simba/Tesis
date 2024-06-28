describe('Prueba del Componente PublicHome', () => {
  it('debería mostrar la lista de publicaciones cuando los datos se cargan', () => {
    // Simula una respuesta exitosa de la API con datos de publicaciones
    cy.intercept('GET', '**/api/publicacionesF', {
      statusCode: 200,
      body: [
        { _id: '1', imagen: { secure_url: 'http://example.com/imagen1.jpg' }, descripcion: 'Pruebas', likes: 6 },
      ],
    }).as('getPublicaciones');

    // Visita la página donde está tu componente
    cy.visit('http://localhost:5173/ideas'); 

    // Espera a que la solicitud se complete
    cy.wait('@getPublicaciones');

    // Verifica que la lista de publicaciones se muestre correctamente
    cy.get('div.rt-BaseCard').each(($div, index) => {
      cy.wrap($div).within(() => {
        cy.get('span.rt-Text').should('exist'); 
        cy.contains('Pruebas').should('exist'); 
      });
    });
  });

  it('debería mostrar el mensaje "No hay publicaciones disponibles" cuando no hay datos', () => {
    // Simula una respuesta vacía de la API (sin publicaciones)
    cy.intercept('GET', '**/api/publicacionesF', {
      statusCode: 200,
      body: [],
    }).as('getPublicaciones');

    // Visita la página donde está tu componente
    cy.visit('http://localhost:5173/ideas'); // Ajusta la URL según tu configuración

    // Espera a que la solicitud se complete
    cy.wait('@getPublicaciones');

    // Verifica que el mensaje "No hay publicaciones disponibles" se muestre
    cy.get('.flex.justify-center.items-center.h-screen').contains('No hay publicaciones disponibles.').should('exist');
  });
});
