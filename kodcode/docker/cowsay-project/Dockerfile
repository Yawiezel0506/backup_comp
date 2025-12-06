FROM node:18.16.0-alpine

WORKDIR /app
COPY ./cowsay/src .

# Copy your entry-point script
COPY entry-point.sh /app/entry-point.sh

# Make the entry-point script executable
RUN chmod +x /app/entry-point.sh

CMD ["/app/entry-point.sh"]

