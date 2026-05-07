FROM node:18

WORKDIR /usr/src/app

# Install dependencies based on package.json provided by the nextjs folder
COPY package*.json ./
RUN npm ci --silent

# Copy the rest of the app
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
