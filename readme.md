# Performance Test
## Azure commands to create the k6 containers

```az container create --resource-group PEng --name performance2 --image loadimpact/k6 --command-line "k6 run https://raw.githubusercontent.com/dextroseSH/graphq-performance-testing/main/scripts/with/hashing.js" --restart-policy never --cpu 1```

```az container logs --resource-group PEng --name performance2 --follow```

```az container delete --resource-group PEng --name performance2```
