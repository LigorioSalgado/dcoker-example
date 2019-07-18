FROM node

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN npm install --quiet

RUN npm install -g nodemon --quiet

COPY . .

EXPOSE 4000

CMD [ "npm", "run","watch" ]