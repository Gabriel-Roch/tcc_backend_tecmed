FROM node:18-alpine

RUN mkdir -p /app
WORKDIR /app
COPY . /app

ARG PRISMA_URL_DATABASE
ARG NAME_SYSTEM
ARG JWT_TOKEN

ENV PRISMA_URL_DATABASE=${PRISMA_URL_DATABASE}
ENV NAME_SYSTEM=${NAME_SYSTEM}
ENV JWT_TOKEN=${JWT_TOKEN}

RUN npm install
RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]