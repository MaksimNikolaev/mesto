import { photoFull, photoCaption } from '../pages/index.js'
import Popup from '../components/Popup.js'

export default class PopupWithImage extends Popup {
  open(title, link) {
    photoFull.src = link;
    photoCaption.textContent = title;
    photoFull.alt = title;
    super.open();
  }
}
