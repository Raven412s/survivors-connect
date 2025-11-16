import { ConnectRequestStatus, ConnectRequestCategory } from '@/models/ConnectRequest';

export const getStatusColor = (status: ConnectRequestStatus): string => {
  const statusColors: Record<ConnectRequestStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
    assigned: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    in_progress: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
    resolved: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    closed: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800'
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
}

export const getCategoryColor = (category: ConnectRequestCategory): string => {
  const categoryColors: Record<ConnectRequestCategory, string> = {
    medical: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
    legal: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    counselling: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
    shelter: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
    police: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
    other: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800'
  };
  return categoryColors[category] || 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString('en-IN'),
    time: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  };
}