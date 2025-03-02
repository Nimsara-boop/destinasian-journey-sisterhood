
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface PodcastType {
  title: string;
  host: string;
  duration: string;
  image: string;
}

interface PodcastSectionProps {
  podcasts: PodcastType[];
  currentAudio: number | null;
  isPlaying: boolean;
  onPlayPodcast: (index: number) => void;
}

const PodcastSection = ({ podcasts, currentAudio, isPlaying, onPlayPodcast }: PodcastSectionProps) => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Travel Podcasts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Listen to stories and advice from experienced women travelers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {podcasts.map((podcast, index) => (
            <div key={index} className="podcast-player">
              <div className="flex gap-4 items-center mb-4">
                <div 
                  className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0" 
                  style={{ backgroundImage: `url(${podcast.image})` }}
                />
                <div>
                  <h3 className="font-semibold">{podcast.title}</h3>
                  <p className="text-sm text-gray-500">By {podcast.host}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{podcast.duration}</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="rounded-full w-10 h-10 p-0"
                  onClick={() => onPlayPodcast(index)}
                >
                  {currentAudio === index && isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
