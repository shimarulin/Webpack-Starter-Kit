FROM node:6

# Add local user
RUN groupadd -g 1000 user \
	&& useradd --create-home -d /user -g user -u 1000 user \
	&& mkdir /app \
	&& chown -Rf user:user /app

# Set up the volumes and working directory
VOLUME ["/user", "/app"]
WORKDIR /app
