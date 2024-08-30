# Setup do projeto
npm init -y
npm install --save-dev typescript
npm install --save-dev ts-node
npm install --save-dev playwright
npm install --save-dev @playwright/test
npm init playwright@latest --yes -- --quiet --browser=chromium --browser=firefox

# Executar test com UI ativada
npx playwright test --ui

# Setup cucumber
npm install --save-dev @cucumber/cucumber
npm install --save-dev @types/cucumber

# Executar cucumber
npx cucumber-js
