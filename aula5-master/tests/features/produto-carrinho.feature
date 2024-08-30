Feature: Carrinho de Compras
    

@timeout=40000

  Scenario: Adicionar produto no carrinho
    Given acesso a homepage do Magento
    When adiciono o produto no carrinho
    Then o produto é inserido com sucesso no carrinho de compras

@timeout=40000

  Scenario: Excluir produto do carrinho
    Given acesso o carrinho de compras
    When removo o item do carrinho
    Then o produto é removido com sucesso do carrinho
    