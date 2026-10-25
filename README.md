# Igreja Batista Nova Esperança (IBNE) - Campo Grande/MS

> Site institucional da **Igreja Batista Nova Esperança** em Campo Grande/MS, desenvolvido para rodar no **GitHub Pages** utilizando o gerador estático **Jekyll**.

---

## 🌟 Visão Geral

Este projeto foi construído para apresentar a identidade, os valores bíblicos, a programação semanal de cultos, os ministérios e as informações de contato da Igreja Batista Nova Esperança em Campo Grande, MS.

### Destaques do Projeto
- **100% Compatível com GitHub Pages & Jekyll**: Sem necessidade de plugins externos complexos;
- **Design Moderno e Acolhedor**: Paleta elegante em tons azul marinho (`#0f2647`), dourado âmbar (`#f59e0b`) e céu (`#0ea5e9`);
- **Contador Dinâmico do Próximo Culto**: Calcula automaticamente o próximo culto da semana em tempo real;
- **Dízimos & Ofertas com Cópia Rápida de PIX**: Botão de cópia em 1 clique com notificação de confirmação (Toast);
- **Estrutura Modular Orientada a Dados (`_data/`)**: Atualização fácil de cultos, ministérios, menus e contatos sem precisar editar HTML;
- **Responsivo e Acessível**: Experiência fluida em celulares, tablets e computadores;
- **CI/CD Automatizado**: Workflow do GitHub Actions configurado para deploy automático em `.github/workflows/deploy.yml`.

---

## 📂 Estrutura de Diretórios

```
ibne_site/
├── .github/workflows/
│   └── deploy.yml              # Fluxo automatizado de build e deploy no GitHub Pages
├── _data/
│   ├── beliefs.yml             # Declaração doutrinária e princípios batistas
│   ├── navigation.yml          # Menus principal e do rodapé
│   ├── ministries.yml          # Dados e atividades de cada ministério
│   └── schedule.yml            # Dias, horários e descrições dos cultos
├── _includes/
│   ├── head.html               # Metatags, SEO, fontes do Google e CSS
│   ├── header.html             # Topbar com contatos e navegação com menu mobile
│   ├── footer.html             # Rodapé completo com horários, redes sociais e PIX
│   └── next_service.html       # Componente do próximo culto com contagem regressiva
├── _layouts/
│   ├── default.html            # Estrutura padrão com topo, conteúdo e rodapé
│   ├── home.html               # Layout específico da página inicial
│   ├── page.html               # Layout das páginas institucionais com hero temático
│   └── post.html               # Layout para artigos, mensagens pastorais e notícias
├── _posts/
│   └── 2026-10-18-bem-vindo-a-ibne.md # Post inaugural de boas-vindas
├── assets/
│   ├── css/style.css           # Folha de estilo completa e responsiva
│   ├── js/main.js              # Lógica do menu mobile, contador e cópia do PIX
│   └── images/                 # Logotipos em vetor SVG e fotografias institucionais
├── _config.yml                 # Configurações globais e dados de contato da igreja
├── Gemfile                     # Dependências do Jekyll e GitHub Pages
├── index.html                  # Página Inicial (Home)
├── sobre.html                  # Quem Somos, História, Visão e O que Cremos
├── programacao.html            # Cultos, horários detalhados e FAQ de visitantes
├── ministerios.html            # MINE (Ministério Infantil), Jovens, Louvor, Mulheres, Homens, Missões
├── dizimos-ofertas.html        # Instruções de contribuição e chave PIX
├── contato.html                # Endereço em Campo Grande, WhatsApp, mapa e oração
├── 404.html                    # Página de erro 404 personalizada
├── AGENTS.md                   # Orientações para agentes de IA e desenvolvedores
└── README.md                   # Esta documentação
```

---

## ⚙️ Como Atualizar Informações da Igreja

A maior parte dos dados pode ser editada diretamente em arquivos de configuração simples:

1. **Nome, Endereço, Telefones, Redes Sociais e Chave PIX:**
   - Edite o arquivo `_config.yml` na seção `church:`.
2. **Dias e Horários dos Cultos:**
   - Edite o arquivo `_data/schedule.yml`.
3. **Ministérios e Atividades:**
   - Edite o arquivo `_data/ministries.yml`.
4. **Princípios e Declaração de Fé:**
   - Edite o arquivo `_data/beliefs.yml`.
5. **Links do Menu:**
   - Edite o arquivo `_data/navigation.yml`.
6. **Novas Mensagens ou Notícias:**
   - Adicione novos arquivos na pasta `_posts/` seguindo o formato `AAAA-MM-DD-titulo-do-post.md`.

---

## 🚀 Como Publicar no GitHub Pages

1. Suba os arquivos para a branch `main` do repositório no GitHub:
   ```bash
   git add .
   git commit -m "feat: estrutura inicial do site institucional da IBNE"
   git push origin main
   ```
2. No GitHub, acesse **Settings** > **Pages**:
   - Em **Source**, selecione **GitHub Actions** (recomendado, usando o fluxo em `.github/workflows/deploy.yml`) ou selecione **Deploy from a branch** apontando para a branch `main` e diretório `/ (root)`.
3. Em poucos instantes, o site estará disponível publicamente no seu endereço `https://<usuario-ou-org>.github.io/<repositorio>/`.

---

## 💻 Desenvolvimento Local

Caso deseje rodar e testar o Jekyll localmente na sua máquina:

### Opção 1: Usando Ruby e Bundler
1. Instale o Ruby (versão 3.0 ou superior) e o Bundler:
   ```bash
   bundle install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   bundle exec jekyll serve --livereload
   ```
3. Acesse `http://localhost:4000` no seu navegador.

### Opção 2: Usando Docker (Sem precisar instalar Ruby na máquina)
```bash
docker run --rm -p 4000:4000 -v "$PWD:/srv/jekyll" jekyll/jekyll:latest jekyll serve --livereload
```

---

## 📜 Licença e Propósito

Desenvolvido para a **Igreja Batista Nova Esperança em Campo Grande/MS**.  
Todo o conteúdo institucional e imagens pertencem à igreja.
