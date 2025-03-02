
import { Shield, MapPin, Globe } from "lucide-react";

interface SafetySectionProps {
  safetyTips: string[];
}

const SafetySection = ({ safetyTips }: SafetySectionProps) => {
  return (
    <section className="py-20 px-4 bg-muted-feminine">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Travel Safety & Advice</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Essential tips for women travelers exploring Asia
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="location-advice">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-primary-feminine" />
              <h3 className="text-xl font-serif">Safety Tips</h3>
            </div>
            <ul className="space-y-4">
              {safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary-feminine text-lg">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="location-advice">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-8 h-8 text-primary-feminine" />
              <h3 className="text-xl font-serif">Interactive Destination Guide</h3>
            </div>
            <p className="mb-4">Explore our interactive map with location-specific advice for women travelers.</p>
            <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
              <Globe className="w-16 h-16 text-gray-300 animate-soft-bounce" />
              <span className="ml-4 text-gray-500">Interactive map loading...</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
