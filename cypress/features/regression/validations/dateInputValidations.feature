Feature: Date Input validations component
  I want to change Date Input validations component properties

  Background: Open Date Input validations component page
    Given I open "Experimental Date Input" component page validations in iframe

  @positive
  @validations
  Scenario Outline: Verify the <state> validation of Date Input component
    When I type specific date "<date>" in iFrame
      And I click onto specific day "<specificDay>" via DayPicker for validation component into iFrame
      And I hover mouse onto "<state>" icon in no iFrame
    Then tooltipPreview on preview into iFrame is set to "<text>"
      And icon name into iFrame on preview is "<state>"
    Examples:
      | state   | date | specificDay     | text                                        |
      | error   | 01   | Mon Apr 1, 2019 | April 1st 2019 cannot be selected!          |
      | warning | 02   | Tue Apr 2, 2019 | Selecting April 2nd 2019 is not recommended |
      | info    | 03   | Wed Apr 3, 2019 | You have selected April 3rd 2019            |
