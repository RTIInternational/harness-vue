FROM node:18-alpine
COPY ./ /harness-vue
WORKDIR /harness-vue
RUN npm install
RUN npm run build