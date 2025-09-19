import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Heart, Leaf, Shield, Stethoscope, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SymptomCheckerProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  symptoms: string[];
  age: string;
  gender: string;
  duration: string;
  medicalHistory?: File;
}

const SymptomChecker = ({ onSubmit }: SymptomCheckerProps) => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [duration, setDuration] = useState("");
  const [medicalHistory, setMedicalHistory] = useState<File | null>(null);
  const { toast } = useToast();

  const commonSymptoms = [
    "Fever", "Headache", "Cough", "Sore throat", "Runny nose", "Body aches",
    "Fatigue", "Nausea", "Vomiting", "Diarrhea", "Chest pain", "Shortness of breath",
    "Dizziness", "Rash", "Joint pain", "Back pain", "Stomach pain", "Loss of appetite"
  ];

  const filteredSymptoms = commonSymptoms.filter(symptom =>
    symptom.toLowerCase().includes(currentSymptom.toLowerCase()) &&
    !symptoms.includes(symptom)
  );

  const addSymptom = (symptom: string) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      setCurrentSymptom("");
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      setMedicalHistory(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (symptoms.length === 0) {
      toast({
        title: "No symptoms selected",
        description: "Please add at least one symptom",
        variant: "destructive",
      });
      return;
    }

    if (!age || !gender) {
      toast({
        title: "Missing information",
        description: "Please fill in your age and gender",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      symptoms,
      age,
      gender,
      duration,
      medicalHistory: medicalHistory || undefined,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">
          Get Personalized Health Guidance
        </CardTitle>
        <CardDescription className="text-base">
          Enter your symptoms and get instant AI-powered suggestions with remedies, 
          precautions, and hospital recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Symptoms Input */}
          <div className="space-y-3">
            <Label htmlFor="symptoms" className="text-sm font-medium">
              Enter Symptoms *
            </Label>
            <div className="relative">
              <Input
                id="symptoms"
                value={currentSymptom}
                onChange={(e) => setCurrentSymptom(e.target.value)}
                placeholder="Type symptoms like 'fever', 'headache'..."
                className="pr-4"
              />
              {currentSymptom && filteredSymptoms.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-lg z-10 max-h-32 overflow-y-auto">
                  {filteredSymptoms.slice(0, 5).map((symptom) => (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => addSymptom(symptom)}
                      className="w-full text-left px-3 py-2 hover:bg-accent text-sm"
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {symptoms.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {symptoms.map((symptom) => (
                  <Badge key={symptom} variant="secondary" className="px-2 py-1">
                    {symptom}
                    <button
                      type="button"
                      onClick={() => removeSymptom(symptom)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Age and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="25"
                min="1"
                max="120"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={gender} onValueChange={setGender} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration of Symptoms</Label>
            <Textarea
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 2 days, 1 week, started this morning..."
              rows={2}
            />
          </div>

          {/* Medical History Upload */}
          <div className="space-y-2">
            <Label htmlFor="medical-history">Medical History (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              <input
                id="medical-history"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="medical-history" className="cursor-pointer">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Upload past medical reports (PDF, JPG, PNG, DOC)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Max file size: 10MB
                </p>
              </label>
              {medicalHistory && (
                <div className="mt-2 flex items-center justify-center">
                  <Badge variant="outline">
                    {medicalHistory.name}
                    <button
                      type="button"
                      onClick={() => setMedicalHistory(null)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-primary text-white hover:opacity-90 h-12 text-lg font-semibold"
          >
            Analyze Symptoms
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SymptomChecker;