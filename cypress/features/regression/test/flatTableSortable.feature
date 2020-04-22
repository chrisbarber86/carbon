Feature: FlatTable component
  I want to check FlatTable component properties

  Background: Open FlatTable sortable component page
    Given I open sortable Test "Flat Table" component page in Iframe

  @positive
  Scenario Outline: Sort <headerName> flat table column descending
    When I click on "<position>" header 1 times
    Then "<position>" column is sorted in "desc" order
    Examples:
      | position | headerName |
      | first    | Client     |
      | second   | total      |

  @positive
  Scenario Outline: Sort <headerName> flat table column ascending
    When I click on "<position>" header 2 times
    Then "<position>" column is sorted in "asc" order
    Examples:
      | position | headerName |
      | first    | Client     |
      | second   | total      |

  @positive
  Scenario Outline: Flat table header has <colorTheme> color
    When I select colorTheme to "<colorTheme>"
    Then Flat table header has "<color>" color
    Examples:
      | colorTheme  | color              |
      | dark        | rgb(51, 91, 109)   |
      | white       | rgb(255, 255, 255) |
      | light       | rgb(204, 214, 218) |
      | transparent | rgb(255, 255, 255) |