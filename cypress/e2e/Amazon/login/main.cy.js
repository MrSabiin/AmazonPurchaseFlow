

describe('Login', () => {
    it('Success', () => {
        cy.visit('https://www.amazon.com.br')
        cy.wait(5000)
        cy.url()
            .should('contain', 'amazon.com')
    });

    it('Error', () => {

    });
});