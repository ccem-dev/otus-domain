variable "otus-domain-frontend-port" {
  default = 51005
}

variable "otus-api-network" {
  default = "otus-api-network"
}

variable "otus-domain-frontend-apiurl" {
  default = "http://otus-domain-api:8080"
}

variable "otus-domain-production-base-path" {
  default = "/otus-domain"
}

variable "volumes_host_path" {
  default = "/usr/Desktop/volumes"
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
  env = [
    "API_URL=${var.otus-domain-frontend-apiurl}",
    "PRODUCTION_BASE_PATH=${var.otus-domain-production-base-path}",
    "VOLUMES_HOST_PATH=${var.volumes_host_path}"
  ]
  ports {
	internal = 80
	external = "${var.otus-domain-frontend-port}"
  }
	  networks_advanced {
    name    = "${var.otus-api-network}"
  }
  volumes {
    host_path = "${var.volumes_host_path}"
    container_path = "/usr/share/nginx/html/otus-domain/volumes"
  }
}
