###############################################
###               Variables                 ###
###############################################
variable "otus-domain-frontend-name" {
  default = "otus-domain-frontend"  
}
variable "otus-domain-frontend-directory" {
  default = "otus-domain"  
}
variable "otus-domain-frontend-source" {
  default = "source"  
}

variable "otus-domain-frontend-npmbuild" {
  default = "run build"
  
}

###############################################
###  OTUS-DOMAIN : Build Image Front-End    ###
###############################################
resource "null_resource" "otus-domain-frontend-build" {
  provisioner "local-exec" {
    working_dir = "source"
    command = "npm ${var.otus-domain-frontend-npmbuild}"
  }
}

resource "null_resource" "otus-domain-frontend" {
  depends_on = [null_resource.otus-domain-frontend-build]
  provisioner "local-exec" {
    command = "docker build -t ${var.otus-domain-frontend-name} ."
  }
}
