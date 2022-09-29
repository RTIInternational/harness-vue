# this is the node:10 image with python, pip, aws-cli and vue-cli installed
FROM alexharding/node_python
COPY ./ /harness-vue
WORKDIR /harness-vue
RUN npm install
RUN npm run build