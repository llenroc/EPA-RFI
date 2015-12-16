#!/bin/sh

set -e

# Perform all actions as $POSTGRES_USER
export PGUSER="$POSTGRES_USER"

psql -c "create role geocoder createdb login password 'tiger'"
createdb -O geocoder geocoder
psql -f init-tiger.sql geocoder
#psql -c "SELECT Loader_Generate_Nation_Script('ais')" geocoder > tiger-nation-borders.sh
#psql -c "SELECT Loader_Generate_Script(ARRAY['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'], 'ais')" geocoder > tiger-geocoding.sql
#psql -c "SELECT Loader_Generate_Script(ARRAY['OH'], 'ais')" geocoder > tiger-geocoding.sh
sh tiger-nation-borders.sh
sh tiger-geocoding.sh

