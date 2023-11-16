echo "Starting build script..."

# Build the app

npm install

npx tsc --build tsconfig.build.json
