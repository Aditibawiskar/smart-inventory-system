# Stage 1: Build the application using a valid Maven/JDK17 image
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Create the final, smaller production image
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/product-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]