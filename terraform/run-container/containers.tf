variable "otus-domain-frontend-port" {
  default = 51006
}

variable "otus-domain-frontend-apiurl" {
  default = "http://otus-domain-api:8080"  
}

variable "otus-domain-frontend-version" {
  default = "latest"
}

resource "docker_image" "otus-domain-frontend" {
  name = "otus-domain-frontend:${var.otus-domain-frontend-version}"
}

resource "docker_container" "otus-domain-frontend" {
  name = "otus-domain-frontend"
  image = "${docker_image.otus-domain-frontend.name}"
  env = ["API_URL=${var.otus-domain-frontend-apiurl}"]
  ports {
	internal = 80
	external = "${var.otus-domain-frontend-port}"
  }
}
