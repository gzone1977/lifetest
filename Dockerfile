# Dockerfile for Web Factory Sandbox
FROM nginx:alpine

# Create /workspace directory as per .clinerules
WORKDIR /workspace

# Copy current directory to /workspace
# However, for live development, we'll use volumes in compose.yaml
COPY . /workspace

# Symlink /workspace to nginx default html folder to serve the files
RUN rm -rf /usr/share/nginx/html && ln -s /workspace /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
