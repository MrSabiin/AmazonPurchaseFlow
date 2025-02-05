/// <reference types="cypress" />
import { LOCATOR_HOME, LOCATOR_CART, LOCATOR_LOGIN, LOCATOR_PRODUCT } from "../../../support/imports-elements";


describe('Home', () => {

  it('Should validate the access to main URL', () => {
    cy.visit('https://www.amazon.com.br')
    cy.wait(5000)

    //Tela de Home
    cy.get(LOCATOR_HOME.SEARCH_BUTTON, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
      .should('be.visible')

    cy.url()
      .should('contain', 'amazon.com')

    cy.get(LOCATOR_HOME.SEARCH_INPUT, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
      .type('Funko Pop')

    cy.get(LOCATOR_HOME.SEARCH_BUTTON, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
      .click()

    cy.get(LOCATOR_PRODUCT.PRODUCT_NAME, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
      .eq(1)
      .then($element => {
        const nameProduct = $element.text().trim()
        cy.log(nameProduct)

        cy.get(LOCATOR_PRODUCT.PRODUCT_CARD, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
          .eq(1)
          .should('be.visible')
          .click()

        cy.wait(7000)

        //Tela de produto
        cy.get(LOCATOR_PRODUCT.TITLE_PRODUCT, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
          .then($element => {
            const nameProductScreen = $element.text().trim()
            cy.log(nameProductScreen)
            expect(nameProduct).be.equal(nameProductScreen) //Após a pesquisa do primeiro  produto, pegar o nome do produto, guardar numa variável e comparar se quando clicar no produto está o produto correto e o texto também
          })

        cy.get(LOCATOR_PRODUCT.ADD_TO_CART_BUTTON, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
          .click()

      })

    //Segundo produto
    cy.get(LOCATOR_HOME.SEARCH_BUTTON, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
      .should('be.visible')

    cy.get(LOCATOR_HOME.SEARCH_INPUT, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
      .type('Jogo The Mind')

    cy.get(LOCATOR_HOME.SEARCH_BUTTON, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
      .click()

    cy.get(LOCATOR_PRODUCT.PRODUCT_NAME, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
      .eq(1)
      .then($element => {
        const nameProduct2 = $element.text().trim()
        cy.log(nameProduct2)

        cy.get(LOCATOR_PRODUCT.PRODUCT_NAME, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
          .eq(1)
          .click()

        cy.get(LOCATOR_PRODUCT.ADD_TO_CART_BUTTON, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
          .click()

        cy.wait(7000)

        cy.get(LOCATOR_CART.CART_QUANTITY, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
          .then($element => {
            const numberProductCartScreen = $element.text().trim()
            cy.log(numberProductCartScreen)
            cy.get(LOCATOR_CART.CART, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') }) // Após ter adicionado produtos no carrinho, pegar o valor e guardar numa variável para comparar fazer um asserts
              .click()

            cy.get(LOCATOR_CART.CART_SUBPRODUCTS, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
              .then($element => {
                const subproducts = $element.text().match(/\d+/)[0];
                cy.log(subproducts)

                expect(numberProductCartScreen).eq(subproducts) //Validar que foi adicionado 2 produtos no carrinho e quando acessar a tela do carrinho, ter 2 produtos adicionados

              })
          })


        //cy.get(LOCATOR_CART.CLOSE_ORDER, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
        //.click({force: true})



      })
  });

});
