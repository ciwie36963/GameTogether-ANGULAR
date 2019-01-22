import '../support/commands';

describe('Player list', () => {
    beforeEach(() => {
        cy.prepTest();
        cy.login();

        const player1 = {
            name: 'Player name',
            games: [
                {
                    name: 'First',
                    amount: '1',
                    unit: 'Liter'
                }
            ],
            created: '2018-04-16T13:15:50.902Z'
        };
        const player2 = {
            name: 'Player name2',
            games: [
                {
                    name: 'Second',
                    amount: '2',
                    unit: 'Gram'
                }
            ],
            created: '2018-04-16T13:15:50.902Z'
        };

        cy.addPlayer(player1);
        cy.addPlayer(player2);
    });

    it('should show a list of players', () => {
        cy.visit('/');
        cy.get('[data-test=player]').should('have.length', 2);
    });

    it('should be possible to remove an player from the list', () => {
        cy.visit('');
        cy.get('[data-test=removePlayerBtn]').last().click();
        cy.get('[data-test=player]').should('have.length', 1);
    });
});
