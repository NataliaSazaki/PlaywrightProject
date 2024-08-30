Feature: Buscar Produto

  Background:
    Given acesso a Magento Luma

  Scenario: Buscar por produto Portia Capri no site
    Given que ao buscar pelo produto "Portia Capri"
    When verificar o resultado da busca "Portia Capri"
    Then devo visualizar o produto na página

  Scenario Outline: Buscar por produto Teste no site
    Given que ao buscar pelo produto "Teste5"
    When verificar o resultado da busca "Teste5"
    Then devo visualizar mensagem de produto não encontrado
