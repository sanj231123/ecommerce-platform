# 🚀 Production-Grade E-Commerce Platform on Kubernetes

A complete cloud-native microservices platform built on Kubernetes using GitOps, Service Mesh, Observability, Security Policies, Canary Deployments, Infrastructure as Code, and CI/CD automation.
---
# 📌 Project Overview

This project demonstrates a production-style Kubernetes platform running a microservices-based e-commerce application.

The platform includes:

* Kubernetes (Kind)
* Docker
* GitHub Actions CI/CD
* ArgoCD GitOps
* Istio Service Mesh
* Gateway API
* Kiali Traffic Visualization
* Prometheus Monitoring
* Grafana Dashboards
* Loki Log Aggregation
* AlertManager
* ServiceMonitors
* Prometheus Rules
* Horizontal Pod Autoscaler (HPA)
* Network Policies
* Redis Cache
* RabbitMQ Messaging
* MySQL Database
* ETCD Backup Automation
* Terraform Infrastructure Modules

The goal is to demonstrate real-world DevOps and Platform Engineering practices using open-source technologies.

---

# 🏗 Architecture

```text
Internet User
      │
      ▼
Gateway API
      │
      ▼
Istio Gateway
      │
      ▼
API Gateway
      │
 ┌────┼──────────────────────────────┐
 ▼    ▼      ▼      ▼      ▼         ▼
Auth User Product Cart Order Payment Notification
      │
      ├── Redis
      ├── RabbitMQ
      └── MySQL

─────────────────────────────────────

Prometheus
     ▲
     │
ServiceMonitors

Grafana
     ▲
     │
Prometheus

Loki
     ▲
     │
Promtail

─────────────────────────────────────

GitHub Actions
       │
       ▼
Docker Hub
       │
       ▼
ArgoCD
       │
       ▼
Kubernetes Cluster
```

---

# 🚀 Features

## Kubernetes

* Multi-node Kind Cluster
* Namespace isolation
* Deployments
* Services
* Configurations
* Secrets
* HPA

## Service Mesh

* Istio Service Mesh
* Gateway API Integration
* Traffic Management
* Canary Releases
* Observability

## GitOps

* ArgoCD
* Automated Synchronization
* Declarative Deployments

## Monitoring

* Prometheus
* Grafana
* AlertManager
* ServiceMonitors
* Prometheus Rules

## Logging

* Loki
* Promtail
* Centralized Logs

## Security

* Default Deny Network Policy
* Internal Service Communication Policies
* MySQL Access Restrictions
* Prometheus Access Rules

## Infrastructure

* Redis
* RabbitMQ
* MySQL

## Automation

* GitHub Actions
* Docker Hub Integration
* ETCD Backups
* Terraform Modules

---

# 📂 Repository Structure

```text
ecommerce-platform
│
├── manifests/
│   ├── argocd/
│   ├── cronjobs/
│   ├── frontend/
│   ├── hpa/
│   ├── infra/
│   │   ├── mysql/
│   │   ├── rabbitmq/
│   │   └── redis/
│   ├── monitoring/
│   ├── networking/
│   ├── security/
│   └── services/
│
├── services-code/
│   ├── api-gateway/
│   ├── auth-service/
│   ├── cart-service/
│   ├── frontend/
│   ├── notification-service/
│   ├── order-service/
│   ├── payment-service/
│   ├── product-service/
│   └── user-service/
│
├── terraform/
│   ├── modules/
│   └── environments/
│
└── .github/
    └── workflows/
```

---

# 🖥 Cluster Information

Current Environment

```text
Cluster Name : mahakal

Nodes:

mahakal-control-plane
mahakal-worker
mahakal-worker2
mahakal-worker3

Kubernetes Version:
v1.31.2
```

Verify:

```bash
kind get clusters

kubectl get nodes
```

Expected:

```bash
NAME                    STATUS
mahakal-control-plane   Ready
mahakal-worker          Ready
mahakal-worker2         Ready
mahakal-worker3         Ready
```

---

# 🔧 Prerequisites

Install the following:

## Docker

```bash
docker --version
```

## Kubectl

```bash
kubectl version --client
```

## Kind

```bash
kind version
```

## Git

```bash
git --version
```

## Helm

```bash
helm version
```

## Istioctl

```bash
istioctl version
```

---

# 📥 Clone Repository

```bash
git clone git@github.com:sanj231123/ecommerce-platform.git

cd ecommerce-platform
```

---

# ☸ Create Kind Cluster

Create cluster configuration:

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4

nodes:
- role: control-plane
- role: worker
- role: worker
- role: worker
```

Create cluster:

```bash
kind create cluster \
--name mahakal \
--config kind-config.yaml
```

Verify:

```bash
kubectl get nodes
```

---

# 📦 Create Namespace

```bash
kubectl apply -f manifests/namespace.yml
```

Verify:

```bash
kubectl get ns
```

Expected:

```text
ecom
argocd
monitoring
logging
istio-system
```

---

# 🗄 Deploy Infrastructure Services

## MySQL

```bash
kubectl apply -f manifests/infra/mysql/
```

Verify:

```bash
kubectl get pods -n ecom
```

## Redis

```bash
kubectl apply -f manifests/infra/redis/
```

Verify:

```bash
kubectl get svc -n ecom redis
```

## RabbitMQ

```bash
kubectl apply -f manifests/infra/rabbitmq/
```

Verify:

```bash
kubectl get svc -n ecom rabbitmq
```

---

# 🚀 Deploy Microservices

Deploy all services:

```bash
kubectl apply -f manifests/services/
```

Deploy frontend:

```bash
kubectl apply -f manifests/frontend/
```

Verify:

```bash
kubectl get pods -n ecom
```

Expected services:

```text
api-gateway
auth-service
user-service
user-service-v2
product-service
cart-service
order-service
payment-service
notification-service
frontend
mysql
redis
rabbitmq
```

---

# 🌐 Access Application

Check gateway service:

```bash
kubectl get svc -n istio-system
```

Get access URL:

```bash
kubectl get gateway -A

kubectl get httproute -A
```

Verify:

```bash
curl http://localhost
```
# 🐳 Docker Build & Containerization

Each microservice is containerized using Docker.

Services:

```text
api-gateway
auth-service
user-service
product-service
cart-service
order-service
payment-service
notification-service
frontend
```

---

## Build Docker Images

### API Gateway

```bash
cd services-code/api-gateway

docker build -t <dockerhub-user>/api-gateway:latest .
```

### Auth Service

```bash
cd services-code/auth-service

docker build -t <dockerhub-user>/auth-service:latest .
```

### User Service

```bash
cd services-code/user-service

docker build -t <dockerhub-user>/user-service:latest .
```

### Product Service

```bash
cd services-code/product-service

docker build -t <dockerhub-user>/product-service:latest .
```

### Cart Service

```bash
cd services-code/cart-service

docker build -t <dockerhub-user>/cart-service:latest .
```

### Order Service

```bash
cd services-code/order-service

docker build -t <dockerhub-user>/order-service:latest .
```

### Payment Service

```bash
cd services-code/payment-service

docker build -t <dockerhub-user>/payment-service:latest .
```

### Notification Service

```bash
cd services-code/notification-service

docker build -t <dockerhub-user>/notification-service:latest .
```

### Frontend

```bash
cd services-code/frontend

docker build -t <dockerhub-user>/frontend:latest .
```

---

# 📤 Push Images to Docker Hub

Login:

```bash
docker login
```

Push:

```bash
docker push <dockerhub-user>/api-gateway:latest

docker push <dockerhub-user>/auth-service:latest

docker push <dockerhub-user>/user-service:latest

docker push <dockerhub-user>/product-service:latest

docker push <dockerhub-user>/cart-service:latest

docker push <dockerhub-user>/order-service:latest

docker push <dockerhub-user>/payment-service:latest

docker push <dockerhub-user>/notification-service:latest

docker push <dockerhub-user>/frontend:latest
```

Verify:

```bash
docker images
```

---

# 🔄 CI/CD Pipeline

GitHub Actions automatically builds and pushes images.

Pipeline Flow:

```text
Developer Push
      │
      ▼
GitHub Repository
      │
      ▼
GitHub Actions
      │
      ▼
Docker Build
      │
      ▼
Docker Hub Push
      │
      ▼
Manifest Update
      │
      ▼
ArgoCD Sync
      │
      ▼
Kubernetes Deployment
```

---

# ⚙ GitHub Actions Workflow

Workflow Location:

```text
.github/workflows/
```

Verify Workflow Runs:

```bash
GitHub Repository
     ↓
Actions Tab
```

Successful Workflow:

```text
✓ Build
✓ Test
✓ Docker Build
✓ Docker Push
✓ Manifest Update
✓ ArgoCD Sync
```

---

# 🚀 ArgoCD GitOps

ArgoCD continuously watches GitHub and synchronizes Kubernetes.

Namespace:

```bash
kubectl get ns argocd
```

Check Pods:

```bash
kubectl get pods -n argocd
```

Expected:

```text
argocd-server
argocd-repo-server
argocd-application-controller
argocd-dex-server
argocd-redis
```

---

# 🔐 Access ArgoCD

Current Service:

```bash
kubectl get svc -n argocd
```

Output:

```text
argocd-server
NodePort
31939
```

Port Forward:

```bash
kubectl port-forward svc/argocd-server \
-n argocd \
8080:80
```

Access:

```text
http://localhost:8080
```

---

## ArgoCD Admin Password

Get Password:

```bash
kubectl -n argocd get secret argocd-initial-admin-secret \
-o jsonpath="{.data.password}" | base64 -d
```

Login:

```text
Username: admin
Password: <generated-password>
```

---

# 📦 ArgoCD Applications

Check Applications:

```bash
kubectl get applications -n argocd
```

Current:

```text
ecommerce-platform
nginx
```

Expected:

```text
SYNC STATUS : Synced
HEALTH      : Healthy
```

---

# 🔄 GitOps Workflow

Developer Change:

```text
Code Change
```

Push:

```bash
git add .

git commit -m "feature update"

git push origin main
```

Pipeline:

```text
GitHub Actions
      │
      ▼
Docker Build
      │
      ▼
Docker Hub
      │
      ▼
Manifest Update
      │
      ▼
ArgoCD Detects Change
      │
      ▼
Auto Sync
      │
      ▼
Deployment Updated
```

---

# 🌐 Gateway API

Gateway API is used instead of traditional Ingress.

Files:

```text
manifests/networking/gateway-api/
```

Components:

```text
GatewayClass
Gateway
HTTPRoute
Security Policies
Observability
Canary Rules
mTLS
```

Verify:

```bash
kubectl get gateway -A

kubectl get httproute -A
```

Current:

```text
Gateway:
ecom-gateway

HTTPRoute:
ecom-route
```

---

# 🕸 Istio Service Mesh

Installed Namespace:

```bash
kubectl get ns istio-system
```

Verify:

```bash
kubectl get pods -n istio-system
```

Expected:

```text
istiod
istio-ingressgateway
istio-egressgateway
ecom-gateway-istio
kiali
```

---

# Verify Sidecar Injection

Check:

```bash
kubectl get pods -n ecom
```

Expected:

```text
2/2 Running
```

Explanation:

```text
Container 1 = Application
Container 2 = Envoy Sidecar
```

---

# Verify Istio Proxy

Example:

```bash
kubectl describe pod \
-n ecom \
$(kubectl get pod -n ecom \
-o name | head -1)
```

Look For:

```text
istio-proxy
```

---

# 📊 Kiali Service Mesh Visualization

Verify Service:

```bash
kubectl get svc -n istio-system kiali
```

Port Forward:

```bash
kubectl port-forward \
svc/kiali \
-n istio-system \
20001:20001
```

Access:

```text
http://localhost:20001
```

---

# Kiali Features

```text
Traffic Graph
Request Rate
Response Time
Error Rate
Workloads
Applications
Services
Security
Istio Configuration
```

---

# 🚦 Canary Deployment

Implemented:

```text
user-service-v1
user-service-v2
```

Traffic Split:

```text
90% → v1

10% → v2
```

Files:

```text
manifests/networking/gateway-api/canary/
```

Verify:

```bash
kubectl get pods -n ecom | grep user
```

Expected:

```text
user-service
user-service-v2
```

---

# 🔍 Validate Traffic

Generate Traffic:

```bash
for i in {1..100}
do
curl http://localhost
done
```

Observe:

```text
Kiali Traffic Graph
```

Traffic should be distributed between:

```text
user-service

user-service-v2
```

---

# 🔒 Mutual TLS (mTLS)

Location:

```text
manifests/networking/gateway-api/mtls.yml
```

Verify:

```bash
kubectl get peerauthentication -A
```

Benefits:

```text
Encrypted Service Communication
Identity Verification
Zero Trust Networking
```
# 📊 Monitoring & Observability Stack

This platform implements a complete observability stack using:

```text
Prometheus
Grafana
AlertManager
ServiceMonitors
PrometheusRules
Loki
Promtail
Node Exporter
Kube State Metrics
Istio Metrics
Application Metrics
```

---

# 🏗 Monitoring Architecture

```text
Microservices
      │
      ▼
/metrics Endpoint
      │
      ▼
ServiceMonitor
      │
      ▼
Prometheus
      │
      ├── Alert Rules
      │
      ├── AlertManager
      │
      └── Grafana

────────────────────────

Application Logs
      │
      ▼
Promtail
      │
      ▼
Loki
      │
      ▼
Grafana
```

---

# 📦 Monitoring Components

Namespace:

```bash
kubectl get ns monitoring
```

Verify Monitoring Pods:

```bash
kubectl get pods -n monitoring
```

Expected:

```text
prometheus-monitoring-kube-prometheus-prometheus-0

alertmanager-monitoring-kube-prometheus-alertmanager-0

monitoring-grafana

monitoring-kube-prometheus-operator

monitoring-kube-state-metrics

monitoring-prometheus-node-exporter
```

---

# 🔥 Prometheus

Service:

```bash
kubectl get svc -n monitoring
```

Current Service:

```text
monitoring-kube-prometheus-prometheus

NodePort: 32001
```

---

## Access Prometheus

Port Forward:

```bash
kubectl port-forward \
svc/monitoring-kube-prometheus-prometheus \
-n monitoring \
9090:9090
```

Access:

```text
http://localhost:9090
```

OR

```text
http://<NODE-IP>:32001
```

---

# 📈 Verify Targets

Open:

```text
Status
 ↓
Targets
```

All targets should be:

```text
UP
```

---

# ServiceMonitors

Current ServiceMonitors:

```bash
kubectl get servicemonitor -A
```

Installed:

```text
api-gateway-monitor
auth-service-monitor
cart-service-monitor
notification-service-monitor
order-service-monitor
payment-service-monitor
product-service-monitor
user-service-monitor
istiod-monitor
```

---

# 🔎 Prometheus Queries

---

## Pod Count

```promql
count(kube_pod_info)
```

---

## Running Pods

```promql
count(kube_pod_status_phase{phase="Running"})
```

---

## Namespace Count

```promql
count(kube_namespace_created)
```

---

## Node Count

```promql
count(kube_node_info)
```

---

## Node CPU Usage %

```promql
100 -
(avg by(instance)
(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```

---

## Node Memory Usage %

```promql
(
1 -
(
node_memory_MemAvailable_bytes
/
node_memory_MemTotal_bytes
)
) * 100
```

---

## Disk Usage %

```promql
100 -
(
node_filesystem_avail_bytes
/
node_filesystem_size_bytes
) * 100
```

---

## Node Load Average

```promql
node_load1
```

---

## Pod Restart Count

```promql
increase(kube_pod_container_status_restarts_total[1h])
```

---

# 🚀 Application Queries

---

## API Gateway Request Rate

```promql
rate(http_requests_total[5m])
```

---

## Total Requests

```promql
sum(http_requests_total)
```

---

## Requests Per Second

```promql
sum(rate(http_requests_total[1m]))
```

---

## Error Rate

```promql
sum(rate(http_requests_total{status=~"5.."}[5m]))
```

---

## Success Rate

```promql
sum(rate(http_requests_total{status=~"2.."}[5m]))
```

---

## HTTP Latency

```promql
histogram_quantile(
0.95,
sum(
rate(http_request_duration_seconds_bucket[5m])
)
by (le)
)
```

---

## Top Services by Traffic

```promql
topk(
10,
sum(rate(http_requests_total[5m]))
by (job)
)
```

---

# 💾 Container Metrics

---

## Container CPU

```promql
sum(
rate(container_cpu_usage_seconds_total[5m])
)
by (pod)
```

---

## Container Memory

```promql
container_memory_usage_bytes
```

---

## Memory by Pod

```promql
sum(
container_memory_usage_bytes
)
by (pod)
```

---

## CPU by Pod

```promql
sum(
rate(container_cpu_usage_seconds_total[5m])
)
by (pod)
```

---

# 📦 Kubernetes Metrics

---

## Deployment Replicas

```promql
kube_deployment_status_replicas
```

---

## Available Replicas

```promql
kube_deployment_status_replicas_available
```

---

## Desired Replicas

```promql
kube_deployment_spec_replicas
```

---

## HPA Current Replicas

```promql
kube_horizontalpodautoscaler_status_current_replicas
```

---

## HPA Desired Replicas

```promql
kube_horizontalpodautoscaler_status_desired_replicas
```

---

# 🕸 Istio Queries

---

## Total Requests

```promql
sum(
rate(
istio_requests_total[5m]
)
)
```

---

## Requests By Service

```promql
sum(
rate(
istio_requests_total[5m]
)
)
by (destination_workload)
```

---

## Error Requests

```promql
sum(
rate(
istio_requests_total{
response_code=~"5.."
}[5m]
)
)
```

---

## Success Requests

```promql
sum(
rate(
istio_requests_total{
response_code=~"2.."
}[5m]
)
)
```

---

## P95 Latency

```promql
histogram_quantile(
0.95,
sum(
rate(
istio_request_duration_milliseconds_bucket[5m]
)
)
by (le)
)
```

---

# 🖥 Grafana

Current Service:

```bash
kubectl get svc -n monitoring monitoring-grafana
```

Current NodePort:

```text
32000
```

---

## Access Grafana

Port Forward:

```bash
kubectl port-forward \
svc/monitoring-grafana \
-n monitoring \
3000:80
```

Access:

```text
http://localhost:3000
```

OR

```text
http://<NODE-IP>:32000
```

---

## Grafana Login

Username:

```text
admin
```

Password:

```bash
kubectl get secret \
-n monitoring \
monitoring-grafana \
-o jsonpath="{.data.admin-password}" \
| base64 -d
```

---

# Recommended Dashboards

---

## Kubernetes Cluster Monitoring

```text
ID: 15757
```

---

## Node Exporter Full

```text
ID: 1860
```

---

## Kubernetes Views Pods

```text
ID: 15760
```

---

## Kubernetes Views Namespaces

```text
ID: 15758
```

---

## Istio Service Dashboard

```text
ID: 7639
```

---

## Istio Mesh Dashboard

```text
ID: 7636
```

---

# 📜 Loki Logging

Namespace:

```bash
kubectl get ns logging
```

Verify:

```bash
kubectl get pods -n logging
```

Expected:

```text
loki
promtail
```

---

# Loki Service

```bash
kubectl get svc -n logging
```

Expected:

```text
loki
3100
```

---

# Add Loki Data Source

Grafana

```text
Connections
 ↓
Data Sources
 ↓
Add Data Source
 ↓
Loki
```

URL:

```text
http://loki.logging.svc.cluster.local:3100
```

---

# 🔎 LogQL Queries

---

## All Logs

```logql
{namespace="ecom"}
```

---

## API Gateway Logs

```logql
{app="api-gateway"}
```

---

## Payment Service Logs

```logql
{app="payment-service"}
```

---

## Error Logs

```logql
{namespace="ecom"} |= "error"
```

---

## Warning Logs

```logql
{namespace="ecom"} |= "warn"
```

---

## Exception Logs

```logql
{namespace="ecom"} |= "exception"
```

---

## MySQL Logs

```logql
{app="mysql"}
```

---

## RabbitMQ Logs

```logql
{app="rabbitmq"}
```

---

# 🚨 AlertManager

Verify:

```bash
kubectl get pods -n monitoring
```

Expected:

```text
alertmanager-monitoring-kube-prometheus-alertmanager-0
```

---

# Prometheus Rules

Verify:

```bash
kubectl get prometheusrule -A
```

Custom Rules:

```text
ecommerce-alerts
payment-service-alerts
```

---

# Alert Testing

Create Load:

```bash
while true
do
curl http://localhost
sleep 1
done
```

Observe:

```text
Prometheus
 ↓
Alert Rule
 ↓
AlertManager
 ↓
Firing Alert
```

---

# Monitoring Health Checks

```bash
kubectl get servicemonitor -A

kubectl get prometheusrule -A

kubectl get pods -n monitoring

kubectl get pods -n logging

kubectl get svc -n monitoring

kubectl get svc -n logging
```

---

# Monitoring Troubleshooting

Prometheus Targets:

```text
Status
 ↓
Targets
```

If DOWN:

```bash
kubectl describe servicemonitor -n monitoring
```

Check Metrics Endpoint:

```bash
kubectl port-forward pod/<pod-name> 8080:8080

curl localhost:8080/metrics
```

Check Prometheus Logs:

```bash
kubectl logs \
-n monitoring \
prometheus-monitoring-kube-prometheus-prometheus-0
```

Check Loki Logs:

```bash
kubectl logs \
-n logging \
deployment/loki
```

Check Grafana Logs:

```bash
kubectl logs \
-n monitoring \
deployment/monitoring-grafana
```
# 🔐 Security Architecture

Security is implemented using Kubernetes Network Policies and Istio Service Mesh.

Security Layers:

```text
Internet
   │
   ▼
Gateway API
   │
   ▼
Istio Gateway
   │
   ▼
mTLS
   │
   ▼
Microservices
   │
   ▼
Network Policies
```

---

# Network Policies

Location:

```text
manifests/security/
```

Installed Policies:

```bash
kubectl get networkpolicy -n ecom
```

Current:

```text
default-deny
allow-dns
allow-istio
allow-prometheus
allow-internal-ecom
allow-mysql
```

---

## Default Deny Policy

Purpose:

```text
Block all traffic by default
```

Verify:

```bash
kubectl describe networkpolicy default-deny -n ecom
```

---

## Internal Communication Policy

Purpose:

```text
Allow service-to-service communication
inside namespace
```

File:

```text
manifests/security/internal-ecom.yml
```

---

## DNS Policy

Purpose:

```text
Allow kube-dns access
```

Verify:

```bash
kubectl describe networkpolicy allow-dns -n ecom
```

---

## MySQL Policy

Purpose:

```text
Allow database access only
from approved workloads
```

---

## Prometheus Policy

Purpose:

```text
Allow metrics scraping
```

---

# 🔐 mTLS

Location:

```text
manifests/networking/gateway-api/mtls.yml
```

Verify:

```bash
kubectl get peerauthentication -A
```

Benefits:

```text
Encrypted Traffic
Identity Verification
Zero Trust Networking
```

---

# 🚀 Horizontal Pod Autoscaler

Location:

```text
manifests/hpa/
```

Installed HPAs:

```text
cart-hpa
order-hpa
payment-hpa
product-hpa
```

Verify:

```bash
kubectl get hpa -n ecom
```

Describe:

```bash
kubectl describe hpa payment-hpa -n ecom
```

---

## Generate Load

Example:

```bash
while true
do
curl http://localhost
done
```

Observe:

```bash
kubectl get hpa -w -n ecom
```

Expected:

```text
Replicas increase automatically
```

---

# 🗄 Redis Cache

Namespace:

```bash
kubectl get pods -n ecom | grep redis
```

Verify Service:

```bash
kubectl get svc -n ecom redis
```

Test Connection:

```bash
kubectl exec -it deployment/redis -n ecom -- redis-cli
```

Example:

```bash
PING
```

Expected:

```text
PONG
```

---

# 📨 RabbitMQ

Verify:

```bash
kubectl get svc -n ecom rabbitmq
```

Check Pod:

```bash
kubectl get pods -n ecom | grep rabbitmq
```

Management UI:

```text
Port 15672
```

Verify:

```bash
kubectl port-forward svc/rabbitmq \
-n ecom \
15672:15672
```

Access:

```text
http://localhost:15672
```

---

# 🗄 MySQL

Verify:

```bash
kubectl get pods -n ecom | grep mysql
```

Check Service:

```bash
kubectl get svc -n ecom mysql
```

Connect:

```bash
kubectl exec -it deployment/mysql -n ecom -- bash
```

Login:

```bash
mysql -u root -p
```

Show Databases:

```sql
SHOW DATABASES;
```

---

# 💾 ETCD Backup

Purpose:

```text
Protect Kubernetes Cluster State
```

Location:

```text
manifests/cronjobs/etcd-backup-cronjob.yml
```

Verify CronJob:

```bash
kubectl get cronjob -A
```

Check Jobs:

```bash
kubectl get jobs -A
```

Check Logs:

```bash
kubectl logs job/<job-name>
```

---

# ☁ Terraform Infrastructure

Directory:

```text
terraform/
```

Modules:

```text
kind
istio
argocd
monitoring
ecommerce
```

Structure:

```text
terraform
├── providers.tf
├── variables.tf
├── outputs.tf
├── modules
├── environments
│   ├── dev
│   └── prod
└── README.md
```

Purpose:

```text
Infrastructure as Code

Future Automation

Environment Standardization
```

---

# 🔄 Complete GitOps Flow

```text
Developer
   │
   ▼
Git Push
   │
   ▼
GitHub Actions
   │
   ▼
Docker Build
   │
   ▼
Docker Hub
   │
   ▼
Manifest Update
   │
   ▼
GitHub Repository
   │
   ▼
ArgoCD Sync
   │
   ▼
Kubernetes Deployment
```

---

# 🛠 Troubleshooting Commands

## Cluster

```bash
kubectl cluster-info

kubectl get nodes

kubectl top nodes
```

---

## Namespaces

```bash
kubectl get ns
```

---

## Pods

```bash
kubectl get pods -A

kubectl get pods -n ecom

kubectl describe pod <pod-name> -n ecom

kubectl logs <pod-name> -n ecom
```

---

## Services

```bash
kubectl get svc -A

kubectl describe svc api-gateway -n ecom
```

---

## Deployments

```bash
kubectl get deploy -A

kubectl rollout status deployment/api-gateway -n ecom

kubectl rollout restart deployment/api-gateway -n ecom
```

---

## ArgoCD

```bash
kubectl get applications -n argocd

kubectl get pods -n argocd

kubectl logs deployment/argocd-server -n argocd
```

---

## Istio

```bash
kubectl get pods -n istio-system

istioctl proxy-status

istioctl analyze
```

---

## Monitoring

```bash
kubectl get servicemonitor -A

kubectl get prometheusrule -A

kubectl get pods -n monitoring
```

---

## Loki

```bash
kubectl get pods -n logging

kubectl logs deployment/loki -n logging
```

---

# 🎯 Interview Questions


# 🏆 Project Achievements

```text
4 Node Kubernetes Cluster

9+ Microservices

GitOps Deployment Model

Service Mesh Architecture

Centralized Logging

Centralized Monitoring

Custom Alerting Rules

Canary Releases

Network Security Policies

Infrastructure as Code Design
```

---

# 📚 Future Enhancements

```text
Terraform Apply Automation

Multi-Cluster Kubernetes

AWS EKS Migration

OpenTelemetry Tracing

HashiCorp Vault

Disaster Recovery Automation

Policy as Code

Cost Monitoring
```

---

# 👨‍💻 Author

```text
Sanjay Prajapati

DevOps Engineer

GitHub:
https://github.com/sanj231123

Project:
https://github.com/sanj231123/ecommerce-platform
```

---

# ⭐ Conclusion

This project demonstrates a complete production-style Kubernetes platform implementing:

```text
Docker
Kubernetes
Kind
GitHub Actions
ArgoCD
GitOps
Istio
Gateway API
Kiali
Prometheus
Grafana
Loki
AlertManager
ServiceMonitors
Prometheus Rules
Network Policies
Redis
RabbitMQ
MySQL
ETCD Backup
Terraform
Canary Deployments
HPA
```

and showcases modern DevOps, Platform Engineering, Cloud-Native, GitOps, Observability, and Infrastructure Automation practices.

