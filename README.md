# MELASA (Multi-phase ELAStic Aggregates)

> tool for computations and visualizations of anisotropic elastic properties of lamellar (nano-)composites

## Development

### Requirements

- node.js (tested with version >=6.x )

### Local development

```
cd react-app
cp .env.example .env # and edit
npm i
npm start
```

In another terminal do:
```
cd node-server
cp .env.example .env # and edit
npm i
node index.js
```

## Deployment to production server

### Requirements

- docker, docker-compose

### Server setup

1. clone the repo and `cd` into it
1. create directory `secrets` and add `melasa-cerit-sc.pem` to it
1. ```
   cd react-app
   cp env.example .env # in this case REACT_APP_API_ENDPOINT=https://melasa.cerit-sc.cz/api
   npm i
   npm run build
   ```
1. `cp node-server/{env.example,.env} # and edit`
1. in repo root run `docker-compose up -d --force-recreate --build`

## License

Licensed as [MIT](https://github.com/dudko/melasa/blob/master/LICENSE).
