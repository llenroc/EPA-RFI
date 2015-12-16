# AIS EPA Geocoding

```
docker build -t ais_geocoder .
docker run -p 5432:5432  -v `pwd`/geocoder:/gisdata:rw --name ais_geocoder -e POSTGRES_PASSWORD=mysecretpassword -d ais_geocoder
```
