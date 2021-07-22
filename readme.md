az container create --resource-group PEng --name performance2 --image loadimpact/k6 --command-line "k6 run https://raw.githubusercontent.com/dextroseSH/graphq-performance-testing/main/script.js"

az container logs --resource-group PEng --name performance2

az container delete --resource-group PEng --name performanc2

## VOlume

# Change these four parameters as needed
ACI_PERS_RESOURCE_GROUP=PEng
ACI_PERS_STORAGE_ACCOUNT_NAME=pengstorage$RANDOM
ACI_PERS_LOCATION=westeurope
ACI_PERS_SHARE_NAME=acishare

# Create the storage account with the parameters
az storage account create \
    --resource-group $ACI_PERS_RESOURCE_GROUP \
    --name $ACI_PERS_STORAGE_ACCOUNT_NAME \
    --location $ACI_PERS_LOCATION \
    --sku Standard_LRS

# Create the file share
az storage share create \
  --name $ACI_PERS_SHARE_NAME \
  --account-name $ACI_PERS_STORAGE_ACCOUNT_NAME


STORAGE_KEY=$(az storage account keys list --resource-group $ACI_PERS_RESOURCE_GROUP --account-name $ACI_PERS_STORAGE_ACCOUNT_NAME --query "[0].value" --output tsv)
echo $STORAGE_KEY

az container create \
    --resource-group $ACI_PERS_RESOURCE_GROUP \
    --name performance-test-1 \
    --image loadimpact/k6 \
    --command-line "k6 run https://raw.githubusercontent.com/dextroseSH/graphq-performance-testing/main/script.js" \
    --azure-file-volume-account-name $ACI_PERS_STORAGE_ACCOUNT_NAME \
    --azure-file-volume-account-key $STORAGE_KEY \
    --azure-file-volume-share-name $ACI_PERS_SHARE_NAME \
    --azure-file-volume-mount-path /aci/logs/