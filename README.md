# Site oficial do VEXORA

Página estática (HTML, CSS e um pouco de JavaScript). Sem build, sem dependências, sem login. Funciona em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel, servidor próprio).

## Publicar o download
1. Hospede o arquivo ZIP do aplicativo (por exemplo, em uma release do GitHub ou na própria hospedagem do site, em `downloads/`).
2. Abra `js/config.js` e preencha:
   - `downloadUrl`: endereço do ZIP (`https://...` ou caminho relativo como `./downloads/VEXORA-Windows.zip`).
   - `version`, `fileSize`, `fileName`.
3. Pronto. Para lançar uma nova versão, altere só esse arquivo. Enquanto `downloadUrl` estiver vazio, o site mostra "O download estará disponível em breve." e não inicia nenhum download.

## Antes de publicar
- Em `index.html`, as tags `og:image` e `twitter:image` usam caminho relativo. Para a prévia em redes sociais, troque por o endereço completo (ex.: `https://seudominio.com/assets/img/og-image.png`).
- A imagem do hero (`assets/img/app-interface.webp`) é uma captura real do aplicativo com conversas de demonstração. Para trocar, substitua o arquivo mantendo a proporção 1440x900.
- As instruções de instalação seguem o pacote real: o ZIP contém a pasta `VEXORA-win32-x64` com `VEXORA.exe` (não há instalador). Se o pacote mudar, atualize a seção "Como instalar".
- A versão no dado estruturado (`softwareVersion`, no `<head>`) é fixa em `0.1.0`; atualize junto com `js/config.js`.

## Estrutura
- `index.html`: conteúdo e SEO.
- `css/style.css`: estilos (variáveis de cor no topo).
- `js/config.js`: configuração editável.
- `js/main.js`: download configurável, cabeçalho e animações de entrada (respeita movimento reduzido).
- `assets/`: logotipo, fonte Geist (local), imagem do hero e imagem de compartilhamento.
