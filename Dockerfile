# it's a good idea to pin this, but for demo purposes we'll leave it as is
FROM node:latest as builder

WORKDIR /usr/src/app
ENV PATH /usr/src/node_modules/.bin:$PATH

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package.json ./

RUN npm install

COPY . ./

FROM builder as dev
CMD ["npm", "run", "dev"]

FROM builder as prod-builder
RUN npm run build

FROM nginx:latest as prod

COPY --from=prod-builder /usr/src/app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]