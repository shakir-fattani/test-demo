docker run \
  --name mongodb-rs \
  -p 27017:27017 \
  # -e MONGO_INITDB_ROOT_USERNAME=admin \
  # -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  mongo --replSet rs0
