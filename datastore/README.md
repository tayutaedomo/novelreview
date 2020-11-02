# novelreview/datastore

## Setup
```
$ cd novelreview/datastore
$ npm install
```


## Cloud Datastore
If you need Datastore, you have to set below env variables.
```
$ export DATASTORE_CREDENTIALS=<JSON credential file name>
```


## Cloud Functions
### Deploy
```
$ cd novelreview/datastore
$ gcloud functions deploy novelreview_datastore --region asia-northeast1 --runtime nodejs10 --trigger-http --allow-unauthenticated --set-env-vars "DATASTORE_CREDENTIALS=<filename>"
```

## Local Development
```
$ cd novelreview/datastore
$ npm start
```
