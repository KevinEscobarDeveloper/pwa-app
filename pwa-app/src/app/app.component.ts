import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwPush, SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'coffeelog';

  constructor(private snackBar: MatSnackBar, private swUpdate: SwUpdate,
    private swPush: SwPush) { }

  ngOnInit() {

    //checking sw-baed updates
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
      this.swUpdate.versionUpdates.subscribe(event => {
        if (event.type === "VERSION_READY") {
          const sb = this.snackBar.open("There is a new version available", "Install Now", { duration: 4000 });
          sb.onAction().subscribe(() => {
            this.swUpdate.activateUpdate().then(() => {
              window.location.reload();
            });
          });
        }
      });
    }

    //updating the UI on network changes
    if (typeof window !== 'undefined') {
      this.updateNetworkStatusUI();

      window.addEventListener('online', () => this.updateNetworkStatusUI());
      window.addEventListener('offline', () => this.updateNetworkStatusUI());

      if (window.matchMedia('(display-mode: browser)').matches) {
        // We are in the browser
        if ('standalone' in navigator) {
          // only available in Safari
          this.snackBar.open("You can install this app, use Share > Add to Home Screen", "", { duration: 3000 });
        } else {
          // it's not Safari
          window.addEventListener("beforeinstallprompt", event => {
            event.preventDefault();
            const sb = this.snackBar.open("You can install this app", "Install", { duration: 5000 });
            sb.onAction().subscribe(() => {
              (event as any).prompt();
              (event as any).userChoice.then((result: any) => {
                if (result.outcome == "dismissed") {
                  // TODO:
                } else {
                  // TODO:
                }
              });
            });
          });
        }
      }
    }
  }

  registerForPush() {
    console.log(this.swPush.isEnabled)
    if (this.swPush.isEnabled) {

      Notification.requestPermission(permission => {
        if (permission === 'granted') {
          this.swPush.requestSubscription({
            serverPublicKey: "BJA2URbqU7YkjPvhiMnvRbLRlc4NNlEGkh2GZ62OYcLIj_kRGjqS2Rkp7mkk24JCx7XUovpRL9kuRyWGmmzXxoI"
          })
            .then(sub => {
              //make a post call to send the subscription object to the server
              console.log("Notification Subscription", sub);
            })
            .catch(err => console.error("Could not subscribe to notification", err));
        }
      });

    }
  }

  updateNetworkStatusUI() {
    if (typeof navigator !== 'undefined' && typeof document !== 'undefined') {
      const body = document.body;
      if (navigator.onLine) {
        body.style.filter = '';
      } else {
        //we are offline
        body.style.filter = 'grayscale(1)';
      }
    }
  }

}
