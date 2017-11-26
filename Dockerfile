FROM node:8

RUN mkdir /code
WORKDIR /code

COPY code/package.json .

RUN npm i && \
    npm install -g @angular/cli --unsafe

COPY code/ .

RUN ng build -prod && \
    ng build -prod --app universal --output-hashing=none

EXPOSE 3000

CMD ["node", "server.js"]
