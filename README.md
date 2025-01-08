# Tripster - Sistema de Reserva de Hotéis

## 🎯 Sobre o Projeto

O Tripster é uma plataforma moderna de reservas hoteleiras desenvolvida como parte de um desafio técnico, focando em criar uma experiência intuitiva e eficiente para busca, comparação e reserva de hotéis. O projeto demonstra a implementação de boas práticas de desenvolvimento, arquitetura modular e padrões de projeto modernos.

## ⭐ Principais Funcionalidades

### Sistema de Busca Inteligente

- **Busca Avançada**
  - Filtros dinâmicos por destino
  - Seleção de datas com validação inteligente
  - Configuração flexível de quartos e hóspedes
  - Resultados em tempo real

### Comparador de Hotéis

- **Análise Lado a Lado**
  - Comparação simultânea de até 4 hotéis
  - Destaque de diferenciais
  - Filtros personalizáveis
  - Análise detalhada de preços e condições

### Reservas Simplificadas

- **Processo Otimizado**
  - Formulário intuitivo de reserva
  - Múltiplas opções de pagamento
  - Confirmação instantânea
  - Histórico de reservas

### Sistema de Notificações

- **Atualizações em Tempo Real**
  - Status da reserva
  - Confirmações por email
  - Alertas de check-in/check-out
  - Lembretes importantes

## 🛠 Arquitetura e Tecnologias

### Core

- **Nuxt 3** - Framework base com SSR
- **TypeScript** - Tipagem estática
- **Pinia** - Gerenciamento de estado
- **Tailwind CSS** - Estilização

### Padrões e Práticas

- **Atomic Design**

  - Componentes atômicos
  - Padrões de composição
  - Reutilização eficiente

- **SOLID**

  - Princípios de responsabilidade única
  - Inversão de dependência
  - Interfaces bem definidas

- **Clean Architecture**
  - Separação de responsabilidades
  - Camadas bem definidas
  - Dependências unidirecionais

### Performance

- **Otimizações**
  - Lazy loading de componentes
  - Code splitting automático
  - Cache eficiente
  - Prefetching inteligente

### SEO

- **Otimizações**
  - Meta tags dinâmicas
  - Sitemap automático
  - Schema.org markup
  - Open Graph tags

## 📁 Estrutura do Projeto

```bash
/
├── app/
│   ├── base/                 # Componentes base (Seguindo apenas a logica do Atomic Design)
│   │   ├── atoms/            # Botões, inputs, ícones
│   │   ├── molecules/        # Grupos de atoms
│   │   └── organisms/        # Componentes complexos
│   │
│   ├── components/           # Componentes da aplicação
│   │   ├── sections/         # Seções específicas (Home, Booking)
│   │   └── ui/              # Componentes de UI (Auth, Navigation)
│   │
│   ├── composables/         # Hooks reutilizáveis
│   │   ├── useAuth.ts
│   │   ├── useHotels.ts
│   │   └── useBooking.ts
│   │
│   ├── layouts/             # Layouts globais
│   │   ├── default.vue
│   │   └── auth.vue
│   │
│   ├── stores/              # Gerenciamento de estado
│   │   ├── auth.ts
│   │   └── booking.ts
│   │
│   └── types/               # Definições TypeScript
│
├── layers(base)/                  # Nuxt Layers
│   ├── core/               # Funcionalidades base
│   ├── ui/                 # Componentes UI
│   └── seo/               # Configurações SEO
│
└── nuxt.config.ts
```

## 🚀 Como Começar

### Pré-requisitos

- Node.js v16 ou superior
- npm ou yarn
- Git

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/pabrul/tripster
cd tripster
```

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

## 🧪 Testes

```bash
# Testes unitários com Vitest
npm run test
```

## 📦 Build e Deploy

```bash
# Build de produção
npm run build

# Preview local
npm run preview
```

## 🔄 CI/CD

O projeto utiliza GitHub Actions para:

- **Qualidade de Código**
  - Lint e formatação
  - Testes automatizados

## 📚 Documentação Adicional

- [Guia de Contribuição](CONTRIBUTING.md)
- [Documentação de API](API.md)
- [Guia de Estilo](STYLE_GUIDE.md)

## 👥 Time

- **Desenvolvedor**: Pablo Batista
- **Email**: pablohrbatista@gmail.com
- **LinkedIn**: [pablohrbatista](https://www.linkedin.com/in/pabrul/)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Nota**: Este projeto foi desenvolvido como parte de um desafio técnico, demonstrando proficiência em desenvolvimento web moderno, arquitetura de software e boas práticas de programação.
