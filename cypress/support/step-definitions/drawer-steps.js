import {
  drawerToggle,
  drawerSidebar,
  drawerSidebarContentInnerElement,
} from '../../locators/drawer';

When('I click on Drawer arrow {int} time(s)', (count) => {
  for (let i = 0; i < count; i++) {
    drawerToggle().first().click();
  }
});

Then('sidebar should have class {word}', (className) => {
  drawerSidebar().should('have.class', className);
});

Then('sidebar text is visible', () => {
  drawerSidebarContentInnerElement(1).should('have.text', 'link a')
    .and('be.visible');
  drawerSidebarContentInnerElement(2).should('have.text', 'link b')
    .and('be.visible');
  drawerSidebarContentInnerElement(3).should('have.text', 'link c')
    .and('be.visible');
});

Then('sidebar text is not visible', () => {
  drawerSidebarContentInnerElement(1).should('have.text', 'link a')
    .and('not.be.visible');
  drawerSidebarContentInnerElement(2).should('have.text', 'link b')
    .and('not.be.visible');
  drawerSidebarContentInnerElement(3).should('have.text', 'link c')
    .and('not.be.visible');
});

Then('toggle icon switched orientation to open', () => {
  drawerToggle().should('have.css', 'transform', 'matrix(-1, 0, 0, 1, 0, 0)');
});

Then('toggle icon switched orientation to closed', () => {
  drawerToggle().should('have.css', 'transform', 'none');
});

Then('expandedWidth is set to {string}', (width) => {
  drawerSidebar().should('have.css', 'width', width);
});

Then('animationSpeed is set to {string}', (animationSpeed) => {
  drawerSidebar().should('have.css', 'animation-duration', animationSpeed);
});
