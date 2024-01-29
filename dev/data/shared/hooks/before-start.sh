#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2024 Sebastian Stöcker <sebastian.stoecker@uni-marburg.de>
# SPDX-License-Identifier: AGPL-3.0-or-later

set -e
echo "⏳ Installing HMR Enabler app for development"
git clone https://github.com/nextcloud/hmr_enabler.git /var/www/html/apps-extra/hmr_enabler

occ app:enable hmr_enabler
