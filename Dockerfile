FROM node:19 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build
FROM nginx:1.19-alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8081

CMD ["nginx", "-g", "daemon off;"]
