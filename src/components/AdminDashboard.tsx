import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Settings, 
  Bell, 
  Search, 
  Filter,
  Download,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Menu,
  Home,
  BarChart3,
  FileText,
  LogOut
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const sidebarItems = [
  { title: "Overview", icon: Home, id: "overview" },
  { title: "Analytics", icon: BarChart3, id: "analytics" },
  { title: "Reports", icon: FileText, id: "reports" },
  { title: "Settings", icon: Settings, id: "settings" },
];

const mockData = {
  overview: {
    totalRevenue: 45230,
    totalUsers: 1250,
    activeServices: 3,
    growth: 12.5
  },
  recentTransactions: [
    { id: 1, user: "John Doe", service: "Fortnite V-Bucks", amount: 28, date: "2024-01-15" },
    { id: 2, user: "Jane Smith", service: "Groundnuts", amount: 15, date: "2024-01-15" },
    { id: 3, user: "Mike Johnson", service: "Fortnite Crew", amount: 12, date: "2024-01-14" },
  ]
};

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeSection, setActiveSection] = useState("overview");

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <Card className="bg-futuristic-surface border-futuristic-primary/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-futuristic-glow" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${mockData.overview.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-futuristic-glow">+{mockData.overview.growth}% from last month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="bg-futuristic-surface border-futuristic-secondary/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <Users className="h-4 w-4 text-futuristic-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockData.overview.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-futuristic-secondary">+180 new this month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card className="bg-futuristic-surface border-futuristic-accent/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Services</CardTitle>
              <Activity className="h-4 w-4 text-futuristic-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockData.overview.activeServices}</div>
              <p className="text-xs text-futuristic-accent">2 new services planned</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <Card className="bg-futuristic-surface border-green-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockData.overview.growth}%</div>
              <p className="text-xs text-green-500">Consistent upward trend</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
        <Card className="bg-futuristic-surface border-futuristic-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Recent Transactions</CardTitle>
                <CardDescription>Latest business activities</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-futuristic-glow/50 text-futuristic-glow">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-futuristic-primary/20 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{transaction.user}</p>
                    <p className="text-sm text-muted-foreground">{transaction.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-futuristic-glow">${transaction.amount}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-futuristic-surface border-futuristic-primary/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart className="w-5 h-5 mr-2 text-futuristic-glow" />
              Revenue Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border border-futuristic-primary/20 rounded-lg">
              <p className="text-muted-foreground">Bar Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-futuristic-surface border-futuristic-secondary/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <LineChart className="w-5 h-5 mr-2 text-futuristic-secondary" />
              Growth Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border border-futuristic-secondary/20 rounded-lg">
              <p className="text-muted-foreground">Line Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-futuristic-surface border-futuristic-accent/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-futuristic-accent" />
            Service Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-futuristic-accent/20 rounded-lg">
            <p className="text-muted-foreground">Pie Chart Placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Reports</h2>
        <div className="flex gap-2">
          <Input placeholder="Search reports..." className="w-64" />
          <Button variant="outline" size="icon">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {["Financial Summary", "User Analytics", "Service Performance", "Growth Analysis", "Revenue Trends", "Customer Insights"].map((report, index) => (
          <motion.div key={report} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }}>
            <Card className="bg-futuristic-surface border-futuristic-primary/30 hover:shadow-futuristic transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white text-lg">{report}</CardTitle>
                <CardDescription>Generated report data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-futuristic-glow/50 text-futuristic-glow">
                    Ready
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Settings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-futuristic-surface border-futuristic-primary/30">
          <CardHeader>
            <CardTitle className="text-white">System Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Organization Name</label>
              <Input defaultValue="Fruppe's Org" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Default Currency</label>
              <Input defaultValue="USD" />
            </div>
            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="bg-futuristic-surface border-futuristic-secondary/30">
          <CardHeader>
            <CardTitle className="text-white">Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Email Notifications</span>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">SMS Alerts</span>
                <Button variant="outline" size="sm">Disabled</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Push Notifications</span>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const AppSidebar = () => (
    <Sidebar className="bg-futuristic-surface border-futuristic-primary/30">
      <SidebarContent>
        <div className="p-6 border-b border-futuristic-primary/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-futuristic-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-futuristic-glow font-bold">F</span>
            </div>
            <div>
              <h3 className="font-bold text-white">Admin Portal</h3>
              <p className="text-xs text-muted-foreground">Fruppe's Org</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-futuristic-glow">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    className={`${
                      activeSection === item.id 
                        ? "bg-futuristic-primary/20 text-futuristic-glow border-futuristic-primary/50" 
                        : "text-muted-foreground hover:text-white hover:bg-futuristic-surface"
                    } transition-all`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={onLogout}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );

  return (
    <div className="min-h-screen bg-futuristic-bg">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="h-16 border-b border-futuristic-primary/30 bg-futuristic-surface flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-xl font-bold text-white">
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                </h1>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                </Button>
                <div className="w-8 h-8 bg-futuristic-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-sm text-futuristic-glow">A</span>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
              {activeSection === "overview" && renderOverview()}
              {activeSection === "analytics" && renderAnalytics()}
              {activeSection === "reports" && renderReports()}
              {activeSection === "settings" && renderSettings()}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};