import strengthLogo from "../assets/dumbbell.png"
import cardioLogo from "../assets/cardio.png"
import stretchLogo from "../assets/stretch.png"
import coreLogo from "../assets/core.png"

// This generates "Browse By Type" name & images.
const browseData = [
    {
        "type":"Strength",
        "image":strengthLogo
    },
    {
        "type":"Cardio",
        "image":cardioLogo
    },
    {
        "type":"Core",
        "image":coreLogo
    },
    {
        "type":"Stretch",
        "image":stretchLogo
    }
]

export default function getBrowseData() {
    return browseData;
  }