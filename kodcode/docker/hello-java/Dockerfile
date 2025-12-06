# Build stage
FROM maven AS build
WORKDIR /app
COPY . /app
RUN mvn verify

# Final stage
FROM openjdk:8-jre
WORKDIR /app
COPY --from=build /app/target/hello-java.jar /app/hello-java.jar
CMD ["java", "-jar", "hello-java.jar"]

