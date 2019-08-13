# sg-brand

<p align="center">
    <a href="https://circleci.com/gh/gsoft-inc/sg-brand/tree/master"><img alt="CircleCI Status" src="https://circleci.com/gh/gsoft-inc/sg-brand/tree/master.svg?style=svg"></a>
</p>

## Installation

## Maintainers

This project repository is managed as a monorepo that is composed of many NPM packages. 

For more info on monorepo:

- [Babel Github](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)
- [Shopify Github](https://github.com/Shopify/quilt/blob/master/Decision%20records/00%20-%20Use%20a%20Lerna%20monorepo.md)
- [Google](https://www.google.com/search?q=monorepo)

We use Lerna for managing our monorepo. All our packages can be found in the [packages](https://github.com/gsoft-inc/sg-brand/tree/master/packages) directory. 

The only exception is the website that is not managed by the monorepo tooling since it's not a package. The website can be found in the [website](https://github.com/gsoft-inc/sg-brand/tree/master/website) directory.

Since Yarn workspace feature offer native mono-repo capabilities and a seemless integration with Lerna this is our goto package manager for this project.

When Lerna is configured to use Yarn it will delegate the installation of the packages and the dependencies linking to Yarn. It result in an increase of performance and a more reliable experience than using the Lerna dependencies linking feature and NPM. The native integration between Lerna and Yarn make it worthwill to switch from NPM to Yarn for this project.

So why do we need Lerna if Yarn workspace take care of everything?

Well the Lerna workflow make it very easy to publish the packages of a monorepo. For more info, view the [publish command](https://github.com/lerna/lerna/tree/master/commands/publish#readme) of Lerna.

### Installation

This project use Yarn workspace. Therefore, you must install Yarn:

```
choco install yarn
``` 

For more options to install Yarn, view https://yarnpkg.com/lang/en/docs/install/#windows-stable.

To install the project, open a terminal at the root of the project and execute the following command:

```bash
yarn bootstrap
```

The installation should take up to 5 minutes.

By default, the packages and the website are installed.

To only install the packages, instead, use the following command:

```bash
yarn bootstrap:pkg
```

If you want to install the website later, use the default installation command or:

```bash
yarn bootstrap:website
```

### Develop a component

**Storybook**

We recommend to develop every components in [Storybook](https://storybook.js.org).

This is a convenient sandbox that help the developpers write organized and isolated stories for every specifications of the component. Storybook also facilitate functionnal testing and integrate very well with automated testing technologies.

When completed, the whole Storybook will represent a functional catalog of all the Sharegate design system components and will be available online for the design team.

For more informations about the automated tests, view the [Visual Regression Tests](https://github.com/gsoft-inc/sg-brand/blob/master/README.md#visual-regression-tests) section.

**Start developing**

The tooling to develop a component involve 2 processes:

- A process that watch & re-compile the packages
- A process that run the Storybook app

Therefore, you should [open 2 terminals in VSCode](https://code.visualstudio.com/docs/editor/integrated-terminal#_managing-multiple-terminals).

In the first terminal, execute the following command to watch & compile the packages:

```bash
yarn start
```

In the second terminal, execute the following command to start Storybook:

```bash
yarn start:sb
```

You can update any packages (components, SUI theme, tachyons, ...) or stories and your Storybook will be automatically refreshed with the changes.

For more information about the development of a component view blabla..

### Update the website

The tooling to update the website involve 2 processes:

- A process that watch & re-compile the packages
- A process that run the website

Therefore, you should [open 2 terminals in VSCode](https://code.visualstudio.com/docs/editor/integrated-terminal#_managing-multiple-terminals).

In the first terminal, execute the following command to watch & compile the packages:

```bash
yarn start
```

In the second terminal, execute the following command to start Storybook:

```bash
yarn start:website
```

You can update any packages (components, SUI theme, tachyons, ...) or pages of the website and your website will be automatically refreshed with the changes.

For more information about the development of the website view blabla..

### Build packages (sous section de Publish?)

To build the whole brand use the command:

```
yarn build
```

To build a specific package of the brand, use the specific build command. For example, to build the react components, use:

```
yarn build:rc
```

By default, the output should be in a `dist` folder. For more details, view the specific packages README.

### Release the packages

Releasing the packages to NPM includes a few steps:

- Build the packages code for production
- Choose which packages to release (based on which packages changed)
- Bump the version of every packages selected for release
- Updates all the packages that requires the selected packages to reflect the version bump
- Publish the packages to NPM
- Push the changes to Git (the changes are the version bump)

Good news, this is all automated with a few commands!

Before you release, make sure you have **write access** for all the NPM packages that will be published and that you are [logged in to NPM](https://docs.npmjs.com/logging-in-to-an-npm-enterprise-registry-from-the-command-line).

To release, open a terminal at the root project of the workspace and execute the following:

```bash
yarn new-version
yarn release:pkg
git push
```

#### Troubleshooting

If the packages failed to compile you can build without trying to do a new release. To do so, instead execute the following command:

```bash
yarn build:pkg
```

By default, the output should be in a `dist` folder. For more details, view the specific packages README.

### Publish Storybook

### Publish website

### Storybook stories (potentiellement mettre ça dans le packages react-components)

### Other commands

### Add a new NPM packages

Dont add new packages to the root of the workspace unless you know what you are doing.

Instead add new packages to sub packages of the workspace.

To do so, in your terminal, navigate to the directory of the package and the use yarn to add the package:

`yarn add PACKAGE_NAME [--dev]` will install the package.

### Add a yarn scripts

Think of scripts as atomic script. It means that a script should only do one thing, then you can have other scripts than compose those scripts.

Example:

Instead of doing

```
"scripts": {
    "build": rimraf dist && babel src -d dist 
}
```

Do

```
"scripts": {
    "build": "yarn delete && yarn transpile",
    "delete": "rimraf dist",
    "transpile": "babel src -d dist"
}
```

Every scripts should be executable from the root of the workspace. Make sure you add a script entry in the package.json located at the root event if your script is already define in a sub-project.

Every "Lerna" related scripts should be added in the the root package.json since Lerna is installed at the root of the workspace.

For example, take the react-components project, since we execute a babel compilation for all the individual components, we must define a `lerna exec` command, to call the babel CLI, therefore, we added this script in the root package.json

You can have scripts in sub project. Again, take the react-components project. A script is define in the actual project to start storybook since the workspace doesn't know about storybook, this is a dependency of react-components not of the whole workspace. Therefore, the scripts is define in the react-components project and a script entry has been added to the root package.json to call the script in the sub project.

To run multiple commands simultaneously, use `run-p`, to run multiple commands sequentially, use `run-s`, otherwise use `yarn`

### Add a new project

Create a new folder matching your project name in /packages

Go to that folder with a terminal and execute `yarn init`.

Answer the questions.

Dont forget to add the scope "@sharegate" before your package name. For example if your project name is "toto", your package name should be "@sharegate/toto".

Make sure you set the license to "Apache-2.0"

Make sure you set the author to "Groupe Sharegate inc."

Make sure you set the repository to "https://github.com/gsoft-inc/sg-brand.git"

Add your new project has "peerDependency", "devDependency" or "dependency" of any project who need it.

If the "website" project use your new project, make sure you add it to /website/scripts/setup-website-yarn-links.js.

### Visual Regression Tests

### CI

## Good to remember

Bootstrap specify "--ignore-scripts" to yarn install because otherwise semantic-ui will try to reinstall everytime we do a yarn install. Haven't found any other way to prevent it.

Chromaticqa is inconsistant if we load a custom font

# TODO

- Doc une page packages à la Babel: https://github.com/babel/babel/blob/master/packages/README.md

- Hot reload doesn't seem to work anymore with storybook? Maybe it's the update to the babel config of the components? Maybe the update to storybook?

- Deprecate old packages (semantic-ui-sg, tachyons-sg, sg-brand-foundation)

- Inclure la "files" property dans les package.json

- Hookify components

- Some sort of intellisense? Like typescript types?

- Prendre la dernière version de Apricot pour remote-search-input (https://dev.azure.com/sharegate/Sharegate.Gravt/_git/Sharegate.Gravt/pullrequest/3118)

- Delete custom script sto copy LICENSE when released: https://github.com/lerna/lerna/commit/d410a58e3039ea7db0ad6f6d50f33b2024cda709

- Babel - compile for production

## License

Copyright © 2019, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.

