describe('Prueba del Componente SectionsNews', () => {
  it('debería mostrar las noticias correctamente', () => {
    // Visita la página donde está tu componente
    cy.visit('http://localhost:5173'); 

    // Asegúrar las noticias se carguen y se muestren correctamente
    cy.get('section#noticias').within(() => {
      cy.contains('h1, h2, h3, h4, h5, h6', 'Las últimas noticias de la moda').should('exist');
    });

    // Verificar que al menos una noticia se cargue
    cy.get('section#noticias').within(() => {
      cy.get('div.border-b-2').should('have.length.greaterThan', 0);
    });

    // Verificar que los botones "Leer más" existan y tengan el enlace correcto
    cy.get('section#noticias a').each(($el) => {
      cy.wrap($el).should('have.attr', 'href').and('include', 'http');
    });
  });
});
