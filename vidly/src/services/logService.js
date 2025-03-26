import * as Sentry from "@sentry/react";

function init() {
  Sentry.init({
    dsn: "https://dde0598d8467a7f8d736ae2787e5fa9a@o4509043942227968.ingest.de.sentry.io/4509043943604304",
  });
}

function log(error) {
  Sentry.captureException(error);
  console.error(error);
}

export default {
  init,
  log,
};
