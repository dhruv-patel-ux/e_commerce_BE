FROM node:20
WORKDIR /src
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]