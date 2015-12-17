#!/bin/sh

set -e

# Perform all actions as $POSTGRES_USER
export PGUSER="$POSTGRES_USER"

psql -c "create role epa_rfi createdb login password 'epa_demo'"
createdb -O epa_rfi epa_rfi
psql -f /tmp/zipcode.sql epa_rfi
psql -c "copy zip_geocode from '/tmp/zipcode.csv' DELIMITER ',' CSV HEADER" epa_rfi