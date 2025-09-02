import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Gamepad2, Leaf, Plus, Star, TrendingUp } from "lucide-react";

interface UserServiceSelectionProps {
  onServiceSelect: (service: string) => void;
  onBack: () => void;
}

const services = [
  {
    id: "fortnite",
    title: "Fortnite V-Bucks",
    description: "Premium gaming currency and battle pass subscriptions",
    icon: Gamepad2,
    color: "gaming",
    status: "Active",
    image: "🎮",
    stats: { customers: 245, revenue: "$12,450" }
  },
  {
    id: "groundnuts",
    title: "Groundnut Business",
    description: "Fresh roasted groundnuts and snack distribution",
    icon: Leaf,
    color: "business",
    status: "Active", 
    image: "🥜",
    stats: { customers: 180, revenue: "$8,200" }
  },
  {
    id: "future1",
    title: "Coming Soon",
    description: "New business opportunity in development",
    icon: Plus,
    color: "futuristic",
    status: "Coming Soon",
    image: "⭐",
    stats: { customers: 0, revenue: "$0" }
  },
  {
    id: "future2", 
    title: "Future Service",
    description: "Planned expansion into new markets",
    icon: Star,
    color: "futuristic",
    status: "Planned",
    image: "🚀",
    stats: { customers: 0, revenue: "$0" }
  }
];

export const UserServiceSelection = ({ onServiceSelect, onBack }: UserServiceSelectionProps) => {
  const getCardStyles = (service: any) => {
    switch (service.color) {
      case "gaming":
        return "bg-futuristic-surface border-gaming-primary/30 hover:shadow-gaming";
      case "business":
        return "bg-futuristic-surface border-business-primary/30 hover:shadow-business";
      default:
        return "bg-futuristic-surface border-futuristic-primary/30 hover:shadow-futuristic";
    }
  };

  const getIconColor = (service: any) => {
    switch (service.color) {
      case "gaming":
        return "text-gaming-primary";
      case "business":
        return "text-business-primary";
      default:
        return "text-futuristic-glow";
    }
  };

  return (
    <div className="min-h-screen bg-futuristic-bg">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-futuristic-glow/20 rounded-full"
            animate={{
              x: [0, window.innerWidth],
              y: [0, window.innerHeight],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-futuristic-glow hover:bg-futuristic-surface"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
            
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">Service Selection</h1>
              <p className="text-muted-foreground mt-2">Choose a business service to access</p>
            </div>
            
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className={`${getCardStyles(service)} transition-all duration-300 cursor-pointer group h-full ${
                    service.status === "Active" ? "" : "opacity-70"
                  }`}
                  onClick={() => service.status === "Active" && onServiceSelect(service.id)}
                >
                  {/* Service Image/Icon */}
                  <div className="relative p-6 pb-0">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{service.image}</div>
                      <motion.div
                        animate={service.status === "Active" ? {
                          boxShadow: [
                            "0 0 0px hsl(180 100% 50% / 0)",
                            "0 0 20px hsl(180 100% 50% / 0.3)",
                            "0 0 0px hsl(180 100% 50% / 0)"
                          ]
                        } : {}}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-12 h-12 mx-auto bg-futuristic-primary/20 rounded-full flex items-center justify-center group-hover:bg-futuristic-primary/30 transition-colors"
                      >
                        <service.icon className={`w-6 h-6 ${getIconColor(service)}`} />
                      </motion.div>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="outline"
                        className={`${
                          service.status === "Active"
                            ? "border-green-500/50 text-green-400"
                            : "border-yellow-500/50 text-yellow-400"
                        }`}
                      >
                        {service.status}
                      </Badge>
                      {service.status === "Active" && (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <CardTitle className="text-white text-lg">{service.title}</CardTitle>
                    <CardDescription className="text-sm">{service.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    {service.status === "Active" ? (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Customers</span>
                          <span className="text-white font-medium">{service.stats.customers}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Revenue</span>
                          <span className={`font-medium ${getIconColor(service)}`}>
                            {service.stats.revenue}
                          </span>
                        </div>
                        <Button
                          className="w-full mt-4"
                          variant="outline"
                          size="sm"
                        >
                          Access Service
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm text-muted-foreground mb-3">
                          {service.status === "Coming Soon" 
                            ? "This service is in development" 
                            : "This service is planned for future release"
                          }
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="w-full"
                        >
                          {service.status === "Coming Soon" ? "Notify Me" : "Learn More"}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12"
          >
            <Card className="bg-futuristic-surface border-futuristic-primary/30">
              <CardHeader>
                <CardTitle className="text-white text-center">Business Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-futuristic-glow">425</div>
                    <p className="text-sm text-muted-foreground">Total Customers</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-business-primary">$20,650</div>
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gaming-primary">2</div>
                    <p className="text-sm text-muted-foreground">Active Services</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
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
  );
};