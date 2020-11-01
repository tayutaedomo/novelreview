# novelreview/scraping

## Setup
```
$ cd novelreview/store
$ npm install
```

## Cloud Functions
### Deploy
```
$ cd novelreview/store
$ gcloud functions deploy novelreview_store --region asia-northeast1 --runtime nodejs10 --trigger-http --allow-unauthenticated
```

## Local Development
```
$ cd novelreview/store
$ npm start
```
