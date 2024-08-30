Feature: Cadastrar Usuário

  Background:
    Given acesso a página inicial do Magento
    Given o usuário escolhe realizar um novo cadastro
#Cenário 01 - CT01

  Scenario: Cadastrar novo usuário com sucesso
    When preenche os dados do cadastro
      | FirstName | LastName | Email             | Password  | ConfirmPassword |
      | José      | Maria    | jm@mailinator.com | Teste_123 | Teste_123       |
    Then o novo usuário é cadastrado com sucesso
#Cenário 01 - CT02

  Scenario: Validar campos obrigatórios
    When o usuário NÃO preenche os dados do cadastro
      | FirstName | LastName | Email | Password | ConfirmPassword |
      |           |          |       |          |                 |
    Then o sistema informa que os campos são obrigatórios
#Cenário 01 - CT03

  Scenario: Validar tamanho e divergência na senha
    When o usuário realiza cadastro com tamanho de senha inválida e confirmação de senha diferente da senha
      | FirstName | LastName | Email             | Password | ConfirmPassword |
      | José      | Maria    | jm@mailinator.com | z        | y               |
    Then o sistema apresenta mensagens descrevendo as divergencias encontradas
#Cenário 01 - CT04

  Scenario: Validar complexidade da senha
    When o usuário realiza cadastro com uma senha fraca
      | FirstName | LastName | Email             | Password | ConfirmPassword |
      | José      | Maria    | jm@mailinator.com | 12345678 |        12345678 |
    Then o sistema apresenta mensagem informando a complexidade esperada para uma senha
