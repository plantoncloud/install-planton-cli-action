# `gh-action-install-planton-cli`

This [Action] installs the `planton` CLI in your GitHub Actions pipelines so that it can be
used by other Actions created for Building and Deploying your Packages & Microservices.

* [`gh-action-build-java`][https://github.com/plantoncloud/gh-action-build-java]
* [`gh-action-build-golang`][https://github.com/plantoncloud/gh-action-build-golang]
* [`gh-action-build-javascript`][https://github.com/plantoncloud/gh-action-build-javascript]
* [`gh-action-build-protobuf`][https://github.com/plantoncloud/gh-action-build-protobuf]

After `gh-action-install-planton-cli` is run, the `planton` command is available to other Actions in the pipeline's
`PATH`. You can also use the `planto` command directly inside of workflow steps.

## Usage

Here's an example usage of `gh-action-install-planton-cli`:

```yaml
steps:
  # Run `git checkout`
  - uses: actions/checkout@v3
  # Install the `planton` CLI
  - uses: plantoncloud/gh-action-install-planton-cli@main
  # Ensure that `planton` is installed
  - run: planton version
```

## Configuration

### Input

You can configure `gh-action-install-planton-cli` with these parameters:

| Parameter      | Description                                                | Default            |
|:---------------|:-----------------------------------------------------------|:-------------------|
| `version`      | The version of the [`planton` CLI] to install              | `v0.0.63`          |

> These parameters are derived from [`action.yml`](./action.yml). <br>
#### Version

If `version` is unspecified, the latest version of `planton` is installed:

```yaml
steps:
  - uses: actions/checkout@v3
  # Installs latest
  - uses: plantoncloud/gh-action-install-planton-cli@main
  - run: planton version
```

Use the `version` parameter to pin to a specific version:

```yaml
steps:
  - uses: actions/checkout@v3
  # Installs version v0.0.63
  - uses: plantoncloud/gh-action-install-planton-cli@main
    with:
      version: v0.0.63
  # Should output v0.0.63
  - run: planton --version
```

[action]: https://docs.github.com/actions
[gh-action-build-java]: https://github.com/plantoncloud/gh-action-build-java
[gh-action-build-golang]: https://github.com/plantoncloud/gh-action-build-golang
[gh-action-build-javascript]: https://github.com/plantoncloud/gh-action-build-javascript
[gh-action-build-protobuf]: https://github.com/plantoncloud/gh-action-build-protobuf
