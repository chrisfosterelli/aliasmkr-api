# Aliasmkr API

This is the API server for Aliasmkr, a webapp I built that lets organizations set up a simple mail server on their domains which redirects to a series of aliases. This can be used for creating lightweight contact emails, domain administrative accounts, or mailing lists. It was used at a few organizations I worked with, but I've now stopped working on it and shut it down.


# Deploying

1. Build the docker image with `docker build -t aliasmkr-api .`
2. Deploy using a compose configuration
