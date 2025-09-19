import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle } from "lucide-react";
import logo from "@/assets/cura-gennie-logo.png";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src={logo} 
                alt="Cura Gennie Logo" 
                className="h-10 w-10 rounded-lg"
              />
              <div>
                <h3 className="text-lg font-bold text-foreground">Cura Gennie</h3>
                <p className="text-sm text-muted-foreground">Your health buddy</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Get personalized health guidance with AI-powered symptom analysis, 
              Ayurvedic remedies, and medical consultation suggestions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/medicine" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Medicine Checker
              </Link>
              <Link 
                to="/hospitals" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Find Hospitals
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Legal
            </h3>
            <div className="space-y-2">
              <Link 
                to="/about" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link 
                to="/privacy" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <Separator />

        {/* Important Disclaimer */}
        <div className="py-6">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-destructive mb-1">Medical Disclaimer</p>
                <p className="text-muted-foreground">
                  Cura Gennie is for informational purposes only. Always consult a qualified 
                  doctor before taking medical decisions. This platform does not replace 
                  professional medical advice, diagnosis, or treatment.
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Cura Gennie. All rights reserved. 
              Your trusted health companion.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;