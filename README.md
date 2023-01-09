# Jira Comment Visibility

## Purpose

This extension relieves the user of having to remember to change the visibility of jira comments.

## State

The extension is in active development and can be considered unfinished, buggy and slow as of now.
Use at your own (probably small) risk.

I'm a backend developer so my JS skills may not be up to par with best practices and conventions. Don't judge pls.

## Contributing

Feature requests can be made by opening up an issue in this repository.

Any contribution that is closer to coding advice, please express via PR :)

There's probably TODOs scattered everywhere, feel free to take one up.
Shoot me a message that you're doing it though, to prevent us from doing the same thing twice.

## Installing

### Chrome

Install via Chrome Web Store
https://chrome.google.com/webstore/detail/jira-comment-visibility/leonhglfgimocmaiomhegmeoobkmnhae/

### Firefox

Install via Firefox Browser Add-Ons
https://addons.mozilla.org/firefox/addon/jira-comment-visibility/

## Build locally

1. Checkout the repository to your local machine e.g. with `git clone https://github.com/b-boehne/jira-comment-visibility/`
1. Run `npm install` to install all required dependencies
1. Run `npm run build:chrome` or `npm run build:firefox`
1. Run `npm run package:chrome` or `npm run package:firefox`

The build step will create the `build` folder, this folder will contain the generated extensions.

You can now add the extension to Chrome using the `build/chrome` folder or to Firefox using the `web-ext-artifacts/firefox.zip`
