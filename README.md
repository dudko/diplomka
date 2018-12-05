# MELASA (Multi-phase ELAStic Aggregates)

> tool for computations and visualizations of anisotropic elastic properties of lamellar (nano-)composites

## Development

### Requirements

- node.js (tested with version >=6.x )

### Getting Started

```
cd react-app
cp .env.example .env # add missing secrets
npm i
npm start
```

### Deployment

#### Requirements

* docker

#### Steps

1. add `melasa-cerit-sc.pem` to directory `secrets`
1. ```
    docker build . \
        --build-arg REACT_APP_MATERIAL_PROJECT_API=$REACT_APP_MATERIAL_PROJECT_API \
        --build-arg REACT_APP_SUBSCRIBERS_DB=$REACT_APP_SUBSCRIBERS_DB \
        -t melasa-web:latest
    ```
1. ```
    docker run \
        -d \
        -p 80:80 \
        -p 443:443 \
        --restart=always \
        melasa-web:latest
    ```

#### Using CircleCI build with nginx

```
docker build . \
    -f ./nginx/Dockerfile \
    -t melasa-web:latest \
docker run \
    -d \
    -p 80:80 \
    -p 443:443 \
    -v /root/app:/usr/share/nginx/html \
    --restart=always \
    melasa-web:latest
```

## License

Licensed as [MIT](https://github.com/dudko/melasa/blob/master/LICENSE).
