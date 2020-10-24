# novelreview


## LINE Notification
If you need LINE notification, you have to set below env variables.
```
$ export LINE_CHANNEL_ACCESS_TOKEN=<Your access token>
$ export LINE_POST_USER_ID=<Receiver user id>
```


## Cloud Functions
### Deploy
```
$ gcloud functions deploy <Your function name> --runtime nodejs10 --trigger-http --allow-unauthenticated
```

## Local Development
```
$ npm start
```
