# DESIGN.md — Sistema de Design da Igreja Batista Nova Esperança (IBNE)

Este documento define o **Sistema de Design ("Raízes & Esperança")** oficial do site institucional da **Igreja Batista Nova Esperança (IBNE)** em Campo Grande/MS. Ele estabelece os fundamentos visuais, tokens de cor extraídos diretamente da marca, tipografia, linguagem de formas orgânicas e biblioteca de componentes em CSS puro (`assets/css/style.css`).

---

## 1. Conceito Visual e Identidade da Marca

A marca da IBNE apresenta uma **Cruz que floresce como uma árvore viva**, cercada por seis folhas/pétalas orgânicas coloridas e acompanhada de uma tipografia geométrica arredondada e acolhedora:
- **Raízes e Fundamento (Cruz em Madeira Terrosa `#884322`):** Representa a centralidade da Cruz de Cristo e a firmeza da Palavra de Deus.
- **Vida e Crescimento (Verdes Botânicos `#70b62b` e `#008036`):** Simbolizam esperança, renovação espiritual, vida frutífera e acolhimento familiar.
- **Calor, Luz e Ação (Laranja Vibrante `#ed6c05` e Amarelo Sol `#ffed00`):** Expressam a alegria do Evangelho, comunhão calorosa e o chamado missionário em Campo Grande/MS.
- **Sobriedade Acolhedora (Carvão Quente `#545353` e Expresso `#1c1917`):** Substituem tons frios ou corporativos por neutros terrosos que proporcionam alto contraste e conforto de leitura.

---

## 2. Ativos de Marca (Logos e Favicon)

Todos os ativos de marca estão vetorizados em SVG puro (`fill-rule="evenodd"`) em `assets/images/`:

| Arquivo | Proporção / Lockup | Uso Recomendado |
| :--- | :--- | :--- |
| `assets/images/logo.svg` | Horizontal (`576×163`) | **Barra de navegação principal (Header)** sobre fundo claro (`--bg-main` / `--bg-surface`). Otimizado para leitura nítida em `height: 52px`. |
| `assets/images/logo-white.svg` | Vertical Empilhado (`536×363`) | **Rodapé (Footer) e seções escuras** (`--primary-dark`). Possui tronco e tipografia principal em `#ffffff`, subtítulo em `#ff7a18` e folhas nas cores originais. |
| `assets/images/logo-stacked.svg` | Vertical Empilhado (`536×363`) | Versão institucional completa em cores originais sobre fundos claros (apresentações, páginas institucionais). |
| `assets/images/favicon.svg` | Ícone Quadrado (`64×64`) | Favicon do navegador com o símbolo da cruz florescente sobre base creme arredondada (`#fffcf7`). |

---

## 3. Paleta de Cores & Tokens CSS (`:root`)

### 3.1. Cores Primárias da Marca (Extraídas do Logo)

| Token CSS | Hex | Papel na Identidade |
| :--- | :--- | :--- |
| `--brand-orange` | `#ed6c05` | Cor de destaque principal ("IGREJA BATISTA" e pétalas laterais). Usada em CTAs primários, links ativos e tags de seção. |
| `--brand-orange-light` | `#ff8524` | Variação luminosa para estados `:hover`, gradientes e destaques sobre fundo escuro. |
| `--brand-orange-dark` | `#c25400` | Variação escura para contraste acessível de texto sobre pílulas claras (`--brand-orange-subtle`). |
| `--brand-orange-subtle` | `#fff4eb` | Fundo suave alaranjado para badges, pílulas e caixas de ícones. |
| `--brand-lime` | `#70b62b` | Verde folha vibrante (folhas superior e inferior-esquerda). Usado em pontos de destaque (`.hero-badge-dot`), marcadores e gradientes. |
| `--brand-lime-subtle` | `#f2f9eb` | Fundo verde-claro suave. |
| `--brand-forest` | `#008036` | Verde floresta profundo (folha superior-direita). Usado em CTAs secundários (`.btn-green`), badges de dias de culto e ícones de validação. |
| `--brand-forest-subtle` | `#e8f5ee` | Fundo suave para pílulas de versículos (`.belief-verse`) e dias da semana (`.schedule-day-badge`). |
| `--brand-yellow` | `#ffed00` | Amarelo solar (folha inferior-direita). Usado em gradientes de texto luminosos sobre fundos escuros. |
| `--brand-brown` | `#884322` | Marrom madeira da Cruz. Usado em horários de culto (`.schedule-time`), borda superior do rodapé e detalhes terrosos. |
| `--brand-charcoal` | `#545353` | Cinza carvão quente original da tipografia "Nova Esperança". |

### 3.2. Superfícies e Fundos (Quentes & Orgânicos)

| Token CSS | Hex | Aplicação |
| :--- | :--- | :--- |
| `--bg-main` | `#faf8f5` | Fundo principal da página (Alabastro / Creme suave). |
| `--bg-surface` | `#ffffff` | Superfície elevada de cartões (`.schedule-card`, `.ministry-card`, `.value-card`, `.faq-card`). |
| `--bg-subtle` | `#f3efe9` | Seções alternadas (`.section-muted`), caixas de contagem regressiva e callouts. |
| `--primary-dark` / `--bg-dark` | `#1c1917` | Superfície escura principal (Expresso profundo) para Topbar, Hero, banners de CTA e Rodapé. |
| `--bg-dark-elevated` | `#292524` | Superfície escura secundária usada em gradientes (`--gradient-warm-dark`). |

### 3.3. Tipografia e Bordas

| Token CSS | Hex | Aplicação |
| :--- | :--- | :--- |
| `--text-heading` | `#1c1917` | Títulos (`h1`–`h4`) sobre fundos claros. |
| `--text-main` | `#262320` | Corpo de texto principal com alto contraste. |
| `--text-muted` | `#57534e` | Parágrafos secundários, descrições de cartões e subtítulos. |
| `--text-light` | `#a8a29e` | Legendas, textos auxiliares e links secundários no rodapé. |
| `--text-on-dark` | `#e7e5e4` | Texto de apoio sobre seções escuras (`.hero-lead`, `.page-hero-lead`). |
| `--border-light` | `#e7e2da` | Bordas sutis de cartões e divisores de seção. |
| `--border-subtle` | `#ded8ce` | Bordas de botões outline e estados `:hover` de cartões. |

---

## 4. Tipografia e Escala Tipográfica

- **Fonte de Títulos e Botões (`--font-heading`):** `'Plus Jakarta Sans'`, pesos `600`, `700`, `800`, `900`.
- **Fonte de Corpo de Texto (`--font-body`):** `'Inter'`, pesos `400`, `500`, `600`, `700`.

| Classe / Seletor | Tamanho | Peso | Uso |
| :--- | :--- | :--- | :--- |
| `.hero-title` | `clamp(2.5rem, 5.5vw, 4.25rem)` | `900` | Título principal (`<h1>`) da Home. |
| `.page-hero-title` | `clamp(2.25rem, 4vw, 3.25rem)` | `900` | Título principal (`<h1>`) de páginas internas. |
| `.section-title` | `clamp(2rem, 3.5vw, 2.75rem)` | `800` | Cabeçalho principal (`<h2>`) de seções centralizadas. |
| `.heading-lg` | `clamp(1.75rem, 3vw, 2.2rem)` | `800` | Títulos (`<h2>`) alinhados à esquerda em colunas de conteúdo. |
| `.heading-md` | `1.5rem` | `800` | Subtítulos (`<h3>`) de blocos e callouts. |
| `.section-tag` | `0.8125rem` (`13px`) | `800` | Etiqueta superior em caixa alta com folha decorativa verde (`::before`). |
| `.text-lead` | `1.05rem` | `400` | Parágrafo introdutório de destaque. |
| `.text-caption` | `0.825rem` | `400` | Notas de rodapé, horários de atendimento e metadados. |

---

## 5. Linguagem de Formas, Raios e Elevação

Inspirado nas pétalas orgânicas da cruz florescente e nos cantos arredondados da tipografia da marca, o sistema utiliza bordas acolhedoras e uma forma assimétrica de folha (`--radius-leaf`):

- `--radius-sm`: `10px` (tags de versículos, visor de chave PIX)
- `--radius-md`: `16px` (cartões de programação, valores, FAQ, caixas de destaque)
- `--radius-lg`: `24px` (cartões de ministérios, imagens em destaque, banners de CTA)
- `--radius-leaf`: `24px 8px 24px 8px` (ícones de contato `.contact-icon` e selos flutuantes `.floating-badge-icon`)
- `--radius-full`: `9999px` (botões `.btn` e pílulas `.service-badge-pill`)

---

## 6. Biblioteca de Componentes CSS

### 6.1. Botões (`.btn`)
- `.btn.btn-primary`: CTA principal em gradiente laranja (`--gradient-primary`) com sombra quente (`--shadow-orange`).
- `.btn.btn-green`: CTA secundário em gradiente verde botânico (`--gradient-green`), ideal para ações de WhatsApp e acolhimento.
- `.btn.btn-outline-primary`: Botão de contorno para ações secundárias em fundos claros; preenche com `--brand-orange` no `:hover`.
- `.btn.btn-outline-white`: Botão translúcido com `backdrop-filter: blur(8px)` para fundos escuros.
- Modificadores de tamanho e largura: `.btn-sm` (compacto) e `.btn-block` (`width: 100%`).

### 6.2. Cartões e Grades
- **Programação (`.schedule-grid` > `.schedule-card`):** Exibe dia (`.schedule-day-badge` em verde), horário (`.schedule-time` em marrom terroso), título, descrição e rodapé (`.schedule-card-footer`). Cultos principais recebem `.featured`.
- **Ministérios (`.ministries-grid` > `.ministry-card`):** Imagem com zoom suave no `:hover`, badge translúcido (`.ministry-badge`), líder em laranja (`.ministry-subtitle`), lista de atividades com marcadores verdes (`.ministry-activities-list`) e versículo com barra verde-limão (`.ministry-verse`).
- **Valores e Pilares (`.values-grid` > `.value-card`):** Cartão versátil para pilares institucionais e prestação de contas; suporta alinhamento centralizado com `.value-card-centered`.
- **FAQ de Visitantes (`.faq-grid` > `.faq-card`):** Grade responsiva para perguntas e respostas rápidas.
- **Declaração de Fé (`.beliefs-grid` > `.belief-card`):** Cartões doutrinários com referência bíblica em pílula verde (`.belief-verse`).

### 6.3. Banners e Callouts
- **Dízimos / PIX (`.giving-card` e `.cta-banner-dark`):** Seções escuras com brilho radial quente e visor `.pix-box` / `.pix-box-centered`.
- **Convite Suave (`.cta-banner-subtle`):** Banner de encerramento de página em fundo `--bg-subtle`.
- **Destaques Lado a Lado (`.highlight-split` > `.highlight-box`):** Caixas com borda lateral em laranja (`.highlight-box`) ou verde floresta (`.highlight-box-green`).

---

## 7. Diretrizes de Manutenção e Boas Práticas

1. **Zero Estilos Inline (`style="..."`):** Nunca utilize atributos `style` inline nos templates HTML para definir cores, fontes, espaçamentos ou layouts. Utilize as classes semânticas e utilitárias (`.mt-sm`, `.mt-md`, `.mt-lg`, `.mt-xl`, `.mb-md`, `.mb-lg`, `.mb-xl`, `.text-center`) de `assets/css/style.css`.
2. **Proibição de Cores Hardcoded no HTML:** Qualquer nova cor ou componente deve referenciar os tokens `:root` em `assets/css/style.css`.
3. **Contraste e Acessibilidade:**
   - Nunca utilize `--brand-yellow` (`#ffed00`) como cor de texto sobre fundo claro.
   - Em fundos claros, utilize `--brand-orange-dark` (`#c25400`) ou `--brand-forest` (`#008036`) para textos dentro de pílulas coloridas.
   - Mantenha uma única tag `<h1>` por página e preserve os filtros `relative_url` do Jekyll em todos os links e imagens.
