import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BarChartIcon from '@material-ui/icons/BarChart';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import FeedbackIcon from '@material-ui/icons/Feedback';
import CategoryIcon from '@material-ui/icons/Category';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export const SidebarData = [
  {
    title: 'DashBoard',
    path: '/',
    icon: <DashboardIcon />,
    cName: 'nav-text',
  },
  {
    title: 'Courses',
    path: '/makecourse',
    icon: <ShoppingCartIcon />,
    cName: 'nav-text',
  },
  {
    title: 'Categories',
    path: '/categories',
    icon: <CategoryIcon />,
    cName: 'nav-text',
  },
  {
    title: 'Sales/Orders',
    path: '/sales',
    icon: <MonetizationOnIcon />,
    cName: 'nav-text',
  },
  {
    title: 'Analysis',
    path: '/analysis',
    icon: <BarChartIcon />,
    cName: 'nav-text',
  },
  {
    title: 'Customer Feedback',
    path: '/feedback',
    icon: <FeedbackIcon />,
    cName: 'nav-text',
  },
  {
    title: 'Report Issues',
    path: '/report',
    icon: <ReportProblemIcon />,
    cName: 'nav-text',
  },
];
