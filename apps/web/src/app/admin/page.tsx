import React from 'react';
import { Box, Grid, Typography, Paper, Button, Divider, Chip, Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Gavel as GavelIcon,
  Receipt as ReceiptIcon,
  DocumentScanner as DocumentScannerIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Admin Dashboard Component
export default function AdminDashboard() {
  // Mock data - would be fetched from API in production
  const stats = {
    users: {
      total: 1250,
      active: 987,
    },
    subscriptions: {
      total: 1100,
      active: 950,
      byPlan: {
        free: 300,
        shield: 450,
        elite: 250,
        infinity: 100,
      },
    },
    disputes: {
      total: 3450,
      pending: 420,
      successful: 2780,
      successRate: 80.6,
    },
    escalations: {
      total: 560,
      pending: 85,
    },
    ocr: {
      total: 4200,
      successful: 3950,
      successRate: 94.0,
    },
  };

  const monthlyDisputeStats = [
    { month: 'Jan', pending: 45, successful: 210, failed: 15 },
    { month: 'Feb', pending: 52, successful: 230, failed: 18 },
    { month: 'Mar', pending: 48, successful: 250, failed: 20 },
    { month: 'Apr', pending: 61, successful: 290, failed: 25 },
    { month: 'May', pending: 55, successful: 310, failed: 22 },
    { month: 'Jun', pending: 67, successful: 350, failed: 28 },
  ];

  const subscriptionData = [
    { name: 'Free', value: stats.subscriptions.byPlan.free },
    { name: 'Shield', value: stats.subscriptions.byPlan.shield },
    { name: 'Elite', value: stats.subscriptions.byPlan.elite },
    { name: 'Infinity', value: stats.subscriptions.byPlan.infinity },
  ];

  const recentActivity = [
    { id: 1, action: 'UPDATE_DISPUTE', user: 'admin@cobra.com', entityType: 'DISPUTE', timestamp: '2025-05-22T00:15:23Z' },
    { id: 2, action: 'LOGIN', user: 'support@cobra.com', entityType: 'USER', timestamp: '2025-05-22T00:10:45Z' },
    { id: 3, action: 'UPDATE_SUBSCRIPTION', user: 'admin@cobra.com', entityType: 'SUBSCRIPTION', timestamp: '2025-05-21T23:55:12Z' },
    { id: 4, action: 'CREATE', user: 'john.doe@example.com', entityType: 'DISPUTE', timestamp: '2025-05-21T23:42:37Z' },
    { id: 5, action: 'UPDATE_ESCALATION', user: 'admin@cobra.com', entityType: 'ESCALATION', timestamp: '2025-05-21T23:30:19Z' },
  ];

  const activityColumns = [
    { field: 'action', headerName: 'Action', width: 180 },
    { field: 'user', headerName: 'User', width: 220 },
    { field: 'entityType', headerName: 'Entity Type', width: 150 },
    { 
      field: 'timestamp', 
      headerName: 'Timestamp', 
      width: 200,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString();
      }
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom component="div" sx={{ fontWeight: 'bold', mb: 4 }}>
        War Room Dashboard
      </Typography>
      
      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              borderLeft: '4px solid #3f51b5',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Total Users
            </Typography>
            <Typography variant="h4" component="div" sx={{ mt: 2, fontWeight: 'bold' }}>
              {stats.users.total}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {stats.users.active} active
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              borderLeft: '4px solid #f44336',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Active Subscriptions
            </Typography>
            <Typography variant="h4" component="div" sx={{ mt: 2, fontWeight: 'bold' }}>
              {stats.subscriptions.active}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {Math.round((stats.subscriptions.active / stats.subscriptions.total) * 100)}% subscription rate
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              borderLeft: '4px solid #4caf50',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Total Disputes
            </Typography>
            <Typography variant="h4" component="div" sx={{ mt: 2, fontWeight: 'bold' }}>
              {stats.disputes.total}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {stats.disputes.pending} pending
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              borderLeft: '4px solid #ff9800',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Success Rate
            </Typography>
            <Typography variant="h4" component="div" sx={{ mt: 2, fontWeight: 'bold' }}>
              {stats.disputes.successRate}%
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {stats.disputes.successful} successful disputes
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              borderLeft: '4px solid #9c27b0',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Escalations
            </Typography>
            <Typography variant="h4" component="div" sx={{ mt: 2, fontWeight: 'bold' }}>
              {stats.escalations.total}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {stats.escalations.pending} pending
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              borderLeft: '4px solid #00bcd4',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              OCR Success
            </Typography>
            <Typography variant="h4" component="div" sx={{ mt: 2, fontWeight: 'bold' }}>
              {stats.ocr.successRate}%
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {stats.ocr.total} documents processed
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Dispute Statistics
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlyDisputeStats}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="successful" stackId="a" fill="#4caf50" />
                <Bar dataKey="pending" stackId="a" fill="#ff9800" />
                <Bar dataKey="failed" stackId="a" fill="#f44336" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Subscription Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subscriptionData.map((entry, index) => {
                    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
                    return <Pie key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
                  })}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Recent Activity */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={recentActivity}
            columns={activityColumns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            disableSelectionOnClick
          />
        </div>
      </Paper>
      
      {/* Quick Actions */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item>
            <Button variant="contained" startIcon={<PeopleIcon />}>
              Manage Users
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" startIcon={<AssignmentIcon />} color="primary">
              View Disputes
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" startIcon={<GavelIcon />} color="secondary">
              Handle Escalations
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" startIcon={<ReceiptIcon />} color="success">
              Subscription Reports
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" startIcon={<DocumentScannerIcon />} color="warning">
              OCR Analytics
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" startIcon={<SettingsIcon />} color="info">
              System Settings
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
