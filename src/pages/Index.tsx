import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Nut } from 'lucide-react';
import FortniteBusiness from '@/components/FortniteBusiness';
import GroundnutBusiness from '@/components/GroundnutBusiness';

const Index = () => {
  const [activeTab, setActiveTab] = useState('fortnite');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
            Business Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your Fortnite V-Bucks and Groundnut businesses in one place
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
            <TabsTrigger 
              value="fortnite" 
              className="flex items-center gap-2 text-base data-[state=active]:bg-gradient-gaming data-[state=active]:text-white"
            >
              <Gamepad2 className="h-5 w-5" />
              Fortnite V-Bucks
            </TabsTrigger>
            <TabsTrigger 
              value="groundnut" 
              className="flex items-center gap-2 text-base data-[state=active]:bg-gradient-business data-[state=active]:text-white"
            >
              <Nut className="h-5 w-5" />
              Groundnut Business
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fortnite" className="animate-fade-in">
            <FortniteBusiness />
          </TabsContent>

          <TabsContent value="groundnut" className="animate-fade-in">
            <GroundnutBusiness />
          </TabsContent>
        </Tabs>

        {/* Quick Overview Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-gaming-primary/20 hover:shadow-gaming transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 text-gaming-primary" />
                Fortnite V-Bucks
              </CardTitle>
              <CardDescription>
                Digital gaming currency sales with subscription management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>V-Buck Packages:</span>
                  <span className="font-medium">4 variants</span>
                </div>
                <div className="flex justify-between">
                  <span>Crew Subscriptions:</span>
                  <span className="font-medium">Monthly billing</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Reminders:</span>
                  <span className="font-medium">Automated</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-business-primary/20 hover:shadow-business transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Nut className="h-5 w-5 text-business-primary" />
                Groundnut Business
              </CardTitle>
              <CardDescription>
                Traditional food business with production and sales tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Daily Sales:</span>
                  <span className="font-medium">KSH 100/packet</span>
                </div>
                <div className="flex justify-between">
                  <span>Debt Tracking:</span>
                  <span className="font-medium">Customer management</span>
                </div>
                <div className="flex justify-between">
                  <span>Analytics:</span>
                  <span className="font-medium">Trend graphs</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-muted-foreground">
          <p>Business Dashboard - Manage both your digital and traditional businesses efficiently</p>
        </div>
      </div>
    </div>
  );
};

export default Index;