# Doodle Draw

## Introduction
In my midterm project,  I implemented a fully connected neural network written in Javascript in order to recognize a doodle which is drawn by the web user. After pressing the `Train` button, our neural network begins to be trained. The user can choose to draw cat, fish or strawberry for recognition. As the picture shows, my neural network has a great performance in distinguishing between these categories.

<img src=https://i.imgur.com/6trRbOP.png>

## How to Deploy
```
docker-compose up --build
```

## How to Use
After the service is run on your localhost, you can test `Doodle Draw` on your browser through `localhost:8888/draw`