# novelreview/scraping-narou

## Setup
```
$ cd novelreview/scraping-narou
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
$ cd novelreview/scraping-narou
$ gcloud functions deploy novelreview_scraping-narou --region asia-northeast1 --runtime nodejs10 --memory 512 --trigger-http --allow-unauthenticated --set-env-vars "LINE_CHANNEL_ACCESS_TOKEN=<token>,LINE_POST_USER_ID=<user_id>,PUBSUB_CREDENTIALS=<filename>,PUBSUB_TOPIC=<topic name>"
```

If you want to change the detection algorithmic, you have to set below an env variable.
```
$ export DETECT_OPTIONS='{"charCount":200000,"points":1000}'
```


### Local Development
```
$ cd novelreview/scraping-narou
$ npm start
```
