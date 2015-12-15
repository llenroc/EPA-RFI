FROM node:4-onbuild
MAINTAINER Applied Information Sciences

EXPOSE 3000

# Directly calling node as the npm start call has issues passing signals to server (SIGINT)
CMD ["node","index.js"]
