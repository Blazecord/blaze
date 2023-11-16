echo "Starting docker script..."

docker build -t blaze-bot .
docker run -d -p 4000 --name blaze blaze-bot # NOTE: with this the websocket server is not running and only the API is available