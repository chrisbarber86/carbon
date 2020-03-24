Feature: Drawer component
  I want to test Drawer component

  Background: Open Drawer component page
    Given I open basic Test "Drawer" component page

  @positive
  Scenario: Expanding Drawer
    When I click on Drawer arrow 1 time
    Then sidebar should have class open
      And toggle icon switched orientation to open
      And sidebar text is visible

  @positive
  Scenario: Collapsing Drawer
    When I click on Drawer arrow 2 times
    Then sidebar should have class closed
      And toggle icon switched orientation to closed
      And sidebar text is not visible

  @positive
  Scenario Outline: Set animationSpeed to <animationSpeed>
    When I set animationSpeed to "<animationSpeed>"
    Given I click on Drawer arrow 1 time
    Then animationSpeed is set to "<cssAnimationSpeed>"
    Examples:
      | animationSpeed | cssAnimationSpeed |
      | 500ms          | 0.5s              |
      | 100ms          | 0.1s              |
      | 0.5s           | 0.5s              |
      | 0.1s           | 0.1s              |

  @positive
  Scenario Outline: Set expandedWidth to <expandedWidth>
    When I set expandedWidth to "<expandedWidth>"
    Given I click on Drawer arrow 1 time
    Then expandedWidth is set to "<cssWidth>"
    Examples:
      | expandedWidth                   | cssWidth      |
      | 10%                             | 114.59375px   |
      | 50%                             | 573px         |
      | 100px                           | 100px         |
      | 500px                           | 500px         |
