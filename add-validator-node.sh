#!/bin/bash -xe
read -t 30 -p "Please input GKE cluster name: " CLUSTER_NAME
echo "GKE cluster name: $CLUSTER_NAME"

read -t 30 -p "Please input validator node name: " NODE_NAME
echo "Validator node name: $NODE_NAME"

read -t 30 -p "Please input full node name: " FULL_NODE_NAME
echo "Full node name: $FULL_NODE_NAME"

read -t 30 -p "Please input your session key: " SESSION_KEY
echo "Session key is: $SESSION_KEY"

export CLUSTER_NAME=$CLUSTER_NAME
export NODE_NAME=$NODE_NAME

PROJECT_ID=$(gcloud config get-value project)
PROJECT_NUMBER=$(gcloud projects list --filter="$PROJECT_ID" --format="value(PROJECT_NUMBER)")
GCP_REGION=$(gcloud config get-value compute/region)

gcloud builds submit --config=add-validator-node/cloudbuild.yaml \
--substitutions=_PROJECT_ID=${PROJECT_ID},_GCP_REGION=${GCP_REGION},_NODE_NAME=${NODE_NAME},_CLUSTER_NAME=${CLUSTER_NAME},_FULL_NODE_NAME=${FULL_NODE_NAME},_SESSION_KEY=${SESSION_KEY}
