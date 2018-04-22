# liuzhenglaichn.com

Liu Zhenglai's Blog

# Dev

## Front-end
```
$ cd front-end
$ npm run dev
```

Open browser with the link mentioned in command line message (usually http://localhost:8080)

## Back-end
Run `mongod` first, then
```
$ cd back-end
$ nodemon
```

# Production
## Front-end
```
$ cd front-end
$ node app
```

## Back-end
Same as **Dev - Back-end**.

# TODO
- [x] Display Posts
- [x] Log in & Authentication
- [x] Anonymous user can view my posts
- [x] hide edit if visiter is not author
- [x] back to top button
- [x] for anonymous user, show sign in.
- [x] merge sign in and sign up.
- [x] extract header as a component
- [ ] profile page
- [ ] learn vue transition; refine back to top button
- [ ] Sign out
- [ ] Paginate Posts
- [ ] Doodle Page
- [ ] Validate email and password