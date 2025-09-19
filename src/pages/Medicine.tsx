import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Search, Upload, Pill, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Medicine = () => {
  const [medicineName, setMedicineName] = useState("");
  const [medicineImage, setMedicineImage] = useState<File | null>(null);
  const [searchResults, setSearchResults] = useState<any>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      setMedicineImage(file);
    }
  };

  const handleSearch = () => {
    if (!medicineName.trim() && !medicineImage) {
      toast({
        title: "No input provided",
        description: "Please enter a medicine name or upload an image",
        variant: "destructive",
      });
      return;
    }

    // Mock medicine information
    const mockMedicineInfo = {
      name: medicineName || "Paracetamol",
      genericName: "Acetaminophen",
      category: "Pain Reliever & Fever Reducer",
      uses: [
        "Relief from mild to moderate pain",
        "Reduction of fever",
        "Headache relief",
        "Body aches and muscle pain"
      ],
      dosage: {
        adults: "500-1000mg every 4-6 hours (max 4000mg/day)",
        children: "10-15mg/kg every 4-6 hours"
      },
      sideEffects: [
        "Nausea (rare)",
        "Skin rash (allergic reaction)",
        "Liver damage (overdose)"
      ],
      precautions: [
        "Do not exceed recommended dose",
        "Avoid alcohol while taking this medication",
        "Consult doctor if symptoms persist",
        "Not recommended for patients with liver disease"
      ],
      interactions: [
        "Warfarin (blood thinner)",
        "Alcohol",
        "Other paracetamol-containing medications"
      ]
    };

    setSearchResults(mockMedicineInfo);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Medicine Information
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search for medicine information by name or upload a photo of your medicine
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-2xl mx-auto shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-primary" />
              Medicine Lookup
            </CardTitle>
            <CardDescription>
              Enter the medicine name or upload a clear photo of the medicine
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Medicine Name Input */}
            <div className="space-y-2">
              <Label htmlFor="medicine-name">Medicine Name</Label>
              <div className="relative">
                <Input
                  id="medicine-name"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  placeholder="e.g., Paracetamol, Aspirin, Amoxicillin..."
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="text-center text-muted-foreground">
              <span className="text-sm">OR</span>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="medicine-image">Upload Medicine Photo</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  id="medicine-image"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="medicine-image" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Click to upload medicine photo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPG, JPEG or PNG (max 10MB)
                  </p>
                </label>
                {medicineImage && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-primary">
                      {medicineImage.name}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Button 
              onClick={handleSearch}
              className="w-full bg-gradient-primary text-white hover:opacity-90 h-12"
            >
              Search Medicine
            </Button>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Medicine Overview */}
            <Card className="shadow-card">
              <CardHeader className="bg-gradient-hero">
                <CardTitle className="text-primary">{searchResults.name}</CardTitle>
                <CardDescription className="text-base">
                  Generic Name: {searchResults.genericName} | Category: {searchResults.category}
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Uses */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-secondary">Uses & Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {searchResults.uses.map((use: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{use}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Dosage */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-primary">Dosage Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Adults</h4>
                    <p className="text-sm text-muted-foreground">{searchResults.dosage.adults}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Children</h4>
                    <p className="text-sm text-muted-foreground">{searchResults.dosage.children}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Side Effects */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-orange-600">Possible Side Effects</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {searchResults.sideEffects.map((effect: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{effect}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Precautions */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-destructive">Precautions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {searchResults.precautions.map((precaution: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{precaution}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Drug Interactions */}
            <Card className="shadow-card border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Drug Interactions
                </CardTitle>
                <CardDescription>
                  This medicine may interact with the following substances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {searchResults.interactions.map((interaction: string, index: number) => (
                    <div key={index} className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <p className="text-sm font-medium text-destructive">{interaction}</p>
                    </div>
                  ))}
                </div>
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
                      This information is for educational purposes only and should not replace 
                      professional medical advice. Always consult your doctor or pharmacist 
                      before taking any medication.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Medicine;