#!/bin/bash -xe
PROJECT_ID=$(gcloud config get-value project)

PROJECT_NUMBER=$(gcloud projects list --filter="$PROJECT_ID" --format="value(PROJECT_NUMBER)")

GCP_REGION=$(gcloud config get-value compute/region)

gcloud projects add-iam-policy-binding local-alignment-284902 \
     --member=serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com \
     --role roles/iam.serviceAccountTokenCreator

gcloud projects add-iam-policy-binding local-alignment-284902 \
    --member=serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com \
     --role roles/container.clusterAdmin

gcloud projects add-iam-policy-binding local-alignment-284902 \
    --member=serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com \
     --role roles/container.admin

gcloud projects add-iam-policy-binding local-alignment-284902 \
    --member=serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com \
     --role roles/compute.viewer

gcloud projects add-iam-policy-binding local-alignment-284902 \
    --member=serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com \
     --role roles/iam.serviceAccountUser

gcloud projects add-iam-policy-binding local-alignment-284902 \
    --member=serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com \
     --role roles/compute.storageAdmin

# read -t 30 -p "Please input GCP project id: " PROJECT_ID
# echo "GCP project id: $PROJECT_ID"
#
# read -t 30 -p "Please input GCP region: " GCP_REGION
# echo "GCP region: $GCP_REGION"

read -t 30 -p "Please input Phala node name: " NODE_NAME
echo "GCP project id: $NODE_NAME"

read -t 30 -p "Please input GKE cluster name: " CLUSTER_NAME
echo "GKE cluster name: $CLUSTER_NAME"

export PROJECT_ID=$PROJECT_ID
export GCP_REGION=$GCP_REGION
export NODE_NAME=$NODE_NAME
export CLUSTER_NAME=$CLUSTER_NAME
gcloud builds submit --substitutions=_PROJECT_ID=${PROJECT_ID},_GCP_REGION=${GCP_REGION},_NODE_NAME=${NODE_NAME},_CLUSTER_NAME=${CLUSTER_NAME}
