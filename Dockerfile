FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_HOST=0.0.0.0
ENV APP_PORT=8080
ENV MODEL_URL=https://storage.googleapis.com/themodels/model/model.json
ENV PROJECT_ID=submissionmlgc-saddam
ENV DB=default

EXPOSE 8080

CMD ["npm", "start"]
