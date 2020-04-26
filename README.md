# Flask React Template
A starter project using the Flask and React frameworks.


## Set Up

This project uses docker. Make sure it is installed but once it is all you need to do is:

1 - Build it
```
docker-compose build
```

2 - Launch it
```
docker-compose up
```

## Testing

To run the front-end tests:

```
docker-compose run webpack npm test
```

To run the back end tests:

```
docker-compose run app python -m unittest
```