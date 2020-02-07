![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Express | IronTumblr

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

**A micro-blog is:**

> A social media site to which a user makes short, frequent posts.

This is easier shown than described, so check out [this tumblr](http://bestdogmemes.tumblr.com/) filled with funny dog memes.

### Iteration 1: User Profile Pictures

In the starter code, we have already provided the user model and the authentication logic. Unfortunately, the user doesn't have a profile picture.

Fix the User Registration so that it allows the user to upload a file as their profile image.

### Iteration 2: Posts

In this iteration, create the bread and butter of Tumblr - the posts.

A post should have the following attributes (this actually describes the `Post` model):

- `content` - the text belonging to the post
- `creatorId` - ObjectId of the post's creator
- `picPath` - where the picture is stored
- `picName` - the picture's name

For this iteration you must create the **model**, along with the (get) **post-form**, (post) **create**, (get) **posts** and (get) **post-details** routes.
The _create_ route should include file uploading.

**A user should be logged in to create a post, but _not_ to view it.**

The **posts** will be the home page, and simply display all of the posts on the website.

### Iteration 3: Comments

Posts have comments attached to them. Create the Comment model as a sub-document of the Post.

A comment _can_ have images attached to it, but not all do, so it is not required.

The `Comment` model should have the following attributes:

- `content`
- `authorId`
- `imagePath`
- `imageName`

You should create routes to create new comments. Comments should be displayed on the details page of a single post.

### Iteration 4: Deployment

The last step in IronTumblr should be to deploy to Heroku. Don't forget to deploy your database on MongoLab/Mongo Atlas.

Your site should be live and functioning with a working public URL.

**Happy coding!** :heart:
