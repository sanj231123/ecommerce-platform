# Terraform Infrastructure as Code

This Terraform structure automates:

- Kind Cluster
- Istio Service Mesh
- ArgoCD GitOps
- Monitoring Stack
  - Prometheus
  - Grafana
  - Loki
- Ecommerce Platform

Current live environment is managed through GitOps and Kubernetes manifests.

Terraform modules are provided for Infrastructure as Code automation and future provisioning.

Modules:
- kind
- istio
- argocd
- monitoring
- ecommerce
