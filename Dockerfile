FROM node:24.14.0-alpine
# Instalamos dependencias necesarias para el motor de Prisma en Alpine
RUN apk add --no-cache openssl
WORKDIR /app

# Copiamos archivos de dependencias 
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]