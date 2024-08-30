Feature: Selecionar Produto

Background:
    Given acesso ao Magento Luma

Scenario: Selecionar por produto Radiant Tee no site
Given que ao verificar as opções de produto
When adicionar produto no carrinho
Then devo visualizar produto e quantidade no carrinho
