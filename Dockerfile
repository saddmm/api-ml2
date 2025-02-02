FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_HOST=0.0.0.0
ENV APP_PORT=8080
ENV MODEL_URL=[MODEL_URL]
ENV PROJECT_ID=[PROJECT_ID]
ENV DB=[DB_FIRESTORE]

EXPOSE 8080

CMD ["npm", "start"]
