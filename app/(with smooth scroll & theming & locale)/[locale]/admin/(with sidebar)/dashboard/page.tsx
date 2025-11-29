'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Activity,
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Mail,
  MessageSquare,
  Star,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// ---------------- TYPES -----------------
interface ConnectRequest {
  _id: string;
  name: string;
  seen?: boolean;
  createdAt: string;
}

interface ContactSubmission {
  _id: string;
  name: string;
  seen?: boolean;
  createdAt: string;
}

interface Application {
  _id: string;
  name: string;
  status: string;
  createdAt: string;
}

interface RecentActivity {
  id: string;
  user: string;
  type: 'connect_request' | 'contact' | 'application';
  action: string;
  time: string;
}

interface DashboardSummary {
  totalConnectRequests: number;
  newConnectRequests: number;
  totalContacts: number;
  newContacts: number;
  pendingApplications: number;
  publishedTestimonials: number;
  activityCount: number;
  avgResponseTime: string;
}

interface DashboardTrends {
  connectRequests: { current: number; previous: number; change: string };
  contacts: { current: number; previous: number; change: string };
  applications: { current: number; previous: number; change: string };
}

interface DashboardData {
  summary: DashboardSummary;
  recentActivity: RecentActivity[];
  trends: DashboardTrends;
}

// ---------------- CLIENT FUNCTIONS -----------------
async function fetchJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (e) {
    console.error('Error fetching:', url, e);
    return null;
  }
}

async function getDashboardData(): Promise<DashboardData> {
  const [connectReq, contact, applications] = await Promise.all([
    fetchJSON<{ requests: ConnectRequest[] }>('/api/connect-request'),
    fetchJSON<{ submissions: ContactSubmission[] }>('/api/contact'),
    fetchJSON<{ applications: Application[] }>('/api/admin/applications?type=all')
  ]);

  console.log(applications?.applications)

  const connectList = connectReq?.requests || [];
  const contactList = contact?.submissions || [];
  const appsList = applications?.applications || [];

  const newConnect = connectList.filter((x) => !x.seen).length;
  const newContacts = contactList.filter((x) => !x.seen).length;
  const pendingApps = appsList.filter((x) => x.status === 'pending').length;

  const recentActivity: RecentActivity[] = [];

  connectList.slice(-4).forEach((r) =>
    recentActivity.push({
      id: r._id,
      user: r.name || 'User',
      type: 'connect_request',
      action: 'submitted',
      time: new Date(r.createdAt).toLocaleString()
    })
  );

  contactList.slice(-4).forEach((c) =>
    recentActivity.push({
      id: c._id,
      user: c.name || 'User',
      type: 'contact',
      action: 'submitted',
      time: new Date(c.createdAt).toLocaleString()
    })
  );

  appsList.slice(-4).forEach((a) =>
    recentActivity.push({
      id: a._id,
      user: a.name || 'Applicant',
      type: 'application',
      action: a.status || 'submitted',
      time: new Date(a.createdAt).toLocaleString()
    })
  );

  recentActivity.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return {
    summary: {
      totalConnectRequests: connectList.length,
      newConnectRequests: newConnect,
      totalContacts: contactList.length,
      newContacts,
      pendingApplications: pendingApps,
      publishedTestimonials: 0,
      activityCount: recentActivity.length,
      avgResponseTime: '2h'
    },
    recentActivity,
    trends: {
      connectRequests: { current: connectList.length, previous: 0, change: '+0%' },
      contacts: { current: contactList.length, previous: 0, change: '+0%' },
      applications: { current: appsList.length, previous: 0, change: '+0%' }
    }
  };
}

// ---------------- COMPONENTS -----------------
interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
  trend?: { value: string; isPositive: boolean };
  badge?: { count: number; variant: 'default' | 'secondary' | 'destructive' | 'outline' };
  href?: string;
  loading?: boolean;
}

const StatCard = ({ title, value, description, icon: Icon, trend, badge, href, loading }: StatCardProps) => (
  <Card className="relative group hover:shadow-lg transition-all duration-200">
    {badge && badge.count > 0 && (
      <Badge
        variant={badge.variant}
        className="absolute -top-2 -right-2 z-10 shadow-lg border-2 border-background"
      >
        {badge.count}
      </Badge>
    )}

    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 text-muted-foreground ${loading ? 'animate-pulse' : ''}`} />
    </CardHeader>
    <CardContent>
      <div className={`text-2xl font-bold ${loading ? 'animate-pulse bg-muted rounded-md h-8 w-16' : ''}`}>
        {loading ? '' : value}
      </div>
      <div className="flex items-center justify-between">
        <p className={`text-xs text-muted-foreground ${loading ? 'animate-pulse bg-muted rounded-md h-4 w-20' : ''}`}>
          {loading ? '' : description}
        </p>
        {trend && !loading && (
          <div className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.value}
          </div>
        )}
      </div>
      {href && !loading && (
        <Button variant="ghost" size="sm" className="w-full mt-3" asChild>
          <Link href={href}>View Details</Link>
        </Button>
      )}
    </CardContent>
  </Card>
);

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  action: string;
  href: string;
  variant?: 'default' | 'destructive';
  loading?: boolean;
}

const QuickActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  action, 
  href, 
  variant = 'default',
  loading 
}: QuickActionCardProps) => (
  <Card className="group hover:shadow-md transition-all duration-200">
    <CardContent className="p-4">
      <div className="flex items-start space-x-4">
        <div
          className={`p-2 rounded-lg ${
            variant === 'destructive'
              ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
              : 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
          } ${loading ? 'animate-pulse' : ''}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-1">
          <h4 className={`font-medium text-sm ${loading ? 'animate-pulse bg-muted rounded-md h-4 w-24' : ''}`}>
            {loading ? '' : title}
          </h4>
          <p className={`text-xs text-muted-foreground ${loading ? 'animate-pulse bg-muted rounded-md h-3 w-32' : ''}`}>
            {loading ? '' : description}
          </p>
        </div>
      </div>
      {!loading && (
        <Button
          variant={variant === 'destructive' ? 'destructive' : 'default'}
          size="sm"
          className="w-full mt-3"
          asChild
        >
          <Link href={href}>{action}</Link>
        </Button>
      )}
    </CardContent>
  </Card>
);

// ---------------- MAIN DASHBOARD COMPONENT -----------------
export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async (showRefreshSpinner = false) => {
    if (showRefreshSpinner) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const dashboardData = await getDashboardData();
      setData(dashboardData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    loadData(true);
  };

  // Use loading state for initial load, refreshing state for manual refresh
  const isLoading = loading && !data;
  const isRefreshing = refreshing;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of platform activity and key metrics
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm">
            Export CSV
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="min-w-20"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Connect Requests"
          value={data?.summary.totalConnectRequests || 0}
          description="Last 30 days"
          icon={MessageSquare}
          trend={data?.trends.connectRequests ? { value: data.trends.connectRequests.change, isPositive: true } : undefined}
          badge={data?.summary.newConnectRequests ? { count: data.summary.newConnectRequests, variant: "destructive" } : undefined}
          href="/admin/connect-requests"
          loading={isLoading || isRefreshing}
        />

        <StatCard
          title="Contact Messages"
          value={data?.summary.totalContacts || 0}
          description="Last 30 days"
          icon={Mail}
          trend={data?.trends.contacts ? { value: data.trends.contacts.change, isPositive: true } : undefined}
          badge={data?.summary.newContacts ? { count: data.summary.newContacts, variant: "secondary" } : undefined}
          href="/admin/contact-submissions"
          loading={isLoading || isRefreshing}
        />

        <StatCard
          title="Pending Applications"
          value={data?.summary.pendingApplications || 0}
          description="Awaiting review"
          icon={FileText}
          trend={data?.trends.applications ? { value: data.trends.applications.change, isPositive: true } : undefined}
          href="/admin/applications"
          loading={isLoading || isRefreshing}
        />

        <StatCard
          title="Published Testimonials"
          value={data?.summary.publishedTestimonials || 0}
          description="Live on site"
          icon={Star}
          href="/admin/testimonials"
          loading={isLoading || isRefreshing}
        />
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Avg Response Time" 
          value={data?.summary.avgResponseTime || '0h'} 
          icon={Clock} 
          loading={isLoading || isRefreshing}
        />

        <StatCard 
          title="Today's Activity" 
          value={data?.summary.activityCount || 0} 
          icon={Activity} 
          loading={isLoading || isRefreshing}
        />

        <StatCard
          title="Platform Health"
          value="Operational"
          icon={CheckCircle2}
          trend={{ value: "100%", isPositive: true }}
          loading={isLoading || isRefreshing}
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Activity + Trends */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
                {(isLoading || isRefreshing) && (
                  <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </CardTitle>
              <CardDescription>Latest actions across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              {(isLoading || isRefreshing) ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 p-3 rounded-lg border">
                      <div className="flex-1 space-y-2">
                        <div className="animate-pulse bg-muted rounded-md h-4 w-3/4"></div>
                        <div className="animate-pulse bg-muted rounded-md h-3 w-1/2"></div>
                      </div>
                      <div className="animate-pulse bg-muted rounded-md h-6 w-16"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {data?.recentActivity.map((activity: RecentActivity) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg border">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">
                            {activity.user} {activity.action} {activity.type.replace("_", " ")}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {activity.type.replace("_", " ")}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link href="/admin/activity-log">View All Activity</Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Request Trends
              </CardTitle>
              <CardDescription>Coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <QuickActionCard
                title="Review New Requests"
                description={`${data?.summary.newConnectRequests || 0} urgent requests`}
                icon={AlertCircle}
                action="Review Now"
                href="/admin/connect-requests?filter=new"
                variant="destructive"
                loading={isLoading || isRefreshing}
              />

              <QuickActionCard
                title="Process Applications"
                description={`${data?.summary.pendingApplications || 0} applications pending`}
                icon={FileText}
                action="View Applications"
                href="/admin/applications"
                loading={isLoading || isRefreshing}
              />

              <QuickActionCard
                title="Respond to Messages"
                description={`${data?.summary.newContacts || 0} new messages`}
                icon={Mail}
                action="View Messages"
                href="/admin/contact-submissions"
                loading={isLoading || isRefreshing}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Services</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Operational
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Healthy
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}