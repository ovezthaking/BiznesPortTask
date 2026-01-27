FROM node:16 AS development

ENV NODE_ENV=development

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx sequelize db:migrate

RUN npx sequelize db:seed:all

EXPOSE 8080

CMD ["npm", "start"]