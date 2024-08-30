Feature: Finalizar compra

Background:
    Given acessar o site do Magento Luma

Scenario: Finalizar compra do produto Radiant Tee no site
When adicionar um produto no carrinho
Then devo finalizar a compra
