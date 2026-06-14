resource "kubernetes_namespace" "ecom" {
  metadata {
    name = "ecom"
  }
}

resource "null_resource" "deploy_services" {
  triggers = {
    always_run = timestamp()
  }

  provisioner "local-exec" {
    command = <<EOT
kubectl apply -f ../../manifests/services/
kubectl apply -f ../../manifests/frontend/
kubectl apply -f ../../manifests/hpa/
EOT
  }
}
