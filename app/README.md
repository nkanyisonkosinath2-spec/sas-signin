# Send A Scooter app downloads

The apps' "Update available" button downloads these files:

- `SendAScooter.apk` – customer app (currently 7.8, code 69)
- `SASRider.apk` – Rider app (currently 5.10, code 48)

To release an update: replace the file here with the new signed APK (same name), wait a few minutes for
GitHub Pages, then raise the version code in the database (`/app/customer` or `/app/rider`) so phones show the notice.
