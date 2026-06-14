module "kind" {
  source = "../../modules/kind"
}

module "istio" {
  source = "../../modules/istio"
}

module "argocd" {
  source = "../../modules/argocd"
}

module "monitoring" {
  source = "../../modules/monitoring"
}

module "ecommerce" {
  source = "../../modules/ecommerce"
}
