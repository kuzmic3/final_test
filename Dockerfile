FROM node:12-alpine
WORKDIR /final_test
COPY . .
RUN yarn install --production
CMD ["node", "app.js"]
