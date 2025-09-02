import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Edit, Plus, Bell, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface VBuckPackage {
  id: string;
  name: string;
  vbucks: number;
  price: number;
  sales: number;
}

interface CrewSubscription {
  id: string;
  customerName: string;
  email: string;
  startDate: string;
  nextPayment: string;
  isPaid: boolean;
  price: number;
}

const FortniteBusiness = () => {
  const { toast } = useToast();
  const [packages, setPackages] = useState<VBuckPackage[]>([
    { id: '1', name: '1,000 V-Bucks', vbucks: 1000, price: 800, sales: 0 },
    { id: '2', name: '2,800 V-Bucks', vbucks: 2800, price: 2000, sales: 0 },
    { id: '3', name: '5,000 V-Bucks', vbucks: 5000, price: 3500, sales: 0 },
    { id: '4', name: '13,500 V-Bucks', vbucks: 13500, price: 8000, sales: 0 },
  ]);

  const [crewSubscriptions, setCrewSubscriptions] = useState<CrewSubscription[]>([]);
  const [editingPackage, setEditingPackage] = useState<VBuckPackage | null>(null);
  const [newCrewMember, setNewCrewMember] = useState({
    customerName: '',
    email: '',
    price: 800,
  });

  // Load data from localStorage
  useEffect(() => {
    const savedPackages = localStorage.getItem('fortnite-packages');
    const savedCrew = localStorage.getItem('fortnite-crew');
    
    if (savedPackages) {
      setPackages(JSON.parse(savedPackages));
    }
    if (savedCrew) {
      setCrewSubscriptions(JSON.parse(savedCrew));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('fortnite-packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('fortnite-crew', JSON.stringify(crewSubscriptions));
  }, [crewSubscriptions]);

  const handleSale = (packageId: string) => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === packageId ? { ...pkg, sales: pkg.sales + 1 } : pkg
    ));
    
    const pkg = packages.find(p => p.id === packageId);
    toast({
      title: "Sale Recorded!",
      description: `Sold ${pkg?.name} for KSH ${pkg?.price}`,
    });
  };

  const updatePackagePrice = (packageData: VBuckPackage) => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === packageData.id ? packageData : pkg
    ));
    setEditingPackage(null);
    toast({
      title: "Price Updated",
      description: `${packageData.name} price updated to KSH ${packageData.price}`,
    });
  };

  const addCrewMember = () => {
    if (!newCrewMember.customerName || !newCrewMember.email) return;
    
    const subscription: CrewSubscription = {
      id: Date.now().toString(),
      customerName: newCrewMember.customerName,
      email: newCrewMember.email,
      startDate: new Date().toISOString(),
      nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      isPaid: true,
      price: newCrewMember.price,
    };

    setCrewSubscriptions(prev => [...prev, subscription]);
    setNewCrewMember({ customerName: '', email: '', price: 800 });
    
    toast({
      title: "Crew Member Added",
      description: `${subscription.customerName} added to Fortnite Crew`,
    });
  };

  const markPayment = (subscriptionId: string, paid: boolean) => {
    setCrewSubscriptions(prev => prev.map(sub => {
      if (sub.id === subscriptionId) {
        const updated = { ...sub, isPaid: paid };
        if (paid) {
          // Extend next payment by 30 days
          updated.nextPayment = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
        }
        return updated;
      }
      return sub;
    }));
    
    toast({
      title: paid ? "Payment Received" : "Payment Pending",
      description: paid ? "Subscription extended for 30 days" : "Marked as unpaid",
    });
  };

  const getDaysUntilPayment = (nextPayment: string) => {
    const days = Math.ceil((new Date(nextPayment).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const totalRevenue = packages.reduce((sum, pkg) => sum + (pkg.sales * pkg.price), 0) + 
                      crewSubscriptions.filter(sub => sub.isPaid).length * 800;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Badge variant="secondary">KSH</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gaming-primary">{totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crew Members</CardTitle>
            <Users className="h-4 w-4 text-gaming-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gaming-primary">{crewSubscriptions.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total V-Buck Sales</CardTitle>
            <Badge variant="secondary">Packages</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gaming-primary">
              {packages.reduce((sum, pkg) => sum + pkg.sales, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* V-Bucks Packages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-gaming rounded-full"></div>
            V-Bucks Packages
          </CardTitle>
          <CardDescription>Manage your V-Bucks packages and track sales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {packages.map((pkg) => (
              <div key={pkg.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gaming-primary">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground">{pkg.vbucks.toLocaleString()} V-Bucks</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setEditingPackage(pkg)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Package Price</DialogTitle>
                        <DialogDescription>Update the price for {pkg.name}</DialogDescription>
                      </DialogHeader>
                      {editingPackage && (
                        <div className="space-y-4">
                          <div>
                            <Label>Price (KSH)</Label>
                            <Input
                              type="number"
                              value={editingPackage.price}
                              onChange={(e) => setEditingPackage({
                                ...editingPackage,
                                price: parseInt(e.target.value) || 0
                              })}
                            />
                          </div>
                          <Button 
                            variant="gaming" 
                            onClick={() => updatePackagePrice(editingPackage)}
                            className="w-full"
                          >
                            Update Price
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="text-lg font-bold">KSH {pkg.price.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Sales: {pkg.sales}</div>
                
                <Button 
                  variant="gaming" 
                  size="sm" 
                  onClick={() => handleSale(pkg.id)}
                  className="w-full"
                >
                  Record Sale
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fortnite Crew Subscriptions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-gaming rounded-full"></div>
                Fortnite Crew Subscriptions
              </CardTitle>
              <CardDescription>Manage monthly subscriptions and payment reminders</CardDescription>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="gaming">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Crew Member</DialogTitle>
                  <DialogDescription>Add a new Fortnite Crew subscription</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Customer Name</Label>
                    <Input
                      value={newCrewMember.customerName}
                      onChange={(e) => setNewCrewMember({
                        ...newCrewMember,
                        customerName: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={newCrewMember.email}
                      onChange={(e) => setNewCrewMember({
                        ...newCrewMember,
                        email: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label>Monthly Price (KSH)</Label>
                    <Input
                      type="number"
                      value={newCrewMember.price}
                      onChange={(e) => setNewCrewMember({
                        ...newCrewMember,
                        price: parseInt(e.target.value) || 800
                      })}
                    />
                  </div>
                  <Button variant="gaming" onClick={addCrewMember} className="w-full">
                    Add Crew Member
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crewSubscriptions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No crew members yet</p>
            ) : (
              crewSubscriptions.map((subscription) => {
                const daysUntil = getDaysUntilPayment(subscription.nextPayment);
                const isOverdue = daysUntil < 0;
                const isReminder = daysUntil <= 3 && daysUntil >= 0;
                
                return (
                  <div key={subscription.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <h4 className="font-semibold">{subscription.customerName}</h4>
                        <p className="text-sm text-muted-foreground">{subscription.email}</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">
                            Next payment: {new Date(subscription.nextPayment).toLocaleDateString()}
                          </span>
                          {(isOverdue || isReminder) && (
                            <Badge variant={isOverdue ? "destructive" : "secondary"}>
                              <Bell className="h-3 w-3 mr-1" />
                              {isOverdue ? 'Overdue' : 'Reminder'}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="font-semibold">KSH {subscription.price}</div>
                          <Badge variant={subscription.isPaid ? "default" : "destructive"}>
                            {subscription.isPaid ? 'Paid' : 'Pending'}
                          </Badge>
                        </div>
                        
                        <Button
                          variant={subscription.isPaid ? "outline" : "gaming"}
                          size="sm"
                          onClick={() => markPayment(subscription.id, !subscription.isPaid)}
                        >
                          {subscription.isPaid ? 'Mark Unpaid' : 'Mark Paid'}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FortniteBusiness;