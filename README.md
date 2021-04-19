![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# LAB | Express IronTumblr

## Introduction

We have learned how to upload files and now is the time to practice this a bit more.

## Requirements

- Fork this repo
- Clone this repo

## Submission

Upon completion, run the following commands:

```
$ git add .
$ git commit -m "done"
$ git push origin master
```

Create Pull Request so your TAs can check up your work.

## Instructions

[Tumblr](tumblr.com) is an ultra-popular micro-blogging website.

**A micro-blog is:** a social media site to which a user makes short, frequent posts.

This is easier shown than described, so check out [this tumblr](http://bestdogmemes.tumblr.com/) filled with funny dog memes.

### Iteration 1 | User Profile Picture

We have already provided you with the _user_ model, as well as fully functional authentication logic. However, one thing is missing. The user doesn't have a profile picture. Add a new property to the user model, and fix user registration so that it allows the user to upload a profile picture.

### Iteration 2 | Posts

In this iteration, create the bread and butter of the IronTumblr - the posts.

First, create a `Post` model. A post should have the following attributes:

- `content` - the text belonging to the post
- `creatorId` - ObjectId of the post's creator (the user who created a post)
- `picPath` - where the picture is stored
- `picName` - the picture's name

For this iteration, besides the model, you have to create:

- the GET route to display the **post-form**,
- the POST route to actually **create** the post (this route should include file uploading),
- the GET route to display the **posts** and
- the GET route to display **post-details**.

**A user should be logged in to create a post, but _not_ to view it.** (Check the `isLoggedIn.js` file in the _middlewares_ folder.)

The **posts** will be the home page, and simply display all of the posts on the website.

### Bonus: Iteration 3 | Comments

Posts should have comments attached to them. Create the `Comment` model as a sub-document of the `Post`.
A comment _can_ have images attached to it, but not all do, so it is not required.

The `Comment` model should have the following attributes:

- `content`
- `authorId`
- `imagePath`
- `imageName`

You should create routes to create new comments. Comments should be displayed on the details page of a single post.

### Bonus: Iteration 4 | Deployment

The last step in IronTumblr should be to deploy the app to Heroku. Don't forget to deploy your database on MongoLab/Mongo Atlas.

Your site should be live and functioning with a working public URL.

**Happy coding!** :heart:
