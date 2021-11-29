FROM node:lts-alpine

WORKDIR /app

#copy from root folder to the docker image(last dot)
#only copy if new packages were installed in local PC
# * is to copy package.lock
COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --only=production

COPY server/package*.json server/
RUN npm run install-server --only=production

#build our client (this will put build files into the /public IN server)

COPY client/ client/
RUN npm run build-prod --prefix client

COPY server/ server/

## use this USER for security (least permission node user has)
USER node

CMD ["npm", "start", "--prefix", "server"]

# port
EXPOSE 3000
