# 🌱 Solawi Manager

Sistema de gestão para cooperativas agrícolas alemãs (Solawi - Solidarische Landwirtschaft)

[English](README.md) | [Deutsch](README_de.md) | [Português](README_pt.md)

![image alt](https://github.com/brenoqbezerra/solawi-manager/blob/13413c15bc42d7aa66d1d1733c27dbb7d8cb9ac6/screenshot.png)

## Sobre o Projeto

O Solawi Manager é um sistema web desenvolvido especificamente para auxiliar cooperativas agrícolas alemãs (Solawi) no gerenciamento de seus cultivos e colheitas. Construído com Google Apps Script e Google Sheets, oferece uma solução simples e eficaz para:

- Planejamento e acompanhamento de cultivos
- Gerenciamento de colheitas
- Visualização de cultivos atuais e planejados
- Gestão de áreas de cultivo
- Monitoramento semanal de produção

Esta é uma versão MVP (Minimum Viable Product) que implementa as funcionalidades básicas essenciais, com potencial para expansão baseada no feedback dos usuários e necessidades específicas das cooperativas.

## Funcionalidades Atuais
- 📊 Dashboard intuitivo com métricas principais
- 🌿 Gestão básica de cultivos (cadastro, acompanhamento, exclusão)
- 📅 Planejamento baseado em semanas do calendário alemão (KW) com:
  - Suporte a planejamento entre anos
  - Cálculo automático do ano de colheita
  - Detecção inteligente de atrasos considerando a virada do ano
- 🏡 Gerenciamento de locais de cultivo
- 📦 Registro e acompanhamento de colheitas
- 🌡️ Previsão do tempo para 7 dias com:
  - Detecção automática de localização
  - Busca manual de cidades alemãs
  - Exibição de temperatura e condições climáticas
  - Interface responsiva para visualização do clima
- 📱 Interface responsiva para uso em dispositivos móveis

## Funcionalidades Planejadas

- Gestão de membros da cooperativa
- Planejamento de distribuição
- Relatórios avançados
- Gestão financeira básica

## Requisitos

- Conta Google
- Acesso ao Google Sheets
- Navegador web atualizado

## Acesso ao Template

1. Template da Planilha:
   - [Acessar Template do Solawi Manager](https://docs.google.com/spreadsheets/d/1mxsGO1WUXyXKesFQ2Gd9QZulfV-LA1GjYd0tFv0YLXE/edit?gid=980133036#gid=980133036)
   - Faça uma cópia (Arquivo > Fazer uma cópia)
   - Siga as instruções na aba "Anleitung"

⚠️ **IMPORTANTE**: O link "🌱 Solawi Manager" no menu superior da planilha só funcionará após a configuração completa do Apps Script em sua cópia. Siga cuidadosamente as instruções de instalação na aba "Anleitung".
## Estrutura da Planilha

O sistema utiliza uma planilha Google Sheets como banco de dados, com a seguinte estrutura:

### Abas Ativas no MVP:

1. **Anbau-Kalender**: 
   - Registro principal de cultivos
   - Contém informações sobre culturas, datas de plantio e colheita
   - Não alterar a estrutura das colunas

2. **Erntemengen**: 
   - Registro de colheitas
   - Controle de quantidades colhidas
   - Não alterar a estrutura das colunas

### Abas Reservadas (não implementadas no MVP):

- **Satze**: Reservada para futuras implementações de detalhamento técnico dos cultivos

⚠️ **IMPORTANTE**: 
- Não modifique a estrutura das colunas nas abas
- Não renomeie ou exclua as abas existentes
- Mantenha os nomes das colunas inalterados
- Faça backup regular dos seus dados

## Instalação

Após receber a cópia da planilha modelo:

1. Faça uma cópia da planilha (Arquivo > Fazer uma cópia)
2. Na sua cópia:
   - Acesse Extensões > Apps Script
   - Crie os seguintes arquivos no editor:
     * Main.gs
     * Database.gs
     * Utils.gs
     * Index.html
     * JavaScript.html
     * Stylesheet.html
   - Copie e cole o código correspondente de cada arquivo do repositório
   - Clique em "Implantar" > "Nova implantação"
   - Selecione "Aplicativo da Web"
   - Configure:
     * Descrição: "Solawi Manager v1"
     * Executar como: "Eu"
     * Quem tem acesso: "Qualquer pessoa"
   - Clique em "Implantar"
   - Autorize as permissões necessárias

3. Configure o acionador:
   - No editor do Apps Script, clique no ícone do relógio (Acionadores)
   - Clique em "+ Adicionar Acionador"
   - Configure:
     * Função: onOpen
     * Evento: Ao abrir
     * Origem do evento: Na planilha
   - Salve o acionador

## Como Usar

1. Após a instalação, abra sua planilha
2. No menu superior, clique em "🌱 Solawi Manager"
3. Selecione "System öffnen"
4. Comece cadastrando seus cultivos e registrando colheitas

Para instruções detalhadas de uso, consulte nosso [Guia de Uso](USAGE.md).

## Estrutura do Código

**Nota importante**: Embora no GitHub os arquivos estejam organizados em pastas para melhor visualização, no Google Apps Script todos os arquivos são criados diretamente no editor, sem estrutura de pastas.

```
solawi-manager/
├── src/
│   ├── apps-script/
│   │   ├── Main.gs
│   │   ├── Database.gs
│   │   └── Utils.gs
│   └── html/
│       ├── Index.html
│       ├── JavaScript.html
│       └── Stylesheet.html
```

## Tecnologias Utilizadas

- Frontend:
  - HTML5
  - CSS (Bootstrap 5.3.2)
  - JavaScript
  - Material Icons
  - Google Fonts (Inter)

- Backend:
  - Google Apps Script
  - Google Sheets como banco de dados

- APIs Externas:
  - OpenMeteo API (previsão do tempo)
  - OpenStreetMap Nominatim (geolocalização)

## Contribuindo

Contribuições são bem-vindas! Por favor, leia nosso [Guia de Contribuição](CONTRIBUTING.md) antes de submeter alterações.

## Suporte

Se encontrar algum problema ou tiver sugestões:
- Abra uma [issue](https://github.com/seu-usuario/solawi-manager/issues)
- Entre em contato: bqbreno@gmail.com

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## Autoria

Desenvolvido por Breno Queiroz
- Email: bqbreno@gmail.com
- GitHub: [@queirozbreno](https://github.com/queirozbreno)
- LinkedIn: [Breno Queiroz](https://www.linkedin.com/in/brenoqueiroz/)

## Baseado em

Este projeto foi inspirado pela metodologia de planejamento agrícola do movimento WirGarten, uma iniciativa alemã que promove e apoia cooperativas agrícolas solidárias. O sistema adapta e digitaliza conceitos da planilha "Muster-Anbauplanung für Solawi" para facilitar a gestão das cooperativas.

## Notas de Implementação

- A interface do usuário está em alemão para atender ao público-alvo
- Comentários no código estão em inglês para facilitar colaboração internacional
