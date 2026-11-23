# Master Class IT Solutions Website

A responsive static business website built with HTML, CSS and vanilla JavaScript, served by Nginx in Docker.

## Features

- Responsive layout for desktop, tablet and mobile
- Services section for networking, CCTV, software development, IT support and AI tutoring
- About, process and contact sections
- Mobile navigation menu
- Contact form validation and email-draft preparation
- Dockerfile and Docker Compose configuration
- GitHub Actions builds and pushes the Docker image to Docker Hub on pushes to `main`

## Requirements

- Windows 10/11
- Docker Desktop installed and running
- Git Bash (recommended for the learning exercises)

## GitHub Actions build, publish and Render deployment

On pushes to `main`, the workflow checks the static site files, builds a `linux/amd64` image, publishes `latest` and commit-SHA tags to Docker Hub, then deploys that exact SHA image to Render and checks that the public site responds.

Create an **image-backed Render Web Service** configured for `docker.io/<DOCKERHUB_USERNAME>/docker-practice-lab:latest`. If the Docker Hub repository is private, configure a Docker Hub registry credential for the Render service so it can pull images. Render requires the host, namespace, and repository to match when deploying a specific tag.

In the GitHub repository, open **Settings → Secrets and variables → Actions** and configure:

- Repository variable `DOCKERHUB_USERNAME` — your Docker Hub username
- Repository secret `DOCKERHUB_TOKEN` — a Docker Hub access token with read and write permissions
- Repository secret `RENDER_API_KEY` — a Render API key allowed to trigger and read service deploys
- Repository variable `RENDER_SERVICE_ID` — the Render service ID
- Repository variable `RENDER_SERVICE_URL` — the HTTPS URL of the Render web service, used for the post-deploy health check

The workflow does not contain credential values. A missing or invalid Render setting, failed deployment, or unhealthy site causes the workflow to fail.

## Run with Docker Compose

Open Git Bash in this project directory and run:

```bash
docker compose up -d --build
```

Open the website:

http://localhost:8088

Check the container:

```bash
docker compose ps
docker ps
```

View logs:

```bash
docker compose logs website
```

Stop the project:

```bash
docker compose down
```

## Run with Docker commands (without Compose)

Build the image:

```bash
docker build -t master-class-it-solutions:1.0 .
```

Run the container:

```bash
docker run -d --name master-class-website -p 8088:80 master-class-it-solutions:1.0
```

Open http://localhost:8088.

Stop and remove the container:

```bash
docker stop master-class-website
docker rm master-class-website
```

## If port 8080 is already in use

Choose another Windows host port, for example 8088.

The supplied Compose file already uses port 8088 to avoid conflicting with your existing website on port 8080. If you need another port, edit `compose.yaml`:

```yaml
ports:
  - "8088:80"
```

Then run:

```bash
docker compose up -d --build
```

Open http://localhost:8088.

For `docker run`, use the same port 8088:

```bash
docker run -d --name master-class-website -p 8088:80 master-class-it-solutions:1.0
```

The left side is the Windows host port; the right side is the container port.

## Customise before publishing

1. Open `index.html` and confirm the business description and location.
2. Open `script.js` and replace `YOUR_BUSINESS_EMAIL@example.com` with the real business email address.
3. Update the contact section in `index.html` with the real business phone number and email address.
4. Review all service descriptions and make sure they accurately represent the services offered.
5. For a public launch, purchase/configure a domain and deploy to a suitable hosting provider. This Docker setup is local development hosting until deployed to an internet-accessible server.

## Contact form note

The form validates the fields in the browser and prepares an email draft using the visitor's default mail application after you configure the business email. It does not save submissions to a database or send them to a server. A production form needs a backend or trusted form-processing service.

## Project structure

```text
master-class-it-solutions-website/
├── index.html
├── styles.css
├── script.js
├── Dockerfile
├── compose.yaml
├── .dockerignore
└── README.md
```
