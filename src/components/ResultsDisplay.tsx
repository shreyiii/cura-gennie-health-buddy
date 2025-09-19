import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Heart, Leaf, Shield, Stethoscope, MapPin } from "lucide-react";

interface ResultsDisplayProps {
  data: {
    symptoms: string[];
    age: string;
    gender: string;
    duration: string;
  };
}

const ResultsDisplay = ({ data }: ResultsDisplayProps) => {
  // Mock AI analysis results based on symptoms
  const mockResults = {
    diseases: [
      {
        name: "Common Cold",
        probability: "High",
        description: "Viral infection affecting the upper respiratory tract"
      },
      {
        name: "Seasonal Flu",
        probability: "Medium",
        description: "Influenza virus causing respiratory symptoms"
      },
      {
        name: "Allergic Rhinitis",
        probability: "Low",
        description: "Allergic reaction causing nasal congestion"
      }
    ],
    ayurvedicRemedies: [
      "Turmeric milk with honey before bedtime",
      "Ginger tea with lemon and honey 2-3 times daily",
      "Steam inhalation with eucalyptus oil",
      "Tulsi (Holy basil) leaves with warm water"
    ],
    homeRemedies: [
      "Stay hydrated - drink plenty of warm water",
      "Get adequate rest (7-8 hours of sleep)",
      "Gargle with warm salt water",
      "Use a humidifier to keep air moist",
      "Consume warm soups and broths"
    ],
    precautions: [
      "Avoid contact with other people to prevent spread",
      "Cover mouth and nose when coughing or sneezing",
      "Wash hands frequently with soap",
      "Avoid cold drinks and ice cream",
      "Stay indoors and rest"
    ],
    consultation: {
      doctorType: "General Physician",
      urgency: "Non-urgent",
      recommendation: "Consult if symptoms persist beyond 7 days or worsen"
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Summary */}
      <Card className="bg-gradient-hero border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Stethoscope className="h-5 w-5" />
            Analysis Summary
          </CardTitle>
          <CardDescription>
            Based on your symptoms: {data.symptoms.join(", ")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Age:</span> {data.age} years
            </div>
            <div>
              <span className="font-medium">Gender:</span> {data.gender}
            </div>
            <div>
              <span className="font-medium">Duration:</span> {data.duration || "Not specified"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Possible Diseases */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Possible Conditions
          </CardTitle>
          <CardDescription>
            AI-generated possibilities based on your symptoms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockResults.diseases.map((disease, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
              <div className="flex-1">
                <h4 className="font-semibold">{disease.name}</h4>
                <p className="text-sm text-muted-foreground">{disease.description}</p>
              </div>
              <Badge 
                variant={disease.probability === "High" ? "destructive" : 
                        disease.probability === "Medium" ? "default" : "secondary"}
              >
                {disease.probability}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Ayurvedic Remedies */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-secondary">
            <Leaf className="h-5 w-5" />
            Ayurvedic Remedies
          </CardTitle>
          <CardDescription>
            Natural medicines and traditional treatments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {mockResults.ayurvedicRemedies.map((remedy, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">{remedy}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Home Remedies */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Heart className="h-5 w-5" />
            Home Remedies
          </CardTitle>
          <CardDescription>
            Simple household cures and self-care tips
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {mockResults.homeRemedies.map((remedy, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">{remedy}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Precautions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <Shield className="h-5 w-5" />
            Precautions
          </CardTitle>
          <CardDescription>
            Important safety measures to follow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {mockResults.precautions.map((precaution, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">{precaution}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Medical Consultation */}
      <Card className="shadow-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <MapPin className="h-5 w-5" />
            Medical Consultation
          </CardTitle>
          <CardDescription>
            Professional medical advice recommendation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-accent/50">
              <h4 className="font-semibold text-sm">Recommended Doctor</h4>
              <p className="text-lg font-medium text-primary">{mockResults.consultation.doctorType}</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/50">
              <h4 className="font-semibold text-sm">Urgency Level</h4>
              <p className="text-lg font-medium text-secondary">{mockResults.consultation.urgency}</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-gradient-hero">
            <p className="text-sm font-medium">{mockResults.consultation.recommendation}</p>
          </div>
          <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
            Find Nearby Hospitals
          </Button>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-destructive mb-1">Important Disclaimer</p>
              <p className="text-muted-foreground">
                This is an AI-generated analysis for informational purposes only. 
                Please consult a qualified doctor for proper diagnosis and treatment. 
                Do not use this as a substitute for professional medical advice.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;