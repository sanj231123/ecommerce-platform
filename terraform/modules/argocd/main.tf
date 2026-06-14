resource "kubernetes_namespace" "argocd" {
  metadata {
    name = "argocd"
  }
}

resource "null_resource" "argocd" {
  provisioner "local-exec" {
    command = "echo 'ArgoCD installation placeholder'"
  }
}
