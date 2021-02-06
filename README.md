# open-node
https://github.com/Phala-Network/phala-docker     

https://telemetry.polkadot.io/#list/Polkadot

---
## ENV Install (GKE + Chain Node)
### Use cloud build (recommend)
```
gcloud init
gcloud auth application-default login
gcloud config set project <YOUR_PROJECT_ID>
gcloud config set compute/region <GCP REGION>

cd open-node

# Create GKE cluster, add one full node
./setup.sh

# Add full node
./add-node.sh

# Add validator node, getInfo & insertSessionKey
./add-validator-node.sh

# Create snapshot for the data volume of full node
./create-snapshot.sh

# Add full node with data from snapshot
./add-node-from-snapshot.sh

# Create util image for polkdot rpc
cd polkadot-rpc
docker build . -t gcr.io/g-hash-community/polkadot-rpc-client:v0.1
```

### Use terraform to create GKE cluster
```
export PROJECT_ID=<YOUR PROJECT ID>
sed -i'' -e  "s/YOUR_PROJECT_ID/${PROJECT_ID}/g" terraform.tfvars

terraform init
terraform plan -out=terraform.tfplan
terraform apply terraform.tfplan

gcloud container clusters get-credentials $(terraform output kubernetes_cluster_name) --region $(terraform output region)
```
