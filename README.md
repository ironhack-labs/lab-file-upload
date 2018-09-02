![Ironhack Logo](https://i.imgur.com/1QgrNNw.png)
# Express File Uploads | IronTumblr

## Requirements

- [Fork this repo](https://guides.github.com/activities/forking/)
- Clone this repo into your `~/code/labs`

## Submission

Upon completion, run the following commands

```
$ git add .
$ git commit -m "done"
$ git push origin master
```
Navigate to your repo and create a Pull Request -from your master branch to the original repository master branch.

In the Pull request name, add your name and last names separated by a dash "-".

Include a link to your deployed heroku app in the pull request.

## Deliverables

Complete all of the non-bonus iterations. No styling is required, but is suggested as bonus.


## Instructions

## Introduction

<img src="https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_c0b2a46765e63ac8ac589835f7bb92ea.png" width="500px">

[Tumblr](tumblr.com) is an ultra popular microblogging website.

**A microblog is:**

> A social media site to which a user makes short, frequent posts.

This is easier shown than described, so check out [this tumblr](http://bestdogmemes.tumblr.com/) filled with funny dog memes.

### Iteration 1 | User Profile Pictures

In the starter code, we've already provided a User model and the authentication logic. Unfortunately, the user doesn't have a profile picture.

Fix the User Registration so that it allows the user to upload a file as their profile image.

### Iteration 2 | Posts

In this iteration, create the bread and butter of Tumblr, the Post.

A post should have the following attributes:

- `content` - Text belonging to the post
- `creatorId` - ObjectId of the post's creator
- `picPath` - Where the picture is stored
- `picName` - The picture's name

For this iteration you must create the **model**, along with the **new**, **create**, **show** and **index** routes. This should include file uploading.

A user should be logged in to create a post, but *not* to view.

The **index** will be the home page, and simply display all of the posts on the website.

### Iteration 3 | Comments

Posts have comments attached to them. Create the Comment model as a subdocument of the Post.

A comment *can* have images attached to it, but not all do.

The model should have the following attributes:

- `content`
- `authorId`
- `imagePath`
- `imageName`

You should create routes to create new comments. Comments should be displayed on the Post *show* page.

### Iteration 4 | Deploy!

The last step in IronTumblr should be to deploy to Heroku. Don't forget to deploy your database on mongolab.

Your site should be live and functioning with a working URL.
