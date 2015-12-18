# AIS EPA Database for Geocoding

```
docker build -t epa_rfi_db .
docker run -p 5432:5432 --name epa_rfi_db -e POSTGRES_PASSWORD=mysecretpassword -d epa_rfi_db
```
