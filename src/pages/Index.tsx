import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SymptomChecker from "@/components/SymptomChecker";
import ResultsDisplay from "@/components/ResultsDisplay";
import FeaturesCarousel from "@/components/FeaturesCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import heroImage from "@/assets/healthcare-hero.jpg";

interface FormData {
  symptoms: string[];
  age: string;
  gender: string;
  duration: string;
  medicalHistory?: File;
}

const Index = () => {
  const [analysisResults, setAnalysisResults] = useState<FormData | null>(null);

  const handleFormSubmit = (data: FormData) => {
    setAnalysisResults(data);
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const resetAnalysis = () => {
    setAnalysisResults(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Your Trusted
                  <span className="text-primary block">Health Buddy</span>
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground max-w-xl">
                  Get instant AI-powered health guidance with personalized symptom analysis, 
                  Ayurvedic remedies, and professional medical recommendations.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary text-white hover:opacity-90 text-base px-8"
                  onClick={() => document.getElementById('symptom-checker')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Health Check
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-base px-8"
                >
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-secondary" />
                <span>Trusted by thousands • AI-powered • Medically reviewed</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage}
                  alt="Healthcare professionals and patients in modern medical facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Trusted Care</p>
                    <p className="text-xs text-muted-foreground">24/7 Health Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Symptom Checker Section */}
      <section id="symptom-checker" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!analysisResults ? (
            <SymptomChecker onSubmit={handleFormSubmit} />
          ) : (
            <div id="results" className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Your Health Analysis
                </h2>
                <Button 
                  onClick={resetAnalysis}
                  variant="outline"
                  className="mb-8"
                >
                  Start New Analysis
                </Button>
              </div>
              <ResultsDisplay data={analysisResults} />
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      {!analysisResults && (
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturesCarousel />
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Index;
