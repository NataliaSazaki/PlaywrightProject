Feature: Lista de desejo
    

@timeout=40000

  Scenario: Adicionar produto na lista de desejo
    Given acessar a página inicial do sistema Magento Luma
    When adiciono o produto na lista de desejo
    Then o produto é inserido com sucesso na lista de desejo

@timeout=40000

  Scenario: Remover produto da lista de desejo
    Given acesso a lista de desejo
    When removo o item da lista
    Then o produto é removido com sucesso da lista de desejo
    