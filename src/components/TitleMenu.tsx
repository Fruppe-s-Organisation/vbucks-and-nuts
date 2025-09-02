import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, User, Sparkles } from "lucide-react";

interface TitleMenuProps {
  onLoginSelect: (type: "admin" | "user") => void;
}

export const TitleMenu = ({ onLoginSelect }: TitleMenuProps) => {
  return (
    <div className="min-h-screen bg-futuristic-bg relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-futuristic-glow rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 bg-futuristic-surface rounded-full flex items-center justify-center border border-futuristic-primary/30 mr-4"
              >
                <span className="text-3xl font-bold text-futuristic-glow">F</span>
              </motion.div>
              <Sparkles className="w-8 h-8 text-futuristic-accent animate-pulse" />
            </div>
            
            <h1 className="text-6xl font-bold text-white mb-4">
              Fruppe's Org
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced Business Management System - Choose your access level to continue
            </p>
          </motion.div>

          {/* Login Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Admin Login */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-futuristic-surface border-futuristic-primary/30 p-8 hover:shadow-neon transition-all duration-300 cursor-pointer group"
                    onClick={() => onLoginSelect("admin")}>
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 0px hsl(180 100% 50% / 0)",
                      "0 0 20px hsl(180 100% 50% / 0.3)",
                      "0 0 0px hsl(180 100% 50% / 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-16 h-16 bg-futuristic-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-futuristic-primary/30 transition-colors"
                >
                  <Shield className="w-8 h-8 text-futuristic-glow" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Admin Access</h3>
                <p className="text-muted-foreground mb-6">
                  Full system control with analytics, reports, and management tools
                </p>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full border-futuristic-primary/50 text-futuristic-glow hover:bg-futuristic-primary/10 hover:border-futuristic-primary transition-all"
                >
                  Enter Dashboard
                </Button>
              </Card>
            </motion.div>

            {/* User Login */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-futuristic-surface border-futuristic-secondary/30 p-8 hover:shadow-neon transition-all duration-300 cursor-pointer group"
                    onClick={() => onLoginSelect("user")}>
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 0px hsl(270 100% 70% / 0)",
                      "0 0 20px hsl(270 100% 70% / 0.3)",
                      "0 0 0px hsl(270 100% 70% / 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="w-16 h-16 bg-futuristic-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-futuristic-secondary/30 transition-colors"
                >
                  <User className="w-8 h-8 text-futuristic-secondary" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4">User Access</h3>
                <p className="text-muted-foreground mb-6">
                  Access to business services and customer tools
                </p>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full border-futuristic-secondary/50 text-futuristic-secondary hover:bg-futuristic-secondary/10 hover:border-futuristic-secondary transition-all"
                >
                  Browse Services
                </Button>
              </Card>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground">
              © 2024 Fruppe's Org. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Developed by Fruppe's Org with partial assistance from AI (Lovable + OpenAI)
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};