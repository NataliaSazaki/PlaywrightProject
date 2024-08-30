Feature: Navegar categoria

  Background:
    Given acesso a página home do Magento Luma

  @timeout=40000
  Scenario: Navegar por categoria
    When clicar no id da categoria "#ui-id-5"
    Then devo visualizar o titulo da categoria na página "Men"

  Scenario Outline: Navegar por categoria
    When clicar no id da categoria "#ui-id-6"
    Then devo visualizar o titulo da categoria na página "Gear"

  Scenario Outline: Navegar por categoria
    When clicar na categoria "<categoria>"
    Then devo visualizar o titulo da categoria na página "<categoria>"

    Examples:
      | categoria  |
      | What's New |
      | Women      |
      | Training   |
      | Sale       |
