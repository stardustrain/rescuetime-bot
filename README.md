Rescuetime bot
--
Send rescuetime daily summary data to channel in slack at every day 1:00 am.

<div>
<img width=400 src="https://user-images.githubusercontent.com/9318449/71454097-5d4a7e80-27d2-11ea-9879-32454f4cea29.png" />
</div>

## Environment
### Development
- typescript 3.7
- axios
- @slack/webhook
- ramda

### Deployment
- Google cloud platform: To use gcloud sdk on cli commmand.

### Execution evironment
- index.js to executing at GCP functions.
- GCP cloud scheduler sending trigger event for run index.js functions at every day 1:00 am.
- Environment variable was set in GCP functions.

## Run project
1. Set env variable RESCUE_TIME_API_KEY and HOOK_URL.
2. ```git clone https://github.com/stardustrain/rescuetime-bot.git```
3. ```cd rescuetime-bot && npm install && npm run start```

## Deployment
1. Install [gcloud sdk](https://cloud.google.com/sdk/docs/downloads-interactive?hl=ko).
2. Run ```gcloud init``` command, and select(or create) project.
3. First time, run ```npm run build``` and executing ```gcloud functions deploy sendDailyReport --runtime RUNTIME --trigger-topic TOPIC_NAME --update-env-vars RESCUE_TIME_API_KEY=YOUR_KEY,HOOK_URL=YOUR_URL```, cause set to env variable in GCP functions.
4. If success to deploy, use ```npm run deploy``` command on next deployment.
