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

    cy.get(LOCATOR_HOME.SEARCH_INPUT, { timeout: ('TIMEOUT_WAITING_ELEMENT') })
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
            expect(nameProduct).be.equal(nameProductScreen)
          })

        cy.get(LOCATOR_PRODUCT.ADD_TO_CART_BUTTON, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
          .click()

        /*cy.get(LOCATOR_PRODUCT.NO_COVERAGE, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
          .click()

        cy.wait(10000)
        cy.get(LOCATOR_PRODUCT.BTN_CART, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
        .eq(0)
        .click()
        
        //Tela Carrinho
        cy.get(LOCATOR_CART.SCREEN_CART, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') }) //mudar nome do elemento para Quantidade de itens no carrinho
        .then($element => {
          const nameProductCartScreen = $element.text().trim()
          cy.log(nameProductCartScreen)
        })
        
        cy.get(LOCATOR_CART.CLOSE_ORDER, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
        .click()
        
        cy.wait(5000)
        
        
        cy.get(LOCATOR_CART.HOME_ICON, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
        .click()
        
          */
        })
    //Segundo produto
    cy.get(LOCATOR_HOME.SEARCH_BUTTON, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
      .should('be.visible')

    cy.get(LOCATOR_HOME.SEARCH_INPUT, { timeout: ('TIMEOUT_WAITING_ELEMENT') })
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

        cy.wait(7000)

        cy.get(LOCATOR_CART.SCREEN_CART, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') }) //mudar nome do elemento para Quantidade de itens no carrinho
          .then($element => {
            const nameProductCartScreen = $element.text().trim()
            cy.log(nameProductCartScreen)
            .expect(nameProductCartScreen)
          })

      })
  });

});
