FROM node

RUN mkdir /code
WORKDIR /code

COPY code/package.json .
RUN yarn

COPY code/ .
EXPOSE 4200

CMD ["npm", "start"]
