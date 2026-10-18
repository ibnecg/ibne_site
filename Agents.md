# AGENTS.md — Diretrizes para Agentes de IA e Desenvolvedores

Este documento reúne o contexto institucional, arquitetura técnica, convenções de código e regras operacionais para qualquer agente de IA ou desenvolvedor atuando no repositório do site da **Igreja Batista Nova Esperança (IBNE)** em Campo Grande/MS.

---

## 1. Contexto Institucional do Projeto

- **Nome da Entidade:** Igreja Batista Nova Esperança (IBNE)
- **Localização:** Campo Grande - Mato Grosso do Sul (MS), Brasil
- **Propósito:** Site institucional oficial para acolher visitantes, divulgar a mensagem do Evangelho de Cristo, informar a programação semanal de cultos, apresentar os ministérios locais e facilitar a contribuição cristã e contato pastoral.
- **Público-alvo:**
  1. *Visitantes e famílias de Campo Grande* que buscam uma comunidade cristã bíblica, saudável e acolhedora.
  2. *Membros e frequentadores assíduos* que precisam consultar horários, novidades e eventos.
  3. *Irmãos que desejam contribuir* com dízimos e ofertas através de PIX e transferências.
- **Tom de Voz:** Acolhedor, gracioso, respeitoso, esperançoso e fiel aos princípios das Sagradas Escrituras (tradição batista).

---

## 2. Stack Tecnológica & Infraestrutura

| Componente | Tecnologia / Abordagem | Observações |
| :--- | :--- | :--- |
| **Gerador Estático** | **Jekyll** | Compatível nativamente com GitHub Pages |
| **Hospedagem** | **GitHub Pages** (`github.io`) | Deploy estático sem necessidade de backend |
| **CI/CD** | **GitHub Actions** (`.github/workflows/deploy.yml`) | Build automatizado e publicação a cada push na `main` |
| **Estilos (CSS)** | **Vanilla CSS Moderno** (`assets/css/style.css`) | Design System próprio com tokens, glassmorphism e responsividade. **Não usar TailwindCSS** |
| **Scripts (JS)** | **Vanilla JavaScript** (`assets/js/main.js`) | Manipulação do DOM leve, menu responsivo, cópia de PIX e countdown |
| **Tipografia** | **Google Fonts** | `Plus Jakarta Sans` (títulos e botões) e `Inter` (corpo de texto) |
| **Gerenciamento de Conteúdo** | **YAML em `_data/`** | Desacoplamento de dados (cultos, ministérios, fé, menus) do HTML |

---

## 3. Estrutura Arquitetural do Repositório

```
ibne_site/
├── .github/workflows/
│   └── deploy.yml            # CI/CD para GitHub Pages
├── _data/
│   ├── beliefs.yml           # Declaração de Fé / O que cremos
│   ├── ministries.yml        # Lista de ministérios e atividades
│   ├── navigation.yml        # Links de navegação (cabeçalho e rodapé)
│   └── schedule.yml          # Agenda de cultos, horários e dias da semana
├── _includes/
│   ├── head.html             # Metatags, OpenGraph, fontes e CSS
│   ├── header.html           # Topbar com contatos e barra de navegação
│   ├── footer.html           # Rodapé institucional e links
│   └── next_service.html     # Banner flutuante com contador em tempo real
├── _layouts/
│   ├── default.html          # Shell padrão do site
│   ├── home.html             # Layout da página inicial
│   ├── page.html             # Layout para páginas estáticas institucionais
│   └── post.html             # Layout para posts e mensagens pastorais
├── _posts/                   # Artigos, devocionais e notícias no formato Jekyll
├── assets/
│   ├── css/style.css         # Folha de estilo principal
│   ├── js/main.js            # Lógica interativa
│   └── images/               # SVGs dos logos e fotos da comunidade
├── _config.yml               # Configurações do site, SEO e dados da igreja
├── Gemfile                   # Dependências do Jekyll / github-pages
├── index.html                # Página principal (Home)
├── sobre.html                # Quem Somos, História e Doutrina
├── programacao.html          # Cultos, Horários e FAQ de Visitantes
├── ministerios.html          # Ministérios da igreja
├── dizimos-ofertas.html      # Página de Dízimos e Ofertas (PIX)
├── contato.html              # Canais de atendimento e mapa
├── 404.html                  # Página de erro customizada
├── AGENTS.md                 # Este documento de referência
└── README.md                 # Documentação geral do projeto
```

---

## 4. Regras Obrigatórias para Agentes de IA

1. **Arquitetura Orientada a Dados (`_data/`):**
   - Ao adicionar ou alterar dados de cultos, dias ou horários, **SEMPRE** edite `_data/schedule.yml`.
   - Ao adicionar novos ministérios, **SEMPRE** edite `_data/ministries.yml`.
   - Ao atualizar contatos gerais (telefone, WhatsApp, PIX, endereço), edite `_config.yml` na chave `church`.
   - **Evite hardcoded text** de entidades nos layouts quando essas entidades já existem em `_data/`.

2. **Compatibilidade com GitHub Pages & URLs Relativas:**
   - Todo link interno para páginas, imagens ou assets no HTML/Markdown **DEVE** utilizar o filtro Jekyll `relative_url` (exemplo: `{{ '/assets/images/logo.svg' | relative_url }}` ou `{{ '/sobre' | relative_url }}`).
   - Isso garante funcionamento correto tanto em domínio próprio (`ibnecg.com.br`) quanto em subpastas de projeto (`usuario.github.io/ibne_site/`).

3. **Design & Estilo:**
   - **Proibido o uso de TailwindCSS**, a menos que explicitamente solicitado pelo usuário.
   - Utilize a paleta e variáveis CSS de `:root` presentes em `assets/css/style.css`.
   - Cores primárias: Azul marinho profundo (`#0f2647`), Azul Céu (`#0ea5e9`), Dourado/Âmbar (`#f59e0b`).
   - Mantenha sempre suporte a dispositivos móveis (design mobile-first / responsivo).

4. **Imagens e Assets:**
   - Não use placeholders vazios ou quebrados (como links fictícios do unsplash que possam falhar). Use imagens reais salvas em `assets/images/` ou gere novas com a ferramenta `generate_image`.
   - Sempre forneça textos alternativos (`alt`) descritivos e atributos de dimensão/acessibilidade.

5. **Acessibilidade e SEO:**
   - Uma única tag `<h1>` semântica por página.
   - Hierarquia clara de cabeçalhos (`<h2>`, `<h3>`, `<h4>`).
   - Botões interativos devem possuir atributos `aria-label` ou texto legível.

---

## 5. Como Executar e Validar

- **Deploy automático:** Realizado ao fazer push para o branch `main`.
- **Servidor local (com Ruby instalado):**
  ```bash
  bundle exec jekyll serve --livereload
  ```
- **Servidor local (com Docker):**
  ```bash
  docker run --rm -p 4000:4000 -v "$PWD:/srv/jekyll" jekyll/jekyll:latest jekyll serve
  ```
