
# Tele-Crit

manage a list of the TV shows/Movies watched
DEMO LINK: https://tele-crit.netlify.app/
[![S7Ai0P.md.png](https://iili.io/S7Ai0P.md.png)](https://freeimage.host/i/S7Ai0P)
## Screenshots

[![S5RpJn.md.png](https://iili.io/S5RpJn.md.png)](https://freeimage.host/i/S5RpJn)
[![S5RsxR.md.png](https://iili.io/S5RsxR.md.png)](https://freeimage.host/i/S5RsxR)
[![S5RtfI.md.png](https://iili.io/S5RtfI.md.png)](https://freeimage.host/i/S5RtfI)
[![S5R6OJ.md.png](https://iili.io/S5R6OJ.md.png)](https://freeimage.host/i/S5R6OJ)

## How to Deploy and run the service

<details>
<summary>Manually install with NPM and all...</summary>

First, clone the repo and go to root of repo
```bash
git clone https://github.com/ThisIsFaar/TeleCrit.git
cd TeleCrit
```

First complete the server mandatory steps

1. move to server folder and install server dependancy
```bash
cd server
npm install
```
2. create a file with name ".env"
3. In .env file add required env variables
1. MONGODB_URI=<your_mongodb_atlas_db_uri>
2. SECRET=<'a_secret_string'>
3. PORT=<a_free_port_for_server>
4. start the server
```
npm start
```

Complete the Client mandatory steps

1. move to client folder(from the root of repo) and install server dependancy
```bash
cd client
npm install
```
2. create a file with name ".env"
3. In .env file add required env variable
1. REACT_APP_API_URL=<http://localhost:<your_server_port>/api>
4. start the server
```
npm start
```

Client will be started on 3000 port by default, access directly on your browser with

```
localhost:3000
```
</details>

<details>
<summary>With Docker images...</summary>


Clone repo and add env variables from 1st procedure

then simply run commands in terminal from root of project

```
    docker-compose build
    docker-compose up
```

Done, open app in your broswer with url:
```
    localhost:3000
```

</details>

           
           
### Checklist of Assignment Task (All Completed)

- [x] Users can add a new title to the list with the following information
     - Title - Name of the show
     - Streaming App : Streaming Platform where the user has watched the show (example - Netflix)
     - Rating : Users should be able to **star rate** the show.
     - Review : Users should be able to add a review of that show
- [x] Users should be able to add or delete a show from the list.
- [x] Users can update any of the TV series related data ( eg: streaming app, rating, review)
- [x] APIs should validate a JWT token before allowing access to the caller.
- [x] Prettier and Linter configuration
- [x] Dockerise the application
- [x] Readme file on how to deploy and run the service.
           
           
           
