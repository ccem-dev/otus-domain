# Configuração de Ambiente
## Download de Dependencias

- Servidor: [Wildfly 9.0.1.Final](https://www.mongodb.com/download-center#community)

### Versões de ferramentas necessárias

NodeJS: [v6.6.0](https://nodejs.org/en/download/current/) <br />
Google Chrome : [52 +](https://www.google.com.br/chrome/browser/desktop/) 

## Configurações Servidor
[Ambiente Otus Domain Vagrante](https://github.com/ccem-dev/otus-domain-api-vagrant/blob/master/README.md)

Passos para realizar configurações manuais:

> servidor/standalone/configuration/standalone.xml

### Habilitar CORS (Cross-origin resource sharing) 
Para tornar possivel a acesso do projeto Domain (back-end) via java script é necessaria habilitar o recurso CORS.

``` xml
 <subsystem xmlns="urn:jboss:domain:undertow:2.0">
            <buffer-cache name="default"/>
            <server name="default-server">
                <http-listener name="default" socket-binding="http" redirect-socket="https"/>
                <host name="default-host" alias="localhost">
                    <location name="/" handler="welcome-content"/>
                    <filter-ref name="server-header"/>
                    <filter-ref name="x-powered-by-header"/>
                    <filter-ref name="Access-Control-Allow-Origin"/>
                    <filter-ref name="Access-Control-Allow-Methods"/>
                    <filter-ref name="Access-Control-Allow-Headers"/>
                    <filter-ref name="Access-Control-Allow-Credentials"/>
                </host>
            </server>
            <servlet-container name="default">
                <jsp-config/>
                <websockets/>
            </servlet-container>
            <handlers>
                <file name="welcome-content" path="${jboss.home.dir}/welcome-content"/>
            </handlers>
            <filters>
                <response-header name="server-header" header-name="Server" header-value="WildFly/9"/>
                <response-header name="x-powered-by-header" header-name="X-Powered-By" header-value="Undertow/1"/>
                <response-header name="Access-Control-Allow-Origin" header-name="Access-Control-Allow-Origin" header-value="*"/>
                <response-header name="Access-Control-Allow-Methods" header-name="Access-Control-Allow-Methods" header-value="*"/>
                <response-header name="Access-Control-Allow-Headers" header-name="Access-Control-Allow-Headers" header-value="Content-Type, Authorization"/>
                <response-header name="Access-Control-Allow-Credentials" header-name="Access-Control-Allow-Credentials" header-value="true"/>
            </filters>
        </subsystem>
```

### Inicializar Jboss Porta 80
Para facilitar a manutenção da url deve-se utilizar o servidor (back-end) na porta 80.

``` xml
 <socket-binding-group name="standard-sockets" default-interface="public" port-offset="${jboss.socket.binding.port-offset:0}">
        <socket-binding name="management-http" interface="management" port="${jboss.management.http.port:9990}"/>
        <socket-binding name="management-https" interface="management" port="${jboss.management.https.port:9993}"/>
        <socket-binding name="ajp" port="${jboss.ajp.port:8009}"/>
        <socket-binding name="http" port="${jboss.http.port:80}"/>
        <socket-binding name="https" port="${jboss.https.port:8443}"/>
        <socket-binding name="txn-recovery-environment" port="4712"/>
        <socket-binding name="txn-status-manager" port="4713"/>
        <outbound-socket-binding name="mail-smtp">
            <remote-destination host="localhost" port="25"/>
        </outbound-socket-binding>
    </socket-binding-group>
```

### Criar base de dados MongoDB

> use otus-domain <br>
> db.createUser({user:"otus", pwd:"otus", roles:[{role:"dbOwner", db:"otus-domain"}]}) <br>

### Construindo o Projeto
Para construir e realizar o deploy da aplição devem ser utilizadas as ferramentas [Maven](https://maven.apache.org/) e [NPM](https://www.npmjs.com/).

Navegue até a pasta **otus-domain**, e execute:

Para realizar download de dependencias de front-end
> npm install

Para realizar a remoção de dependencias de desenvolvimento
> npm prune --production

Navegue até a pasta **otus-domain-root**, e execute:

> $ mvn clean install 

## Customizando dados Database MongoDB
Como default os seguintes dados são utilizados para a base de dados:

**Nome**    : otus <br>
**Usuário** : otus <br>
**Senha**   : otus <br>

## Customizar Database
Para customizar o sistema para determinada base de dados, os seguintes valores podem
ser utilizados como parametro durante o build:

**HOST** : Endereço database (Ex. localhost)<br>
**PORT** : Porta database (Ex. 27017)<br>
**USER** : Usuário utilizado para administração da base de dados. <br>
** Deve estar presente na base de dados otus-domain **

> $ mvn wildfly:deploy -Ddatabase.host=HOST -Ddatabase.port=PORT -Ddatabase.username=USER -Ddatabase.password=PWD

**O sistema sempre ira utilizar autenticação. Por default o database mongo não utiliza autenticação.
Certifique-se que esta iniciando o respectivo serviço com --auth**

### Deploy Back-End
Para realizar o deploy do back-end, tendo previamente realizado a construção do projeto, navegue para a pasta **otus-domain-ear**, e execute:

> $ mvn wildfly:deploy

### Deploy Front-End
Para realizar o deploy do back-end, tendo previamente realizado a construção do projeto, navegue para a pasta **otus-domain**, e execute:

> $ mvn wildfly:deploy

### Inicializando Front-End utilizando Browser-Sync
Para desenvolvimento de aplicações front-end, em ambiente de desenvolvimento, é possivel utilizar a ferramenta Browser Sync. Navegue para **otus-domain**, execute :

Para realizar download de dependencias de front-end
> npm install

** Não realize npm prune --production pois a operação utiliza dependencias em escopo de desenvolvimento.**

Inicializando o servidor
> $ npm start

> ou

> $ npm run gulp browser-sync

O serviço de front-end será acessivel através da url: **localhost:3000/otus-domain**

### Inicializando Front-End utilizando SCP
É possivel realizar o "deploy" da aplicação em qualquer tipo de serviço que seja acessivel utilizando SCP.
Sync. Navegue para **otus-domain**, execute :

Para realizar download de dependencias de front-end
> npm install

** Não realize npm prune --production pois a operação utiliza dependencias em escopo de desenvolvimento.**

> mvn antrun:run@static-deploy -Dscp.user='USER' -Dscp.host='HOST' -Dscp.target='DIRECTORY_TARGET' -Dscp.password='USER_PASSWORD'

O serviço de front-end será acessivel através da url: **URL_SERVIDOR/otus-domain**

### Contato
Gostaria de saber mais sobre nosso projeto ?! Entre em contato conosco. <br />
Email: ccem-projects@gmail.com <br />
Chat : https://www.hipchat.com/gWD3zStLw


