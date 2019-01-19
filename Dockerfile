FROM node:latest
ADD ./ /

RUN npm install
EXPOSE 6001
EXPOSE 3001

CMD ["/bin/bash", "start.sh"]
