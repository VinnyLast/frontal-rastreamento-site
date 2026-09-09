# Frontal Rastreamento — Site institucional

Site institucional de página única (single page) para a Frontal Rastreamento, empresa de rastreamento veicular em Feira de Santana - BA. Desenvolvido em HTML5, CSS3 e JavaScript puro (vanilla), sem build step e sem dependências de Node em produção — ideal para hospedagem estática em qualquer VPS com Apache ou Nginx.

## Estrutura de pastas

```
site-frontal/
├── index.html          # Página única com todas as seções
├── style.css           # Estilos (mobile-first, responsivo)
├── script.js           # Menu mobile, animações e formulário
├── assets/
│   └── img/
│       ├── logo-color.png   # Logo colorida (fundo claro)
│       ├── logo-white.png   # Logo branca (fundo escuro)
│       └── favicon.png      # Ícone do site (recortado da própria logo)
├── .gitignore
└── README.md
```

## Pendências (TODO)

Alguns conteúdos foram deixados como placeholder e devem ser substituídos antes de publicar em produção:

- Textos institucionais da seção "Sobre" (revisar com o cliente).
- Preço em destaque na seção "Serviços" (atualmente fixo em R$ 49,90/mês — em `index.html`, `.pricing-highlight__price`).
- Depoimentos na seção "Depoimentos" são exemplos fictícios (nomes e textos inventados) — substituir por depoimentos reais de associados.
- Logos oficiais (`logo-color.png` e `logo-white.png`) já aplicadas, reaproveitadas dos projetos `bot-frontal`/`chat-frontal`.

## Deploy em VPS (Hostinger ou similar)

O site é 100% estático, então basta que os arquivos fiquem acessíveis pelo servidor web (Apache ou Nginx).

### Opção 1: Hostinger com hPanel / cPanel (document root em `public_html`)

1. Acesse o hPanel da Hostinger e vá em **Gerenciador de Arquivos** (ou conecte via FTP/SFTP).
2. Aponte o domínio (ou subdomínio) para a pasta pública, geralmente `public_html` ou `public_html/nome-do-subdominio`.
3. Envie todo o conteúdo deste projeto (menos `.git` e `.gitignore`, que são apenas para versionamento) para essa pasta.
4. Acesse o domínio no navegador para conferir.

Você também pode clonar o repositório diretamente na VPS via SSH:

```bash
cd /home/usuario/domains/seudominio.com/public_html
git clone https://github.com/SEU_USUARIO/site-frontal.git .
```

### Opção 2: VPS com Nginx

1. Envie os arquivos para um diretório no servidor, por exemplo `/var/www/site-frontal`.
2. Configure o Nginx apontando o `root` para essa pasta:

```nginx
server {
    listen 80;
    server_name seudominio.com www.seudominio.com;
    root /var/www/site-frontal;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

3. Teste e recarregue o Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Opção 3: VPS com Apache

1. Envie os arquivos para `/var/www/site-frontal`.
2. Configure o VirtualHost:

```apache
<VirtualHost *:80>
    ServerName seudominio.com
    ServerAlias www.seudominio.com
    DocumentRoot /var/www/site-frontal
    <Directory /var/www/site-frontal>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

3. Habilite o site e reinicie o Apache:

```bash
sudo a2ensite site-frontal.conf
sudo systemctl reload apache2
```

### Atualizações futuras

Para atualizar o site já publicado, basta subir novas alterações para o repositório Git e, na VPS, rodar `git pull` dentro da pasta pública (se o deploy tiver sido feito via `git clone`), ou reenviar os arquivos alterados via FTP/SFTP.

## Segurança

Este projeto não contém chaves de API, senhas ou qualquer credencial — é puramente estático (HTML/CSS/JS). Antes de cada commit, confira se nenhum arquivo sensível foi adicionado por engano.
