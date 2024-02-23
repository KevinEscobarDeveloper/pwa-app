import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }

  setTitle(title: string) {
    if (typeof document !== 'undefined') {
      document.title = title;
    }
  }

  setThemeColor(color: string) {
    if (typeof document !== 'undefined') {
      const meta = document.querySelector("meta[name=theme-color]") as HTMLMetaElement;
      if (meta) {
        meta.content = color;
      }
    }
  }
}

