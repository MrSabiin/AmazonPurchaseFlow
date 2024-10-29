import { LOCATOR_HOME } from "./elements";

class HOME {
    static dadosProduto() {

        cy.get(LOCATOR_HOME.PRODUCT_CARD, { timeout: Cypress.env('TIMEOUT_WAITING_ELEMENT') })
            .eq(1)
            .then($element => {
                // Armazena o nome do produto
                productDetails.name = $element.find(LOCATOR_HOME.PRODUCT_CARD).text().trim();

                // Armazena o preço do produto
                productDetails.price = $element.find(LOCATOR_HOME.PRODUCT_PRICE).text().trim();

                cy.log('Product Details:', productDetails); // Log para verificar os dados
            });

    }
}
export default HOME