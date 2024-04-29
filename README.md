Construire une application web avec un système d’authentification pour faire de la gestion et de l’édition de produits
rattachés à des utilisateurs avec différents niveaux de droits d’accès (écriture, lecture, …). Le projet sera à réaliser
avec des microservices.

Premières étapes :

Devops :

- [x] docker-compose et DockerFile
- [ ] Configuration serveur web (nginx)
- [x] Configuration base de données

Back :

- [x] Gateway pour faire le lien entre le front et les APIs
- [x] API pour l'authentification
- [x] API liée à l’ajout, la mise à jour, la suppression et l’affichage des produits

Front :

- [ ] Page accueil avec authentification
- [ ] Service correspondant à l’API products

## Installation

Il faudra créer un fichier `.env` à la racine du projet contenant les variables suivantes :

```dotenv
# Auth BDD
MYSQL_ROOT_PASSWORD_AUTH=
MYSQL_DATABASE_AUTH=
MYSQL_USER_AUTH=
MYSQL_PASSWORD_AUTH=

# Products BDD
MYSQL_ROOT_PASSWORD_PRODUCTS=
MYSQL_DATABASE_PRODUCTS=
MYSQL_USER_PRODUCTS=
MYSQL_PASSWORD_PRODUCTS=
```

Pour lancer le conteneur Docker :

```shell
docker-compose build && docker-compose up -d
```