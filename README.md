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
# get latest version on nextgisweb_frontend submodule
cd ./nextgisweb_frontend
git checkout master
git pull origin master
```

In this case, the @nextgis libraries will be used from the submodule, not from the node_modules
