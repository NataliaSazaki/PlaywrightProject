Feature: Avaliar Produto

Background:
    Given ao acessar a página inicial do Magento Luma

@timeout=40000
Scenario: Avaliar produto Radiant Tee no site
Given que ao clicar pelo produto "Radiant Tee"
When enviar a avaliação preenchida
Then devo validar que a avaliação foi enviada