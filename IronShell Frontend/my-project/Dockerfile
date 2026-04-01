FROM node:20-alpine
WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# 4. Start the dev server and allow external connections
CMD ["npm", "run", "dev", "--", "--host"]

# production

# FROM nginx:stable-alpine
# COPY --from=build /src/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]