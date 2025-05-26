# ---- Build stage ----
FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# ---- Production stage ----
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
