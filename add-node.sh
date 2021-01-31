#!/bin/bash -xe
read -t 30 -p "Please input Phala node name: " NODE_NAME
echo "Full node name: $NODE_NAME"

read -t 30 -p "Please input GKE cluster name: " CLUSTER_NAME
echo "GKE cluster name: $CLUSTER_NAME"

read -t 30 -p "Please input start extra_args: " EXTRA_OPTS
echo "args: $EXTRA_OPTS"

export NODE_NAME=$NODE_NAME
export CLUSTER_NAME=$CLUSTER_NAME
export EXTRA_OPTS="$EXTRA_OPTS"

PROJECT_ID=$(gcloud config get-value project)
PROJECT_NUMBER=$(gcloud projects list --filter="$PROJECT_ID" --format="value(PROJECT_NUMBER)")
GCP_REGION=$(gcloud config get-value compute/region)

gcloud builds submit --config=add-node/cloudbuild.yaml --substitutions=_PROJECT_ID=${PROJECT_ID},_GCP_REGION=${GCP_REGION},_NODE_NAME=${NODE_NAME},_CLUSTER_NAME=${CLUSTER_NAME},_EXTRA_OPTS="$EXTRA_OPTS"
