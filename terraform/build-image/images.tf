###############################################
###               Variables                 ###
###############################################
variable "otus-domain-name" {
  default = "otus-domain"  
}
variable "otus-domain-directory" {
  default = "otus-domain"  
}
variable "otus-domain-source" {
  default = "/source"  
}

variable "otus-domain-npmbuild" {
  default = "install"
  
}


###############################################
###  OTUS-DOMAIN : Build Image Front-End    ###
###############################################
resource "null_resource" "otus-domain-build" {
  provisioner "local-exec" {
    working_dir = "otus-domain/source"
    command = "npm ${var.otus-domain-npmbuild}"
  }
}

resource "null_resource" "otus-domain" {
  depends_on = [null_resource.otus-domain-build]
  provisioner "local-exec" {
    working_dir = "otus-domain"
    command = "docker build -t ${var.otus-domain-name} ."
  }
}