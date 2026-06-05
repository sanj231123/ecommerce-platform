#!/bin/bash

kubectl apply -f https://raw.githubusercontent.com/kiali/kiali/v1.89/deploy/namespace.yaml
kubectl apply -f https://raw.githubusercontent.com/kiali/kiali/v1.89/deploy/service_account.yaml
kubectl apply -f https://raw.githubusercontent.com/kiali/kiali/v1.89/deploy/role.yaml
kubectl apply -f https://raw.githubusercontent.com/kiali/kiali/v1.89/deploy/role_binding.yaml
kubectl apply -f https://raw.githubusercontent.com/kiali/kiali/v1.89/deploy/deployment.yaml
kubectl apply -f https://raw.githubusercontent.com/kiali/kiali/v1.89/deploy/service.yaml
