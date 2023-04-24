<a name="readme-top"></a>

# YelpCamp &#x26FA;

<div align="center">

![YelpCamp Screenshot][yelp-camp-screenshot]

</div>

This is a project to learn and practice full stack web development. Project originated from [Colt Steele's][colt-url] [course](https://www.udemy.com/course/the-web-developer-bootcamp/).

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#built-with-&#x1F3D7;">Built With</a>
    </li>
    <li>
      <a href="#getting-started-&#x1F4BB;">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#running-app-&#x1F680;">Running App</a></li>
    <li><a href="#contact-&#x2709;">Contact</a></li>
    <li><a href="#acknowlegements-&#x1F64C;">Acknowledgments</a></li>
  </ol>
</details>

# Built With &#x1F3D7; 

<div align="center">

[![HTML5][HTML-shield]][HTML-url]
[![CSS3][CSS-shield]][CSS-url]
[![JavaScript][JavaScript-shield]][JavaScript-url]
[![Node][Node.js-shield]][Node.js-url]
[![MongoDB][MongoDB-shield]][MongoDB-url]
[![Git][Git-shield]][Git-url]
[![Bootstrap][Bootstrap-shield]][Bootstrap-url]
[![Render][Render-shield]][Render-url]
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Getting Started &#x1F4BB; 

## Prerequisites

### Node.js & NPM

Install Node.js with NPM from its [website](https://nodejs.org/).

Once installed, check Node version:
```
node --version
```
Check npm version:
```
npm --version
```

### MongoDB

Install MongoDB and MongoDB Shell (`mongosh`) from its [website](https://www.mongodb.com/).

### Cloudinary API Key

[Cloudinary](https://cloudinary.com/) is used for image storage. Sign up for an free-tier account to receive an API key.

### Mapbox API Key

[Mapbox](https://www.mapbox.com/) is used for a cluster map and individual campground maps. Sign up for an free-tier account to receive an API key.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

### 1. Clone the repo
```
git clone https://github.com/jenningsf/yelp-camp.git
```

### 2. Install NPM packages in project directory
```
cd yelp-camp
npm install
```

If vulnerabilities are found when packages are installed, run:
```
npm audit fix
```

### 4. Create environment variables

In home directory, create `.env` file with the below environment variables and input your API keys an MongoDB URL if using MongoDB Atlas.
```
# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=

# Mapbox credentials
MAPBOX_TOKEN=

# MongoDB credentials
DB_URL=

# Secret key
SECRET=
```

### 4. Create initial database user

1. Run MongoDB via `mongod.exe

2. Start app:
```
node app.js
```

3. Open app (default is http://localhost:3000) to register an initial user.

4. Once initial is registered, open MongoDB Shell (`mongosh`) and run the following commands to retrieve the user's `ObjectID`

```
use yelp-camp
db.users.find()
```

### 5. Seed database


1. Copy the user's `ObjectID` from above and paste into `seeds/seeds.js` under author so all of your seeded campgrounds have an author.

![MongoDB Shell Screenshot][mongosh-screenshot]

2. Ensure database is running via `mongod.exe` and seed database with:
```
node seeds/seeds.js
```

The database should be seeded with the number of campgrounds indicated within `seeds/seeds.js` (default is 150).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Running App &#x1F680;

Once API keys are created, environment variables are added, and the database is seeded with the initial user's `ObjectID` it's time to run the app!

1. Run MongoDB via `mongod.exe`
3. Start app:
```
node app.js
```
Console should indicate where app is running (default is http://localhost:3000).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Contact &#x2709;

Feel free to reach out!
<div align="center">

[![LinkedIn][LinkedIn-shield]][LinkedIn-url]
[![ProtonMail][ProtonMail-shield]][ProtonMail-url]
[![Telegram][Telegram-shield]][Telegram-url]

</div>

Live Version: https://yelp-camp-vk0l.onrender.com

Project Repo: https://github.com/JenningsF/yelp-camp

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Acknowlegements &#x1F64C;

Big thanks to [Colt Steele][colt-url] in putting in the time and effort to creating such a robust web dev course.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Links & Images -->
[yelp-camp-screenshot]: images/yelp-camp-screenshot.png "Screenshot of YelpCamp app"
[mongosh-screenshot]: images/mongosh-screenshot.png "Screenshot of MongoDB Shell showing the user ObjectID"
[colt-url]: https://www.udemy.com/user/coltsteele/
[HTML-shield]: https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white 
[HTML-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[CSS-shield]: https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white
[CSS-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[JavaScript-shield]: https://img.shields.io/badge/JavaScript-323330?style=flat-square&logo=javascript&logoColor=F7DF1E
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Node.js-shield]: https://img.shields.io/badge/Nodejs-43853d?style=flat-square&logo=Node.js&logoColor=white
[Node.js-url]: https://nodejs.org/en/
[MongoDB-shield]: https://img.shields.io/badge/MongoDB-47a248?style=flat-square&logo=MongoDB&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Git-shield]: https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white
[Git-url]: https://git-scm.com/
[Bootstrap-shield]: https://img.shields.io/badge/Boostrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com/
[Render-shield]: https://img.shields.io/badge/Render-323330?style=flat-square&logo=Render&logoColor=46E3B7
[Render-url]: https://render.com/
[LinkedIn-shield]: https://img.shields.io/badge/LinkedIn-323330?style=for-the-badge&logo=linkedin&logoColor=0077B5
[LinkedIn-url]: https://www.linkedin.com/in/jennings-fairchild/
[ProtonMail-shield]: https://img.shields.io/badge/ProtonMail-323330?style=for-the-badge&logo=protonmail&logoColor=8B89CC
[ProtonMail-url]: mailto:jenningsf@protonmail.com
[Telegram-shield]: https://img.shields.io/badge/Telegram-323330?style=for-the-badge&logo=telegram&logoColor=26A5E4
[Telegram-url]: https://t.me/jenningsf/