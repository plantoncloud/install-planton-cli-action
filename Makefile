SHELL := bash
.DELETE_ON_ERROR:
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := all
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

.PHONY: all
all: ## Install dependencies, lint, and build (default)
	$(MAKE) build

.PHONY: install
install: ## Install node modules
	yarn install

.PHONY: lint
lint: install ## Run linter
	yarn lint

.PHONY: build
build: lint ## Build the project
	yarn build
