describe('Pruebas del Componente Graficas', () => {
  beforeEach(() => {
    // Antes de cada prueba, visitamos la página de inicio de sesión y nos autenticamos
    cy.visit('http://localhost:5173/mod/login');

    // Llenamos los campos de inicio de sesión y enviamos el formulario
    cy.get('input[name="email"]').type('eric@hotmail.com');
    cy.get('input[name="password"]').type('lfe5@Kaws46{enter}');

    // Verificamos que se redirija correctamente al dashboard después del inicio de sesión
    cy.location('pathname').should('eq', '/dashboard');
  });

  it('debería mostrar correctamente las secciones de gráficas', () => {
    cy.visit('http://localhost:5173/dashboard');

    // Esperamos a que se cargue el grid principal de gráficas
    cy.get('.grid.grid-rows-2.grid-cols-3').should('exist');

    // Aumentamos el tiempo de espera explícitamente antes de verificar cada sección
    const esperaCorto = 5000; // 10 segundos
    const esperaLargo = 20000; // 30 segundos

    // Verificación de Totales o TotalesTodos
    cy.wait(esperaLargo);
    cy.get('.grid.grid-rows-2.grid-cols-3 > div:nth-child(1)').within(() => {
    });

    // Verificación de ReportesTiempo
    cy.wait(esperaCorto);
    cy.get('.grid.grid-rows-2.grid-cols-3 > div:nth-child(2)').within(() => {
      cy.contains('Total de reportes los últimos 5 días').should('exist');
   
    });

    // Verificación de TemporadasTop o Usuarios y Publicaciones
    cy.wait(esperaCorto);
    cy.get('.grid.grid-rows-2.grid-cols-3 > div:nth-child(3)').within(() => {
      if (Cypress.env('VITE_MODERADOR_ID') === 'your_moderator_id_here') {
        cy.contains('Temporadas con más publicaciones').should('exist');
      }
    });

    // Verificación de EstadoUsuarios
    cy.wait(esperaCorto);
    cy.get('.grid.grid-rows-2.grid-cols-3 > div:nth-child(4)').within(() => {
      cy.contains('Estado de cuenta de los usuarios').should('exist');
    });

    // Verificación de PublicacionesTop
    cy.wait(esperaLargo); // Esperamos más tiempo para asegurar que PublicacionesTop se carga completamente
    cy.get('.grid.grid-rows-2.grid-cols-3 > div:nth-child(5)').within(() => {
      cy.contains('Los 5 estilos más publicados').should('exist');
    });
  });
});
