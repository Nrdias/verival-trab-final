# SemBarreiras-Frontend

Frontend do projeto Sem Barreiras - Acessibilidade, realizado no semestre 2024/1.

## Pré requisitos para executar o projeto

Para conseguir executar este projeto na sua máquina, primeiro é preciso instalar as tecnologias abaixo:

- Ambiente de desenvolvimento (ex: [Visual Studio Code](https://code.visualstudio.com/))
- Node.js
- Expo Go
- Emulador ou um celular com o Expo instalado

Para mais informações, consulte [esta página da Wiki](https://tools.ages.pucrs.br/sem-barreiras/wiki/-/wikis/configuracao).

## Executando o projeto

Em primeiro lugar, clone o repositório em sua máquina utilizando os comando abaixo:

```shell
git clone https://tools.ages.pucrs.br/sem-barreiras/sembarreiras-backend.git
```

Em seguida, execute o comando abaixo na raiz do repositório local:

```
npm install
```
Como foi implementada posteriormente uma versão com Login Social Google foi necessário instalar o Clerk logo o comando de instalação de dependências a ser rodado deve ser:
```
npm install --legacy-peer-deps
```

Com este comando, é feita a instalação das dependências necessárias para rodar o projeto que estão especificadas dentro dos arquivos `package-lock.json` e `package-json`. Caso após a execução o Node ou o Expo reclamarem de algum problema de versão execute um dos seguintes comandos:

```
npm update
```

ou

```
npm audit fix
```

Se persistir o problema verifique os logs no terminal para saber qual é o eventual problema e possíveis sugestões de resolução que possam ter sido dadas por parte dos comandos executados.

#### Executando em um celular ou emulador que estão na mesma rede

Para rodar a visualização do projeto dessa forma o comando é igual para ambos os casos, executando o seguinte em um terminal no repositório do projeto:

```
npm start
```

- Caso vá visualizar através do celular, basta escanear com a camera o QR Code que aparecerá na saída do terminal.
- Caso vá visualizar por um emulador, basta pressionar no terminal a tecla do aparelho emulado que deseja abrir o projeto.

#### Executando o projeto via tunnel com celular e máquina em redes distintas

Se por algum motivo seu celular e a máquina em que você está executando o projeto não conseguirem estar na mesma rede, basta executar o projeto com o seguinte comando:

```
npx expo start --tunnel
```

Existe a possibilidade do sistema operacional da máquina bloquear a execução, dado que dessa forma o projeto não executa via LAN, mas sim via tunnel o que acaba ocasionando na execução de um script. Para liberar a execução do script é da seguinte forma:

- Windows : powershell (em modo admin) -> Get-ExecutionPolicy -> se tiver restricted -> Set-ExecutionPolicy RemoteSigned -> Y/S para confirmar

- Linux/mac : chmod +x {meu_arquivo.sh}

## Login no Expo

Quando rodar o projeto, ao escanear o QR Code ou inicia-lo em um Emulador, o Expo pedirá para que você realize login, você pode criar conta no Expo através do [link](https://expo.dev/singup). Com ele você pode visualizar projetos recentes e gerar o build da apk do projeto. Caso não deseja criar conta, basta rodar o seguinte comando ao invés dos anteriores:

```
npx expo start --offline
```

## Padronização de formatação

Apesar de não ser necessário o uso do Visual Studio Code, é recomendável a fim de facilitar o desenvolvimento do código e o controle de versionamento (GitLab). Além disso, o mesmo fornece uma ampla gama de extensões que serão nesse caso essenciais para padrinização do código.

Após a instalação do VSCode, vá na aba de extensões e instale as seguintes:

- ESLint : para IDE encontrar padrões do React Native que estão sendo desrespeitados.
- Prettier : para IDE realizar identação de forma correta.

Depois de instalar essas extensões, basta uma configuração final para começar o desenvolvimento. Com o VSCode aberto, pressione as teclas `Ctrl` + `Shift` + `P` para rápido acesso a aba de pesquisa do VSCode. Procure por `settings`, abra `Preferences: Open Settings (Json)` e adicione as seguintes linhas:
```
"editor.formatOnSave": true,
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

Dessa forma, o atalho padrão para o auto-formatter é `Shift` + `Alt` + `F`.