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
$ export PUBSUB_CREDENTIALS=<JSON credential name>
$ export PUBSUB_TOPIC=<Topic name>
```


## Cloud Functions
### Deploy
```
$ cd novelreview/scraping
$ gcloud functions deploy novelreview_scraping --region asia-northeast1 --runtime nodejs10 --memory 512 --trigger-http --allow-unauthenticated --set-env-vars "LINE_CHANNEL_ACCESS_TOKEN=<token>,LINE_POST_USER_ID=<user_id>,PUBSUB_CREDENTIALS=<filename>,PUBSUB_TOPIC=<topic name>"
```

### Local Development
```
$ cd novelreview/scraping
$ npm start
```
