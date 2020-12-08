# Build Image
sudo docker build -t otus-domain-frontend .

# Build Container
sudo docker run -p 51005:80 --name otus-domain-frontend otus-domain-frontend 

# API URL
Default: "http://localhost:51002"

## Parameterized
sudo docker run -e API_URL="http://address" -p 51005:80 --name otus-domain-frontend otus-domain-frontend 

## Dependencias
### Volumes
```
É necessário a existência de dois arquivos dentro de uma pasta volumes, na seguinte estrutura:
```
> volumes
>> keycloak.json
> 
>>project.json

###keycloak.json
```
O arquivo keycloak.json pode ser adquirido através da aba installation no client:
```
> client -> installation -> format option - Keycloak OIDC JSON

###project.json

```
Em project.json, está a configuração do projeto domain. Como exemplo o domain possuí o arquivo na pasta:
```
> source
>> volumes
## terraform
#### run container

```
*host_path: caminho onde a pasta volumes está localizada na maquina local ou no servidor
```

> terraform apply --auto-approve -var="volumes_host_path=*host_path" terraform/run-container
## Contato
Gostaria de saber mais sobre nosso projeto? <br />
Entre em contato conosco. <br />
Email: contato@otus-solutions.com.br <br />
