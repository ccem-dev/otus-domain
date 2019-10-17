###############################################
###               Variables                 ###
###############################################

variable "otus-domain" {
  type = "map"
  default = {
    "name" = "otus-domain"
    "directory" = "otus-domain"
    "source" = "/source"
  }
}

###############################################
###  OTUS-DOMAIN : Build Image Front-End    ###
###############################################
resource "null_resource" "otus-domain" {
  provisioner "local-exec" {
    command = "cd ${var.otus-domain["directory"]}/${var.otus-domain["source"]} && npm install"
  }
  provisioner "local-exec" {
    command = "sudo docker build -t ${var.otus-domain["name"]} ${var.otus-domain["directory"]}"
  }
}