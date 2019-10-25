variable "otus-domain-frontend" {
  type = "map"
  default = {
	"name" = "otus-domain-frontend"
	"port" = 51005
  }
}

resource "docker_image" "otus-domain-frontend" {
  name = "otus-domain-frontend:latest"
}

resource "docker_container" "otus-domain-frontend" {
  name = "otus-domain-frontend"
  image = "${docker_image.otus-domain-frontend.latest}"
  ports {
	internal = 80
	external = "${var.otus-domain-frontend["port"]}"
  }
}
