echo "Starting format script..."

npx prettier --write source/**/*.ts
npx prisma format