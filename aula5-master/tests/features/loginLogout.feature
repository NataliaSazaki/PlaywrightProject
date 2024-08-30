Feature: Realizar login e logout no sistema

  Background:
    Given acesso ao Magento
    Given o usuário escolhe realizar login na página
    When preenche os dados do login
      | FirstName | LastName | Email       | Password  | ConfirmPassword |
      | José      | Maria    | ze@mail.com | Teste1234 |                 |
#Cenário 02 - CT01

  Scenario: Login com sucesso
    Then o usuário acessa o sistema com sucesso
#Cenário 02 - CT02

  Scenario: LogOut com sucesso
    Then o usuário sai do sistema com sucesso
# #Cenário 02 - CT03

  Scenario: Esqueci minha senha
    When o usuário solicita a recuperação de senha
    Then o usuário recebe email de recuperação de senha

