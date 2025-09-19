import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Star, Navigation } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Hospitals = () => {
  const [city, setCity] = useState("");
  const [doctorType, setDoctorType] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { toast } = useToast();

  const doctorTypes = [
    "General Physician",
    "Cardiologist",
    "Dermatologist",
    "ENT Specialist",
    "Orthopedic",
    "Gynecologist",
    "Pediatrician",
    "Neurologist",
    "Psychiatrist",
    "Urologist",
    "Ophthalmologist",
    "Dentist"
  ];

  const handleSearch = () => {
    if (!city.trim() || !doctorType) {
      toast({
        title: "Missing information",
        description: "Please enter both city and doctor type",
        variant: "destructive",
      });
      return;
    }

    // Mock hospital data
    const mockHospitals = [
      {
        id: 1,
        name: "City General Hospital",
        address: "123 Main Street, " + city,
        phone: "+1 (555) 123-4567",
        rating: 4.5,
        distance: "2.3 km",
        availability: "Available Today",
        department: doctorType,
        features: ["Emergency Services", "ICU", "Parking Available", "Pharmacy"],
        timings: "24/7 Emergency | OPD: 9 AM - 6 PM"
      },
      {
        id: 2,
        name: "Metro Healthcare Center",
        address: "456 Healthcare Avenue, " + city,
        phone: "+1 (555) 234-5678",
        rating: 4.2,
        distance: "3.7 km",
        availability: "Next Available: Tomorrow",
        department: doctorType,
        features: ["Diagnostic Center", "Ambulance", "Insurance Accepted"],
        timings: "8 AM - 8 PM"
      },
      {
        id: 3,
        name: "Specialty Medical Institute",
        address: "789 Medical Plaza, " + city,
        phone: "+1 (555) 345-6789",
        rating: 4.8,
        distance: "5.1 km",
        availability: "Available Today",
        department: doctorType,
        features: ["Specialist Care", "Advanced Equipment", "Research Center"],
        timings: "9 AM - 5 PM"
      }
    ];

    setSearchResults(mockHospitals);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Find Hospitals & Doctors
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search for hospitals and doctors in your city based on specialization
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-2xl mx-auto shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Hospital Search
            </CardTitle>
            <CardDescription>
              Enter your city and the type of doctor you need
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* City Input */}
              <div className="space-y-2">
                <Label htmlFor="city">Your City *</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g., Mumbai, Delhi, Bangalore..."
                  required
                />
              </div>

              {/* Doctor Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="doctor-type">Doctor Type *</Label>
                <Select value={doctorType} onValueChange={setDoctorType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor type" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctorTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleSearch}
              className="w-full bg-gradient-primary text-white hover:opacity-90 h-12"
            >
              Search Hospitals
            </Button>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {searchResults.length} Hospitals Found
              </h2>
              <p className="text-muted-foreground">
                {doctorType} specialists in {city}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {searchResults.map((hospital) => (
                <Card key={hospital.id} className="shadow-card hover:shadow-hover transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      {/* Hospital Info */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {hospital.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-medium">{hospital.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Navigation className="h-4 w-4" />
                              <span>{hospital.distance}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{hospital.address}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{hospital.phone}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{hospital.timings}</span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {hospital.features.map((feature: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        {/* Department & Availability */}
                        <div className="flex flex-wrap items-center gap-4">
                          <Badge variant="outline" className="border-primary text-primary">
                            {hospital.department}
                          </Badge>
                          <Badge 
                            variant={hospital.availability.includes("Today") ? "default" : "secondary"}
                            className={hospital.availability.includes("Today") ? "bg-secondary text-white" : ""}
                          >
                            {hospital.availability}
                          </Badge>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 lg:w-48">
                        <Button className="bg-gradient-primary text-white hover:opacity-90">
                          Book Appointment
                        </Button>
                        <Button variant="outline">
                          Get Directions
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" className="px-8">
                Load More Hospitals
              </Button>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {city && doctorType && searchResults.length === 0 && (
          <Card className="max-w-2xl mx-auto text-center p-8">
            <CardContent>
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No results yet
              </h3>
              <p className="text-muted-foreground">
                Click "Search Hospitals" to find {doctorType} specialists in {city}
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Hospitals;