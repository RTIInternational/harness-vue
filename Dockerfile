FROM alexharding/node_python:latest
COPY ./ /harness-vue
WORKDIR /harness-vue
RUN npm install
RUN npm run build