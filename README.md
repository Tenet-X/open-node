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
./setup.sh

#add new node
./add-node.sh
```

### Use terraform
```
export PROJECT_ID=<YOUR PROJECT ID>
sed -i'' -e  "s/YOUR_PROJECT_ID/${PROJECT_ID}/g" terraform.tfvars

terraform init
terraform plan -out=terraform.tfplan
terraform apply terraform.tfplan

gcloud container clusters get-credentials $(terraform output kubernetes_cluster_name) --region $(terraform output region)
kubectl apply -f k8s/
```
## Add New Chain Node
### Modify Key Config Args
PVC Name mapping to Chain Node  
open-node/k8s/pvc.yaml
```
metadata:
  name: *****
```
Chain Node Name(Phala)   
k8s/deployment.yaml
```
containers:
    - name: junhash-phala
    image: "phalanetwork/phala-poc3-node"
    imagePullPolicy: Always
    env:
        - name: NODE_NAME
        value: "******"
```
### Start New Node
```
kubectl apply -f k8s/
```
