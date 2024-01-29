#!/usr/bin/env bash

set -e
echo "⏳ Installing HMR Enabler app for development"
git clone https://github.com/nextcloud/hmr_enabler.git /var/www/html/apps-extra/hmr_enabler

occ app:enable hmr_enabler
