# Your-Voice
-------------------------------------------------

### Your voice is a project which is going to help on the development of nations and institutions.It all about reporting corruptions and mentioning intervention where it is needed so that we can have good transparancy and collaboration for the growth and the progress.


 [![Build Status](https://travis-ci.com/Ally4/Your-Voice.svg?branch=develop)](https://travis-ci.com/Ally4/Your-Voice) [![Coverage Status](https://coveralls.io/repos/github/Ally4/Your-Voice/badge.svg?branch=ch-tests-170333383)](https://coveralls.io/github/Ally4/Your-Voice?branch=ch-tests-170333383) [![Maintainability](https://api.codeclimate.com/v1/badges/eb096c06d57a8af866f9/maintainability)](https://codeclimate.com/github/Ally4/Your-Voice/maintainability)



## The repository
-------------------------------------------------
[Repository](https://github.com/Ally4/Your-Voice)

## The gh-pages
-------------------------------------------------
[GH-pages](https://ally4.github.io/Your-Voice/UI)

## The Pivotaltracker
-------------------------------------------------
[Stories](https://www.pivotaltracker.com/n/projects/2415582)

## The Heroku
-------------------------------------------------
[Heroku](https://your-voice-app.herokuapp.com/)


## Your-Voice`s endpoints on the localhost://1234

|     Methods       |     Endpoints                          |      Descriptions                                                                    | 
|-------------------|----------------------------------------|--------------------------------------------------------------------------------------|
|POST               |  `/api/v2/signup`                      |User should be able to signup                                                         |
|POST               |  `/api/v2/signin`                      |User should be able to signin                                                         |
|POST               |  `/api/v2/redflags`                    |User should be able to create redflag(corruption) or intervention                     |
|GET                |  `/api/v2/redflags`                    |User should be able to get all redflags(corruptions) and intervention                 |
|GET                |  `/api/v2/redflags/:reportId`          |User should be able to get a redflag(corruption) or intervention by id                |
|PATCH              |  `/api/v2/redflags/:id/location`       |User should be able to change the location of a redflag(corruption) or intervention   |
|PATCH              |  `/api/v2/redflags/:id/comment`        |User should be able to change the comment of a redflag(corruption) or intervention    | 
|Delete             |  `/api/v2/redflags/:id`                |User should be able to delete a redflag(corruption) or intervention                   |
|Patch              |  `/api/v2/redflags/:reportId`          |Admin should be able to change the status of a redflag(corruption) or intervention                   |

## For the setting up
### The prerequisites are:
1. node.js
1. postman

** After the cloning which is: git clone `https://github.com/Ally4/Your-Voice.git` in the terminal, you need to do the following **
1. Run `npm install`
1. Run `npm install nodemon`
1. Run `npm start` to check the endpoints in postman
1. Application listen on http://localhost:1234

### For the testing
Run `npm test`
___

> Regards to Andela

> Regards to our LFs

> Regards to our LFAs 

> Andela bootcamp cycle 13

> NENGO Ally as the developer 
