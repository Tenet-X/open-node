# open-node

## Use cloud build (recommend)
```
gcloud init
gcloud auth application-default login
gcloud config set project <YOUR_PROJECT_ID>

export PROJECT_ID=<YOUR PROJECT ID>

gcloud builds submit --substitutions=_PROJECT_ID=${PROJECT_ID}
```

## Use terraform
```
export PROJECT_ID=<YOUR PROJECT ID>
sed -i'' -e  "s/YOUR_PROJECT_ID/${PROJECT_ID}/g" terraform.tfvars

terraform init
terraform plan -out=terraform.tfplan
terraform apply terraform.tfplan

gcloud container clusters get-credentials $(terraform output kubernetes_cluster_name) --region $(terraform output region)
kubectl apply -f k8s/
```
