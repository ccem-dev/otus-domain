# Build Image
sudo docker build -t otus-domain-frontend .

# Build Container
sudo docker run -p 51005:80 --name otus-domain-frontend otus-domain-frontend 

# API URL
Default: "http://localhost:51002"

## Parameterized
sudo docker run -e API_URL="http://address" -p 51005:80 --name otus-domain-frontend otus-domain-frontend 

## Contato
Gostaria de saber mais sobre nosso projeto? <br />
Entre em contato conosco. <br />
Email: contato@otus-solutions.com.br <br />
