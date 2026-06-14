resource "null_resource" "istio" {
  provisioner "local-exec" {
    command = "echo 'Istio installation placeholder'"
  }
}
