import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Brain, Users, Leaf, Clock } from "lucide-react";

const FeaturesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: Brain,
      title: "AI Powered Diagnosis",
      description: "Advanced artificial intelligence analyzes your symptoms to provide accurate health insights and recommendations.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Connect with qualified doctors and healthcare professionals for personalized medical advice and treatment.",
      color: "text-secondary"
    },
    {
      icon: Leaf,
      title: "Ayurveda + Modern Care",
      description: "Combining traditional Ayurvedic wisdom with modern medical practices for holistic health solutions.",
      color: "text-green-600"
    },
    {
      icon: Clock,
      title: "Trusted Guidance Anytime",
      description: "24/7 access to health guidance, symptom checking, and medical recommendations whenever you need them.",
      color: "text-blue-600"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Why Choose Cura Gennie?
        </h2>
        <p className="text-muted-foreground">
          Discover the features that make us your trusted health companion
        </p>
      </div>

      <div className="relative">
        {/* Main Carousel */}
        <div className="overflow-hidden rounded-xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index}
                  className="w-full flex-shrink-0 shadow-card border-primary/10"
                >
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-full bg-gradient-hero">
                        <IconComponent className={`h-12 w-12 ${feature.color}`} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm shadow-md hover:shadow-lg"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm shadow-md hover:shadow-lg"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSlide 
                  ? "bg-primary" 
                  : "bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Feature Grid for Desktop */}
      <div className="hidden lg:block mt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="text-center p-6 hover:shadow-hover transition-shadow duration-300 cursor-pointer group"
                onClick={() => setCurrentSlide(index)}
              >
                <CardContent className="p-0">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-hero group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`h-8 w-8 ${feature.color}`} />
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturesCarousel;