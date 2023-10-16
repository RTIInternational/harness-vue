rm -rf docs/api
cp -R docs/api-stubs docs/api

npx jsdoc2md src/store/charts.js --partial main.hbs >> docs/api/charts.md
npx jsdoc2md src/store/filters.js --partial main.hbs >> docs/api/filters.md
npx jsdoc2md src/store/data.js --partial main.hbs >> docs/api/data.md
npx jsdoc2md src/store/actions.js --partial main.hbs >> docs/api/lifecycle.md
npx jsdoc2md src/store/getters.js --partial main.hbs >> docs/api/getters.md
echo "✅"