## docker-entrypoint.sh for node.js

echo "wait db server"

dockerize -wait tcp://haru-db:3306 -timeout 20s

echo "start node server"

npm start