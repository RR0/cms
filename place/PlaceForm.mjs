export class PlaceMap {
  currentAddress
  mapEl
  currentPlaceEl

  constructor () {
    const mapToggle = document.querySelector(".map-toggle .toggle")

    document.addEventListener("DOMContentLoaded", () => {
      this.mapEl = document.querySelector("#map-canvas")
      this.currentPlaceEl = document.querySelector(".plac")
      if (this.currentPlaceEl) {
        mapToggle.style.display = "inline-block"
      }
    })

    mapToggle.addEventListener("click", (event) => {
      this.show(event, currentAddress, !hasMap())
    })
    document.body.addEventListener("click", (event) => {
      if (this.isShown()) {
        this.show(event, this.currentAddress, false)
      }
    })
  }

  isShown () {
    return document.body.classList.contains("with-map")
  }

  /**
   * Affiche/masque la carte.
   *
   * @param event L'événement de clic.
   * @param address L'adresse à afficher sur la carte (si mode == "place") ou juste le texte du lien ("si mode ==
   * "streetview")
   * @param {boolean} display true to display the map, false to hide it.
   * @param {"place" | "streetview"} mode
   */
  show (event, address, display = true, mode = "place") {
    event.stopPropagation()
    document.body.classList.toggle("with-map", display)
    if (!address) {
      address = currentPlaceEl?.textContent
    }
    if (address !== currentAddress) {
      this.currentAddress = address
      let qs
      switch (mode) {
        case "streetview":
          qs = address
          break
        default:
          qs = `q=${address}&maptype=satellite`
      }
      mapEl.querySelector("iframe").src =
        `https://www.google.com/maps/embed/v1/${mode}?${qs}&key=${mapsApiKey}`
    }
  }
}
