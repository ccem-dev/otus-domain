###############################################
###               Variables                 ###
###############################################
variable "otus-domain-frontend-dockerfile" {
  default = "."  
}

variable "otus-domain-frontend-name" {
  default = "otus-domain-frontend"  
}

variable "otus-domain-frontend-directory" {
  default = "otus-domain"  
}

variable "otus-domain-frontend-source" {
  default = "source"  
}

variable "otus-domain-frontend-cleanup" {
  default = "rm -rf dist node_modules package-lock.json"  
}

variable "otus-domain-frontend-npminstall" {
  default = "npm install"
}

variable "otus-domain-frontend-npmtest" {
  default = "npm test"
}

variable "otus-domain-frontend-npmbuild" {
  default = "npm run build"
}

variable "otus-domain-frontend-npmprune" {
  default = "npm prune --production"
}

###############################################
###  OTUS-DOMAIN : Build Image Front-End    ###
###############################################
resource "null_resource" "otus-domain-frontend-cleanup" {
  provisioner "local-exec" {
    working_dir = "${var.otus-domain-frontend-source}"
    command = "${var.otus-domain-frontend-cleanup}"
  }
} 

resource "null_resource" "otus-domain-frontend-install" {
  depends_on = [null_resource.otus-domain-frontend-cleanup]
  provisioner "local-exec" {
    working_dir = "${var.otus-domain-frontend-source}"
    command = "${var.otus-domain-frontend-npminstall}"
  }
}

resource "null_resource" "otus-domain-frontend-test" {
  depends_on = [null_resource.otus-domain-frontend-install]
  provisioner "local-exec" {
    working_dir = "${var.otus-domain-frontend-source}"
    command = "${var.otus-domain-frontend-npmtest}"
  }
}

resource "null_resource" "otus-domain-frontend-build" {
  depends_on = [null_resource.otus-domain-frontend-test]
  provisioner "local-exec" {
    working_dir = "${var.otus-domain-frontend-source}"
    command = "${var.otus-domain-frontend-npmbuild}"
  }
}

resource "null_resource" "otus-domain-frontend-prune" {
  depends_on = [null_resource.otus-domain-frontend-build]
  provisioner "local-exec" {
    working_dir = "${var.otus-domain-frontend-source}"
    command = "${var.otus-domain-frontend-npmprune}"
  }
}
 
resource "null_resource" "otus-domain-frontend" {
  depends_on = [null_resource.otus-domain-frontend-prune]
  provisioner "local-exec" {
    command = "docker build -t ${var.otus-domain-frontend-name} ${var.otus-domain-frontend-dockerfile}"
  }
}
