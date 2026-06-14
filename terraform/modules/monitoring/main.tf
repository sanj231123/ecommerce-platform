resource "kubernetes_namespace" "monitoring" {
  metadata {
    name = "monitoring"
  }
}

resource "null_resource" "monitoring" {
  provisioner "local-exec" {
    command = <<EOT
kubectl apply -f ../../manifests/monitoring/
EOT
  }
}
