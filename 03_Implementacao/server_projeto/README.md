# Servidor do Projeto — Sistema de apoio à Reabilitação Cardiaca

Este README fornece instruções detalhadas sobre como instalar, configurar e executar o servidor Falcon do projeto.

## Pré-requisitos

É necessário ter o Python instalado. 
Pode descarregar o Python a partir do [site oficial](https://www.python.org/).
A versão Python mais adequada é 
## Instalação e Configuração

### 1. Criar e Ativar um Ambiente Virtual

É necessário utilizar um ambiente virtual, para o criar e ativar, siga os passos abaixo:

1. Criar o ambiente virtual:
    ```
    python -m venv .venv
    ```

2. Ativar o ambiente virtual:
    ```
    .venv\Scripts\activate
    ```

### 2. Instalar Dependências

Com o ambiente virtual ativado, instale as dependências necessárias:

```
pip install -r requirements.txt
```


## 2. Correr o servidor

Para correr o servidor localmente:

```
python app.py
```
