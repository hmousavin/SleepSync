import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Music, Heart } from "lucide-react"

type SoundCategory = "nature" | "ambient" | "music"

type Sound = {
  id: number
  name: string
  category: SoundCategory
  isFavorite: boolean
}

const sounds: Sound[] = [
  { id: 1, name: "Rain", category: "nature", isFavorite: true },
  { id: 2, name: "Ocean Waves", category: "nature", isFavorite: false },
  { id: 3, name: "White Noise", category: "ambient", isFavorite: true },
  { id: 4, name: "Soft Piano", category: "music", isFavorite: false },
]

export function SleepSounds() {
  const [selectedCategory, setSelectedCategory] = useState<SoundCategory | "all">("all")
  const [playingSound, setPlayingSound] = useState<number | null>(null)

  const filteredSounds =
    selectedCategory === "all" ? sounds : sounds.filter((sound) => sound.category === selectedCategory)

  const togglePlay = (id: number) => {
    setPlayingSound(playingSound === id ? null : id)
  }

  const toggleFavorite = (id: number) => {
    // In a real app, you'd update this in your backend
    console.log(`Toggled favorite for sound ${id}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleep Sounds</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </Button>
          <Button
            variant={selectedCategory === "nature" ? "default" : "outline"}
            onClick={() => setSelectedCategory("nature")}
          >
            Nature
          </Button>
          <Button
            variant={selectedCategory === "ambient" ? "default" : "outline"}
            onClick={() => setSelectedCategory("ambient")}
          >
            Ambient
          </Button>
          <Button
            variant={selectedCategory === "music" ? "default" : "outline"}
            onClick={() => setSelectedCategory("music")}
          >
            Music
          </Button>
        </div>
        {filteredSounds.map((sound) => (
          <div key={sound.id} className="flex items-center justify-between mb-4">
            <span>{sound.name}</span>
            <div>
              <Button variant="ghost" size="icon" onClick={() => toggleFavorite(sound.id)}>
                <Heart className={`h-4 w-4 ${sound.isFavorite ? "fill-primary" : ""}`} />
              </Button>
              <Button
                variant={playingSound === sound.id ? "default" : "outline"}
                size="icon"
                onClick={() => togglePlay(sound.id)}
              >
                <Music className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

