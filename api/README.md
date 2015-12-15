# EPA RFI API

## Docker
The following are common commands useful to execution of the EPA API service within Docker.

### Build

```docker build -t ais_epa_rfi .```

### Run (as a service)

```docker run -p 3000:3000 -d --name=ais_epa_api ais_epa_api```
 
### Service control

Stop / start:
```docker stop ais_epa_api```
```docker start ais_epa_api```

Tail logs:
```docker logs --tail=10 -f ais_epa_api```

Inspect container:
```docker inspect ais_epa_api```

Process status:
```docker ps ais_epa_api```


 