describe('add player', () => {
    beforeEach(() => {
        cy.prepTest();
    });

    it('should be possible to add a player with one game, one division and one type of voiceChat', () => {
        (cy as any).login();

        cy.visit('player/add');

        cy.get('[data-test=playerName]').type('iMadKillz');

        [{amount: '1', type: 'Battlefield', name: 'EUWest'}].forEach(
            game => {
                cy.get('[data-test=gameAmount]').last().type(game.amount);
                cy.get('[data-test=gameUnit]').last().select(game.type);
                cy.get('[data-test=gameName]').last().type(game.name);
            }
        );

        [{amount: '1', type: 'Diamond', name: 'Brotherhood'}].forEach(
            div => {
                cy.get('[data-test=divAmount]').last().type(div.amount);
                cy.get('[data-test=divUnit]').last().select(div.type);
                cy.get('[data-test=divName]').last().type(div.name);
            }
        );

        [{amount: '15', type: 'Discord', name: 'MOBA_Clan'}].forEach(
            vc => {
                cy.get('[data-test=vcAmount]').last().type(vc.amount);
                cy.get('[data-test=vcUnit]').last().select(vc.type);
                cy.get('[data-test=vcName]').last().type(vc.name);
            }
        );

        cy.get('[data-test=addPlayerBtn]').click();

        cy.get('[data-test=playerName]').should('be.empty');
    });

    it('should be possible to add a player with multiple games', () => {
        (cy as any).login();

        cy.visit('player/add');

        cy.get('[data-test=playerName]').type('iMadKillz');

        const addElement = game => {
            cy.get('[data-test=gameAmount]').last().type(game.amount);
            cy.get('[data-test=gameUnit]').last().select(game.type);
            cy.get('[data-test=gameName]').last().type(game.name);
        };

        [
            {amount: '1', type: 'Battlefield', name: 'EUWest'},
            {amount: '2', type: 'Dota', name: 'NAmerica'},
            {amount: '3', type: 'Rocket_League', name: 'Australia'},
        ].forEach(
            (game, index) => {
                addElement(game);
                cy.get('[data-test=gameAmount]').should('have.length', index + 2);
            }
        );

        cy.get('[data-test=addPlayerBtn]').click();

        cy.get('[data-test=playerName]').should('be.empty');
    });

    it('should be possible to add a player with multiple voiceChats', () => {
        (cy as any).login();

        cy.visit('player/add');

        cy.get('[data-test=playerName]').type('iMadKillz');

        const addElement = vc => {
            cy.get('[data-test=vcAmount]').last().type(vc.amount);
            cy.get('[data-test=vcUnit]').last().select(vc.type);
            cy.get('[data-test=vcName]').last().type(vc.name);
        };

        [
            {amount: '1', type: 'Discord', name: 'MOBA_Clan'},
            {amount: '2', type: 'Skype', name: 'Friends'},
            {amount: '3', type: 'Ventrillo', name: 'WeLoveLeague'},
        ].forEach(
            (vc, index) => {
                addElement(vc);
                cy.get('[data-test=vcAmount]').should('have.length', index + 2);
            }
        );

        cy.get('[data-test=addPlayerBtn]').click();

        cy.get('[data-test=playerName]').should('be.empty');
    });
});
