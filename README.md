# open-node

#

```
export PROJECT_ID=<YOUR PROJECT ID>
sed -i'' -e  "s/YOUR_PROJECT_ID/${PROJECT_ID}/g" terraform.tfvars

terraform init
terraform plan -o=terraform.tfplan
terraform apply terraform.tfplan

gcloud container clusters get-credentials $(terraform output kubernetes_cluster_name) --region $(terraform output region)
kubectl apply -f k8s/
```
