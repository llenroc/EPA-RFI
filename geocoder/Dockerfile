FROM mdillon/postgis
MAINTAINER Jonathan Meyer <jonathan.meyer@appliedis.com>

# Add in dependencies for extracting tiger geocoder data
RUN apt-get -y update && apt-get -y install unzip wget

RUN mkdir -p /tmp/
ADD * /tmp/



