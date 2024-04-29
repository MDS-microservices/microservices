# Utilisez l'image Node.js comme image de base
FROM node:18-alpine
# Installez pnpm globalement
RUN npm install -g pnpm

# Créez un répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez les fichiers package.json et pnpm-lock.yaml dans le répertoire de travail
COPY package.json pnpm-lock.yaml ./

# Installez les dépendances de l'application avec pnpm
RUN pnpm install

# Copiez le reste des fichiers de l'application dans le conteneur
COPY . .

# Compilez l'application
RUN pnpm build

# Exposez le port sur lequel votre application NestJS s'exécutera
EXPOSE 50052

# Commande pour démarrer l'application en mode production
RUN chmod +x scripts/init.sh
ENTRYPOINT ["scripts/init.sh"]