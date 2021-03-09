FROM node:14-alpine

ARG SERVICE

COPY packages/${SERVICE}/ .
RUN npm i
RUN npm run build

ENTRYPOINT [ "npm", "start" ]