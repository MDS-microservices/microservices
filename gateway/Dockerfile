# Utilisez l'image Node.js comme image de base
FROM node:18-alpine
# Installez pnpm globalement
RUN npm install -g pnpm

# Créez un répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers package.json et pnpm-lock.yaml dans le répertoire de travail
COPY package.json pnpm-lock.yaml ./

RUN pnpm config set store-dir /app/.pnpm-store/v3 --global

# Installez les dépendances de l'application avec pnpm
RUN pnpm install

# Copiez le reste des fichiers de l'application dans le conteneur
COPY . .

# Exposez le port sur lequel votre application NestJS s'exécutera
EXPOSE 3000

# Commande pour démarrer l'application en mode production
CMD ["pnpm", "run", "start:dev"]