#!/bin/sh
set -e

envsubst '"$API_URL"' < ${ENV_FILE_SERVER} > ${ENV_FILE_SERVER}'updated'
rm -rf ${ENV_FILE_SERVER}
mv ${ENV_FILE_SERVER}'updated' ${ENV_FILE_SERVER}
exit 0;
