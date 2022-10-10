
### 🛠 Build locally

1. Checkout the repository to your local machine e.g. with `git clone https://github.com/b-boehne/jira-comment-visibility/`
1. Run `npm install` to install all required dependencies
1. Run `npm run build:chrome` or `npm run build:firefox && npm run package:firefox`

The build step will create the `build` folder, this folder will contain the generated extensions.

You can now add the extension to Chrome using the `build/chrome` folder or to Firefox using the `web-ext-artifacts/firefox.zip`
