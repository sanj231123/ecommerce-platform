resource "null_resource" "kind_cluster" {
  provisioner "local-exec" {
    command = "echo 'Kind cluster creation placeholder'"
  }
}
