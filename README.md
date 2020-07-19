# Clear horizon frontend

Description!

## Installation

```bash
git clone https://github.com/nextgis/clear_horizon.git
cd ./clear_horizon
npm i
# build prod version
npm run prod
# start development server
npm start
```

Add submodule to simplify the development process

```bash
git submodule update --init
# get latest version on nextgis_frontend submodule
cd ./nextgis_frontend
git checkout master
git pull origin master
```

In this case, the @nextgis libraries will be used from the submodule, not from the node_modules

## Docker

```bash
docker build -t registry.nextgis.com/clear_horizon:0.0.0 .
docker build -t registry.nextgis.com/clear_horizon:latest .
docker run -it -p 8080:8080 --rm --name code-nextgis-1 registry.nextgis.com/clear_horizon:latest

docker push registry.nextgis.com/clear_horizon:0.0.0
docker push registry.nextgis.com/clear_horizon:latest
```
