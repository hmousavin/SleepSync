import { useState } from "react";

interface SoundElementProps {
    title: string;
    imageUrl?: string;
    imageName?: string;
    soundUrl?: string;
}

const DEFAULT_IMAGE = "https://via.placeholder.com/150";
const DEFAULT_SOUND = "https://www.soundjay.com/button/beep-07.wav";

const SoundElement = ({ title, imageUrl = DEFAULT_IMAGE, imageName = "default", soundUrl = DEFAULT_SOUND }: SoundElementProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio] = useState(new Audio(soundUrl));

    const handleToggleSound = () => {
        if (isPlaying) {
            audio.pause();
            audio.currentTime = 0;
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="relative bg-amber-100 w-52 h-52 flex items-center justify-center cursor-pointer border rounded-lg shadow-lg overflow-hidden" onClick={handleToggleSound}>
            <img src={imageUrl} alt={imageName} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
                {title} {isPlaying ? '🔊' : '🔈'}
            </div>
        </div>
    );
};

const AlarmSounds = () => {
    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            <SoundElement title="Sunrise Serenade" />
            <SoundElement title="Morning Melody" />
            <SoundElement title="Birdsong Bliss" />
            <SoundElement title="Ocean Breeze" />
            <SoundElement title="Forest Harmony" />
            <SoundElement title="Dreamy Bells" />
        </div>
    );
};

export default AlarmSounds;