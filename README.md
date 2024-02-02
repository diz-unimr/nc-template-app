<!--
* SPDX-FileCopyrightText: 2024 Sebastian Stöcker <sebastian.stoecker@uni-marburg.de>
* SPDX-License-Identifier: AGPL-3.0-or-later
-->

# Nextcloud app development example
[![ESLint](https://github.com/diz-unimr/nc-template-app/actions/workflows/lint-eslint.yml/badge.svg)](https://github.com/diz-unimr/nc-template-app/actions/workflows/lint-eslint.yml)
[![Lint app info](https://github.com/diz-unimr/nc-template-app/actions/workflows/lint-info-xml.yml/badge.svg)](https://github.com/diz-unimr/nc-template-app/actions/workflows/lint-info-xml.yml)
[![PHP Coding Standards Fixer](https://github.com/diz-unimr/nc-template-app/actions/workflows/lint-php-cs.yml/badge.svg)](https://github.com/diz-unimr/nc-template-app/actions/workflows/lint-php-cs.yml)
[![Stylelint](https://github.com/diz-unimr/nc-template-app/actions/workflows/lint-stylelint.yml/badge.svg)](https://github.com/diz-unimr/nc-template-app/actions/workflows/lint-stylelint.yml)
[![PHPUnit](https://github.com/diz-unimr/nc-template-app/actions/workflows/phpunit-pgsql.yml/badge.svg)](https://github.com/diz-unimr/nc-template-app/actions/workflows/phpunit-pgsql.yml)
[![Package build](https://github.com/diz-unimr/nc-template-app/actions/workflows/appbuild.yml/badge.svg)](https://github.com/diz-unimr/nc-template-app/actions/workflows/appbuild.yml)
[![REUSE Compliance Check](https://github.com/diz-unimr/nc-template-app/actions/workflows/reuse.yml/badge.svg)](https://github.com/diz-unimr/nc-template-app/actions/workflows/reuse.yml)

This is an example nextcloud app development setup.

This repository features a [Docker Compose setup](dev/compose.yaml) to develop against a specific Nextcloud version and supports
hot module replacement of the app's frontend (Vue.js) components.

## Building the app

1. Install php dependencies:
    ```
    make composer
    ```
2. Install npm dependencies:
    ```
    npm ci
    ```

## Run the app

1. Start the webpack dev server (see [package.json](package.json) from your development IDE:
    ```
   npm run serve
    ```
2. Start the Nextcloud Docker environment from the `dev` folder:
    ```
    docker compose up -d
    ```

This starts the [nextcloud-docker-dev](https://github.com/juliushaertl/nextcloud-docker-dev) container.

## Enable app

In order for Hot module replacement (HMR) to work the [HMR Enabler](https://github.com/nextcloud/hmr_enabler) app
is installed and enabled on container startup.

1. Login to `http://localhost:8080` with user `admin` and password `admin`.
2. Go to _Apps_ and enable the **Template App**

You can now go the App's navigation item at the top to see the example app from the
[Nextcloud App Generator](https://apps.nextcloud.com/developer/apps/generate).

Changes to the _Vue.js_ frontend code should now trigger the webpack-dev-server to rebuild the code and the browser to
reload the content.
