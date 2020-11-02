# novelreview/scraping

## Setup
```
$ cd novelreview/scraping
$ npm install
```


## LINE Notification
If you need LINE notification, you have to set below env variables.
```
$ export LINE_CHANNEL_ACCESS_TOKEN=<Your access token>
$ export LINE_POST_USER_ID=<Receiver user id>
```


## Cloud Pub/Sub
If you need Pub/Sub, you have to set below env variables.
```
$ export PUBSUB_CREDENTIALS=<JSON credential path>
$ export PUBSUB_TOPIC=<Topic name>
```


## Cloud Functions
### Deploy
```
$ cd novelreview/scraping
$ gcloud functions deploy novelreview_scraping --region asia-northeast1 --runtime nodejs10 --memory 512 --trigger-http --allow-unauthenticated
```

### Local Development
```
$ cd novelreview/scraping
$ npm start
```
