### Browser Sync Front-End

Para desenvolvimento de aplicações front-end é possivel utilizar a ferramenta Browser Sync.

> $ cd otus-domain

> $ npm start

> ou

> $ npm run gulp browser-sync


O serviço de front-end será acessivel através da url: **localhost:3000/otus-domain**


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


### Habilitar CORS (Cross-origin resource sharing) 

Para tornar possivel a acesso do projeto Domain (back-end) via java script é necessaria habilitar o recurso CORS.
Essa configuração é aplicada diretamente ao Servidor de Aplicação Wildfly 9.0.1 :

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
                <response-header name="Access-Control-Allow-Headers" header-name="Access-Control-Allow-Headers" header-value="Content-Type"/>
                <response-header name="Access-Control-Allow-Credentials" header-name="Access-Control-Allow-Credentials" header-value="true"/>
            </filters>
        </subsystem>
```

### Configuração Datasource Wildfly

Passos para realizar configuração da base de dados do projeto.

## Artefatos para download:

- Servidor: [Wildfly 9.0.1.Final](http://wildfly.org/downloads/)
- JDBC: [Postgres 9.4 Build 1203](https://jdbc.postgresql.org/download.html)

## Adição de Management User

Para tornar possivel o acesso ao painel administrativo do servidor é necessario existir um usuario com as respectivas permissões. Adicione um usuario Management. [Tutorial](https://docs.jboss.org/author/display/WFLY8/add-user+utility)

## Deploy JDBC

Acessar Url http://servidor:9990/console (Painel Administrativo Servidor). 

1. Opção Deployments
2. Adicionar
3. Upload novo Deploy
4. Selecionar arquivo JDBC
5. Habilitar
6. Finalizar


## Configurar Datasource

Acessar Url http://servidor:9990/console (Painel Administrativo Servidor). 

1. Configurações
2. Subsystems
3. Datasources
4. View
5. Adicionar

Dados para Datasource:
```
Nome: otus-domain
JNDI: java:/jboss/datasources/domain
```
**Deve existir uma base de dados previamente criada com o respectivo nome otus-domain.**

Selecionar **Detected Driver** : *postgresql-9.4-1203.jdbc.jar*

**Test Connection - Success**


