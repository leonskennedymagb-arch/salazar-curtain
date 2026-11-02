PROJECT 038 — THE SALAZAR CURTAIN
=================================

Projeto estático para GitHub Pages. Não requer build, framework, instalação ou servidor.

ARQUIVOS
--------
index.html   Estrutura e conteúdo das telas.
style.css    Identidade visual responsiva, mobile-first.
script.js    Navegação, desafios, documentos, código e registro local.
README.txt   Estas instruções.

TESTAR LOCALMENTE
-----------------
1. Extraia os quatro arquivos para uma mesma pasta.
2. Abra index.html em um navegador atualizado.
3. Teste a navegação, as três fichas, a resposta B, o código 038 e o envio final.
4. Para testar o bloqueio após envio, atualize a página: o navegador deverá mostrar que a teoria já foi registrada.

PUBLICAR NO GITHUB PAGES
------------------------
1. Entre em https://github.com e acesse sua conta.
2. Abra o repositório existente "salazar-curtain". Se ainda não existir, crie um repositório público com esse nome.
3. Na página do repositório, selecione Add file > Upload files.
4. Envie index.html, style.css, script.js e README.txt (os quatro arquivos na raiz do repositório, não dentro de outra pasta).
5. Confirme em Commit changes.
6. Abra Settings > Pages.
7. Em "Build and deployment", escolha "Deploy from a branch".
8. Em "Branch", selecione "main" e a pasta "/ (root)". Clique em Save.
9. Aguarde o GitHub concluir a publicação. O endereço normalmente será:
   https://SEU-USUARIO.github.io/salazar-curtain/
10. Abra o link no celular, de preferência em uma janela anônima, e percorra a experiência inteira.

ATUALIZAÇÕES
------------
Depois de alterar qualquer arquivo, envie a versão nova ao mesmo repositório e faça commit.
O GitHub Pages republicará o site automaticamente após alguns instantes.

PRIVACIDADE E LIMITAÇÕES IMPORTANTES
------------------------------------
- A teoria final é salva em localStorage no navegador da visitante.
- A teoria NÃO é enviada para você, para o GitHub ou para qualquer servidor externo.
- Para consultar o que foi digitado, seria necessário acessar o mesmo navegador/dispositivo e o armazenamento local. Não há painel administrativo para isso.
- Um site estático no GitHub Pages não consegue impor um bloqueio absoluto de uma tentativa. A visitante pode limpar os dados do site, usar outro navegador/dispositivo ou manipular o armazenamento local.
- O código-fonte e as respostas dos desafios ficam acessíveis no navegador. Portanto, este projeto é uma experiência lúdica, não um sistema de segurança.
- Não inclua no código nenhuma informação que revele o presente real. O conteúdo atual não menciona o objeto do presente e a tela final não confirma nem nega a teoria.
- Se você quiser receber a teoria remotamente, será necessário integrar um serviço externo apropriado (por exemplo, um endpoint/serverless ou formulário com backend). Essa integração não está incluída e não foi simulada.

PERSONALIZAÇÃO
--------------
Edite os textos diretamente em index.html. Os conteúdos dos três documentos ficam no objeto "docs" no início de script.js.
O código de acesso está em script.js como comparação com "038". Lembre-se de que, por ser código client-side, ele pode ser inspecionado.
