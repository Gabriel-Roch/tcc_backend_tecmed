FROM node:18-alpine

ARG URL_DATABASE

ENV PRISMA_URL_DATABASE=${URL_DATABASE}

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]