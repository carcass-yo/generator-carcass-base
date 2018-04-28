SHELL:=/bin/bash
IMAGE_TAG=$$(echo $${CI_COMMIT_SHA:0:8} | tr -d '[:space:]' | tr -c '[:alnum:]_.' '-')
APP_IMAGE_NAME=$$CI_REGISTRY_IMAGE:$(IMAGE_TAG)

test:
	npm install
	npm run test

lint:
	npm install
	npm run lint

frontend:
	cd public; \
	npm install; \
	if [ "$$CI_ENVIRONMENT_NAME" == "production" ]; then \
		export NODE_ENV="production"; \
	fi; \
	npm run webpack;

build:
	set -e; \
	export APP_IMAGE_NAME="$(APP_IMAGE_NAME)"; \
	docker-compose build; \
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build; \
	docker push "$$APP_IMAGE_NAME"; \

deploy:
	set -e; \
	export APP_IMAGE_NAME="$(APP_IMAGE_NAME)"; \
	export ENVIRONMENT="$$CI_ENVIRONMENT_NAME"; \
	export ENVIRONMENT_UPPER=$$(echo $$ENVIRONMENT | tr '[:lower:]' '[:upper:]'); \
	export ENV_SPECIFIC_VARS=$$(export | grep $$ENVIRONMENT_UPPER); \
	for var in $$ENV_SPECIFIC_VARS; do \
		var=$$(echo $$var | cut -d'=' -f 1); \
		if [[ $${var} != *"$$ENVIRONMENT_UPPER"* ]]; then \
			continue; \
		fi; \
		target=$$(echo $$var | sed 's/'"$$ENVIRONMENT_UPPER"'_//'); \
		eval "export $$target=\"$$(eval "echo \$$$$var")\""; \
	done; \
	export DOMAIN="$$DOMAIN,$$CI_ENVIRONMENT_SLUG.$$CI_PROJECT_PATH_SLUG.swarm.zolotoykod.ru"; \
	export NODE_ENV="development"; \
	if [ "$$ENVIRONMENT" == "production" ]; then \
		export NODE_ENV="production"; \
	fi; \
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml config > stack.yml; \
	docker stack deploy -c stack.yml --prune "$$CI_PROJECT_PATH_SLUG-$$ENVIRONMENT";
