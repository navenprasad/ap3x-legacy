
# Use the imbios/bun-node image
FROM imbios/bun-node:latest

# Set the working directory in the Docker container
WORKDIR /app

# Copy the root environment file into the working directory
COPY ../../.env ./

# Install Bun (if the imbios/bun-node image does not have Bun pre-installed, otherwise skip this step)

# Copy the application code into the Docker container
COPY . .

# Install dependencies
RUN bun install




# Expose the port the application runs on
EXPOSE 3000

# Command to run the application in development mode
CMD ["bun", "run", "start:dev", "todo"]
