FROM alexharding/node_python:3.0
COPY ./ /harness-vue
WORKDIR /harness-vue
RUN npm install
RUN npm run build