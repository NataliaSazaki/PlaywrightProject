Feature: Comparar Produto

Background:
    Given ao acessar o site inicial do Magento Luma

@timeout=40000
Scenario: Comparar produtos no site
When quando adicionar os produtos para comparação
Then devo ver a lista de validação