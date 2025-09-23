# Stage 1: Build the application
# Using a more secure and specific base image to reduce vulnerabilities
FROM eclipse-temurin:17-jdk-maven AS build
WORKDIR /app

# Copy only the pom.xml first to leverage Docker's layer cache
# If the pom.xml doesn't change, Docker won't re-download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Stage 2: Create the final, smaller production image
# Using a JRE image which is smaller than a full JDK
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built .jar file from the 'build' stage
# Make sure your .jar filename is correct here
COPY --from=build /app/target/product-service-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the application runs on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java","-jar","app.jar"]