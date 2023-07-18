<br/>
<p align="center">
  <a href="https://github.com/Bartolumiu/pkStaffManagement">
    <img src="https://media.discordapp.net/attachments/979331923547652126/993195736630046771/Logo_Server.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Pokémon Kingdom Staff Management</h3>

  <p align="center">
    Base code for "Pokémon Kingdom Staff Management" Discord bot
    <br/>
    <br/>
    <a href="https://github.com/Bartolumiu/pkStaffManagement"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <a href="https://github.com/Bartolumiu/pkStaffManagement">View Demo</a>
    .
    <a href="https://github.com/Bartolumiu/pkStaffManagement/issues">Report Bug</a>
    .
    <a href="https://github.com/Bartolumiu/pkStaffManagement/issues">Request Feature</a>
  </p>
</p>

![Contributors](https://img.shields.io/github/contributors/Bartolumiu/pkStaffManagement?color=dark-green) ![Issues](https://img.shields.io/github/issues/Bartolumiu/pkStaffManagement) ![License](https://img.shields.io/github/license/Bartolumiu/pkStaffManagement) [![CodeFactor](https://www.codefactor.io/repository/github/bartolumiu/pkstaffmanagement/badge/main)](https://www.codefactor.io/repository/github/bartolumiu/pkstaffmanagement/overview/main)

## Table Of Contents

* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## Built With



* [Node.JS](https://nodejs.org)
* [Discord.JS](https://discord.js.org)

## Getting Started

To get a local copy of the bot up and running follow these steps.

### Prerequisites

* npm

```sh
npm install npm@latest -g
```

* pm2 (optional)
```sh
npm install pm2 -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/Bartolumiu/pkStaffManagement.git
```

2. Install NPM packages

```sh
npm install
```

3. Rename `.env.template` to `.env` and enter the following:

```env
token=ULTRA_SECRET_BOT_TOKEN
ownerId=01234567891011121314
databaseToken=mongodbtoken
clientId=0123456789011121314
```

4. Start the bot

4.1. Node:
```sh
node src/bot.js
```

4.2. npm command
```sh
npm run test
```

4.3. pm2 (recommended)
```sh
pm2 start src/bot.js
```

## Roadmap

See the [open issues](https://github.com/Bartolumiu/pkStaffManagement/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/Bartolumiu/pkStaffManagement/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the Apache License 2.0. See [LICENSE](https://github.com/Bartolumiu/pkStaffManagement/blob/main/LICENSE) for more information.

## Authors

* [Bartolumiu](https://github.com/Bartolumiu/) - *Main Developer*
