import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Edit, Plus, TrendingUp, Package, Users, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface DailySales {
  id: string;
  date: string;
  packetsSold: number;
  packetsCooked: number;
  rawKgBought: number;
  revenue: number;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  debtPackets: number;
  isPaid: boolean;
  dateCreated: string;
}

interface PriceSettings {
  packetPrice: number;
  lastUpdated: string;
}

const GroundnutBusiness = () => {
  const { toast } = useToast();
  const [dailySales, setDailySales] = useState<DailySales[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [priceSettings, setPriceSettings] = useState<PriceSettings>({
    packetPrice: 100,
    lastUpdated: new Date().toISOString()
  });

  const [newSale, setNewSale] = useState({
    packetsSold: 0,
    packetsCooked: 0,
    rawKgBought: 0,
  });

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    debtPackets: 0,
  });

  const [editingPrice, setEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState(100);

  // Load data from localStorage
  useEffect(() => {
    const savedSales = localStorage.getItem('groundnut-sales');
    const savedCustomers = localStorage.getItem('groundnut-customers');
    const savedPrice = localStorage.getItem('groundnut-price');
    
    if (savedSales) {
      setDailySales(JSON.parse(savedSales));
    }
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
    if (savedPrice) {
      setPriceSettings(JSON.parse(savedPrice));
      setNewPrice(JSON.parse(savedPrice).packetPrice);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('groundnut-sales', JSON.stringify(dailySales));
  }, [dailySales]);

  useEffect(() => {
    localStorage.setItem('groundnut-customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('groundnut-price', JSON.stringify(priceSettings));
  }, [priceSettings]);

  const addDailySale = () => {
    if (newSale.packetsSold === 0 && newSale.packetsCooked === 0 && newSale.rawKgBought === 0) return;
    
    const sale: DailySales = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      packetsSold: newSale.packetsSold,
      packetsCooked: newSale.packetsCooked,
      rawKgBought: newSale.rawKgBought,
      revenue: newSale.packetsSold * priceSettings.packetPrice,
    };

    setDailySales(prev => {
      // Check if entry for today already exists
      const today = sale.date;
      const existingIndex = prev.findIndex(s => s.date === today);
      
      if (existingIndex >= 0) {
        // Update existing entry
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          packetsSold: updated[existingIndex].packetsSold + sale.packetsSold,
          packetsCooked: updated[existingIndex].packetsCooked + sale.packetsCooked,
          rawKgBought: updated[existingIndex].rawKgBought + sale.rawKgBought,
          revenue: updated[existingIndex].revenue + sale.revenue,
        };
        return updated;
      } else {
        // Add new entry
        return [...prev, sale].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    });

    setNewSale({ packetsSold: 0, packetsCooked: 0, rawKgBought: 0 });
    
    toast({
      title: "Sales Updated",
      description: `Added ${newSale.packetsSold} packets sold, revenue: KSH ${newSale.packetsSold * priceSettings.packetPrice}`,
    });
  };

  const addCustomer = () => {
    if (!newCustomer.name || newCustomer.debtPackets === 0) return;
    
    const customer: Customer = {
      id: Date.now().toString(),
      name: newCustomer.name,
      phone: newCustomer.phone,
      debtPackets: newCustomer.debtPackets,
      isPaid: false,
      dateCreated: new Date().toISOString(),
    };

    setCustomers(prev => [...prev, customer]);
    setNewCustomer({ name: '', phone: '', debtPackets: 0 });
    
    toast({
      title: "Customer Added",
      description: `${customer.name} owes ${customer.debtPackets} packets`,
    });
  };

  const markCustomerPaid = (customerId: string, paid: boolean) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === customerId ? { ...customer, isPaid: paid } : customer
    ));
    
    const customer = customers.find(c => c.id === customerId);
    toast({
      title: paid ? "Payment Received" : "Marked Unpaid",
      description: `${customer?.name} ${paid ? 'has paid' : 'marked as unpaid'}`,
    });
  };

  const updatePrice = () => {
    setPriceSettings({
      packetPrice: newPrice,
      lastUpdated: new Date().toISOString()
    });
    setEditingPrice(false);
    
    toast({
      title: "Price Updated",
      description: `Packet price updated to KSH ${newPrice}`,
    });
  };

  // Calculate statistics
  const totalRevenue = dailySales.reduce((sum, sale) => sum + sale.revenue, 0);
  const totalPacketsSold = dailySales.reduce((sum, sale) => sum + sale.packetsSold, 0);
  const totalDebtPackets = customers.filter(c => !c.isPaid).reduce((sum, c) => sum + c.debtPackets, 0);
  const totalDebtValue = totalDebtPackets * priceSettings.packetPrice;
  const totalRawKg = dailySales.reduce((sum, sale) => sum + sale.rawKgBought, 0);

  // Prepare chart data (last 7 days)
  const chartData = dailySales
    .slice(-7)
    .reverse()
    .map(sale => ({
      date: new Date(sale.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: sale.revenue,
      packets: sale.packetsSold,
    }));

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-business-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-business-primary">KSH {totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Packets Sold</CardTitle>
            <Package className="h-4 w-4 text-business-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-business-primary">{totalPacketsSold}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Debt</CardTitle>
            <Users className="h-4 w-4 text-business-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-business-accent">KSH {totalDebtValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{totalDebtPackets} packets</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Raw Materials</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRawKg} kg</div>
            <p className="text-xs text-muted-foreground">Total purchased</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Price Setting */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-business rounded-full"></div>
                Price Settings
              </CardTitle>
              <CardDescription>Current packet price: KSH {priceSettings.packetPrice}</CardDescription>
            </div>
            
            <Dialog open={editingPrice} onOpenChange={setEditingPrice}>
              <DialogTrigger asChild>
                <Button variant="business">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Price
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Packet Price</DialogTitle>
                  <DialogDescription>Set the new price per packet</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Price per Packet (KSH)</Label>
                    <Input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <Button variant="business" onClick={updatePrice} className="w-full">
                    Update Price
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Daily Sales Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-business rounded-full"></div>
            Daily Sales Entry
          </CardTitle>
          <CardDescription>Record today's sales and production data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Packets Sold</Label>
              <Input
                type="number"
                value={newSale.packetsSold}
                onChange={(e) => setNewSale({
                  ...newSale,
                  packetsSold: parseInt(e.target.value) || 0
                })}
              />
            </div>
            <div>
              <Label>Packets Cooked</Label>
              <Input
                type="number"
                value={newSale.packetsCooked}
                onChange={(e) => setNewSale({
                  ...newSale,
                  packetsCooked: parseInt(e.target.value) || 0
                })}
              />
            </div>
            <div>
              <Label>Raw Materials (kg)</Label>
              <Input
                type="number"
                value={newSale.rawKgBought}
                onChange={(e) => setNewSale({
                  ...newSale,
                  rawKgBought: parseInt(e.target.value) || 0
                })}
              />
            </div>
            <div className="flex items-end">
              <Button variant="business" onClick={addDailySale} className="w-full">
                Record Sale
              </Button>
            </div>
          </div>
          
          {newSale.packetsSold > 0 && (
            <div className="mt-4 p-4 bg-business-primary/10 rounded-lg">
              <p className="text-sm">
                Revenue for this entry: <span className="font-bold">KSH {(newSale.packetsSold * priceSettings.packetPrice).toLocaleString()}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sales Trend Chart */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-business-primary" />
              Sales Trend (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--business-primary))" 
                  strokeWidth={2}
                  name="Revenue (KSH)"
                />
                <Line 
                  type="monotone" 
                  dataKey="packets" 
                  stroke="hsl(var(--business-secondary))" 
                  strokeWidth={2}
                  name="Packets Sold"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Customer Debt Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-business rounded-full"></div>
                Customer Debt Management
              </CardTitle>
              <CardDescription>Track customers who took packets on credit</CardDescription>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="business">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Customer Debt</DialogTitle>
                  <DialogDescription>Record a customer who took packets on credit</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Customer Name</Label>
                    <Input
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({
                        ...newCustomer,
                        name: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({
                        ...newCustomer,
                        phone: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label>Packets Taken</Label>
                    <Input
                      type="number"
                      value={newCustomer.debtPackets}
                      onChange={(e) => setNewCustomer({
                        ...newCustomer,
                        debtPackets: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>
                  <Button variant="business" onClick={addCustomer} className="w-full">
                    Add Customer
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No customers with debt</p>
            ) : (
              customers.map((customer) => (
                <div key={customer.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h4 className="font-semibold">{customer.name}</h4>
                      {customer.phone && (
                        <p className="text-sm text-muted-foreground">{customer.phone}</p>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          {customer.debtPackets} packets = KSH {(customer.debtPackets * priceSettings.packetPrice).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={customer.isPaid ? "default" : "destructive"}>
                        {customer.isPaid ? 'Paid' : 'Pending'}
                      </Badge>
                      
                      <Button
                        variant={customer.isPaid ? "outline" : "business"}
                        size="sm"
                        onClick={() => markCustomerPaid(customer.id, !customer.isPaid)}
                      >
                        {customer.isPaid ? 'Mark Unpaid' : 'Mark Paid'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroundnutBusiness;