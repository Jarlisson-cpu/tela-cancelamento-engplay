# 🎓 Eng Play — Fluxo de Cancelamento

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

Fluxo de telas de **cancelamento e retenção de assinatura** da plataforma de cursos **Eng Play**, desenvolvido durante a residência no programa Eng Play.

A ideia é entender o motivo do cancelamento e oferecer uma solução antes do aluno sair.

## 🔁 Fluxo

1. **`index.html`** — Início do cancelamento
2. **`motivos.html`** — "Queremos te entender": o aluno escolhe um ou mais motivos (sem limite no cartão, perdi o interesse, já finalizei o curso...)
3. **`lamentando.html`** — Para cada motivo, uma proposta: *"Que tal uma solução?"*
4. **`partir.html`** — Confirmação final do cancelamento

## ✨ Destaques

- ✅ Seleção múltipla de motivos com JavaScript
- 🔒 Botão "Continuar" só é liberado após escolher um motivo (com `aria-disabled`)
- ☑️ Checkbox de confirmação antes de concluir

## 🚀 Como executar

Abra `index/index.html` no navegador, ou:

```bash
# Opção 1: abra o arquivo index.html direto no navegador
# Opção 2: rode um servidor local na pasta do projeto
python -m http.server 8000
# e acesse http://localhost:8000
```

## 🧠 Conceitos praticados

UX de retenção · manipulação do DOM · estados de botão · fluxo multi-página

---

👤 Feito por **[Jarlisson Brito](https://github.com/Jarlisson-cpu)** · [LinkedIn](https://www.linkedin.com/in/jarlisson-brito-602909368/)
