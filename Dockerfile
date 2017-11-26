FROM node

RUN mkdir /code
WORKDIR /code

COPY code/package.json .
RUN npm i

COPY code/ .
EXPOSE 3000

CMD ["npm", "run", "universal"]
