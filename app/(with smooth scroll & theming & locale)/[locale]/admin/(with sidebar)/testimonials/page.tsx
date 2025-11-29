'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';

// Icons
import {
  Archive,
  Calendar,
  CheckCircle,
  Download,
  Edit,
  Eye,
  Filter,
  Globe,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Star,
  Upload,
  User,
  XCircle
} from 'lucide-react';

// Types
interface Testimonial {
  id: string;
  authorName: string;
  authorAffiliation?: string;
  content: string;
  excerpt: string;
  language: string;
  tags: string[];
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'archived';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  createdBy: string;
}

interface TestimonialFilters {
  search: string;
  status: string;
  language: string;
  featured: boolean | null;
  tags: string[];
  dateRange: {
    from: string;
    to: string;
  };
}

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Pending Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'archived', label: 'Archived' }
];

const languageOptions = [
  { value: 'all', label: 'All Languages' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' }
];

const tagOptions = ['survivor', 'professional', 'support', 'recovery', 'gratitude', 'recommendation'];

export default function AdminTestimonialManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedTestimonials, setSelectedTestimonials] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TestimonialFilters>({
    search: '',
    status: 'all',
    language: 'all',
    featured: null,
    tags: [],
    dateRange: { from: '', to: '' }
  });
  const [showFilters, setShowFilters] = useState(false);
  const [previewTestimonial, setPreviewTestimonial] = useState<Testimonial | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    type: 'approve' | 'reject' | 'delete' | 'feature' | 'unfeature' | null;
    testimonial?: Testimonial;
    bulk?: boolean;
  }>({ type: null });

  // Fetch testimonials from API
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/testimonials');
      
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      
      const data = await response.json();
      setTestimonials(data.testimonials || []);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError((err as Error).message || 'Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };


  // Filter testimonials based on current filters
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.authorName.toLowerCase().includes(filters.search.toLowerCase()) ||
                         testimonial.content.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || testimonial.status === filters.status;
    const matchesLanguage = filters.language === 'all' || testimonial.language === filters.language;
    const matchesFeatured = filters.featured === null || testimonial.featured === filters.featured;
    const matchesTags = filters.tags.length === 0 || filters.tags.some(tag => testimonial.tags.includes(tag));
    
    return matchesSearch && matchesStatus && matchesLanguage && matchesFeatured && matchesTags;
  });

  const handleBulkAction = (action: 'approve' | 'reject' | 'delete' | 'feature' | 'unfeature') => {
    setActionDialog({ type: action, bulk: true });
  };

  const confirmAction = async () => {
  const { type, testimonial, bulk } = actionDialog;

  if (!type) return;

  try {
    if (bulk) {
      // Bulk actions
      await Promise.all(
        selectedTestimonials.map(id =>
          fetch(`/api/admin/testimonials/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              status:
                type === "approve" ? "approved" :
                type === "reject" ? "rejected" :
                undefined,
              featured:
                type === "feature" ? true :
                type === "unfeature" ? false :
                undefined
            })
          })
        )
      );

      // Update UI after success
      setTestimonials(prev =>
        prev.map(t =>
          selectedTestimonials.includes(t.id)
            ? {
                ...t,
                status:
                  type === "approve" ? "approved" :
                  type === "reject" ? "rejected" :
                  t.status,
                featured:
                  type === "feature" ? true :
                  type === "unfeature" ? false :
                  t.featured,
                ...(type === "approve" && { approvedAt: new Date().toISOString() })
              }
            : t
        )
      );

      setSelectedTestimonials([]);
    } else if (testimonial) {
      // Single action
      await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status:
            type === "approve" ? "approved" :
            type === "reject" ? "rejected" :
            undefined,
          featured:
            type === "feature" ? true :
            type === "unfeature" ? false :
            undefined
        })
      });

      // Update UI
      setTestimonials(prev =>
        prev.map(t =>
          t.id === testimonial.id
            ? {
                ...t,
                status:
                  type === "approve" ? "approved" :
                  type === "reject" ? "rejected" :
                  t.status,
                featured:
                  type === "feature" ? true :
                  type === "unfeature" ? false :
                  t.featured,
                ...(type === "approve" && { approvedAt: new Date().toISOString() })
              }
            : t
        )
      );
    }
  } catch (err) {
    console.error("Action failed:", err);
    alert("Something went wrong!");
  }

  setActionDialog({ type: null });
};


  const getStatusBadge = (status: Testimonial['status']) => {
    const statusConfig = {
      draft: { variant: 'secondary' as const, label: 'Draft' },
      pending: { variant: 'default' as const, label: 'Pending' },
      approved: { variant: 'default' as const, label: 'Approved' },
      rejected: { variant: 'destructive' as const, label: 'Rejected' },
      archived: { variant: 'outline' as const, label: 'Archived' }
    };
    
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials Management</h1>
          <p className="text-muted-foreground">
            Manage and moderate user testimonials for the platform
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTestimonials}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-2 flex-1 max-w-md">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search testimonials..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {Object.values(filters).some(val => 
                  Array.isArray(val) ? val.length > 0 : 
                  (typeof val === 'object' && val !== null) ? Object.values(val).some(v => !!v) : 
                  val && val !== 'all'
                ) && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                    !
                  </Badge>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters({
                  search: '',
                  status: 'all',
                  language: 'all',
                  featured: null,
                  tags: [],
                  dateRange: { from: '', to: '' }
                })}
              >
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>

        {showFilters && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select
                  value={filters.language}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, language: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Featured</label>
                <Select
                  value={filters.featured === null ? 'all' : filters.featured ? 'featured' : 'not-featured'}
                  onValueChange={(value) => setFilters(prev => ({ 
                    ...prev, 
                    featured: value === 'all' ? null : value === 'featured' 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="featured">Featured Only</SelectItem>
                    <SelectItem value="not-featured">Not Featured</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <Select
                  value=""
                  onValueChange={(value) => {
                    if (!filters.tags.includes(value)) {
                      setFilters(prev => ({ ...prev, tags: [...prev.tags, value] }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tags..." />
                  </SelectTrigger>
                  <SelectContent>
                    {tagOptions.map(tag => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {filters.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {filters.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          onClick={() => setFilters(prev => ({
                            ...prev,
                            tags: prev.tags.filter(t => t !== tag)
                          }))}
                          className="hover:bg-muted rounded-full"
                        >
                          <XCircle className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Bulk Actions Bar */}
      {selectedTestimonials.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {selectedTestimonials.length} testimonial(s) selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('approve')}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('reject')}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('feature')}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Feature
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTestimonials([])}
                >
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testimonials Table */}
      <Card>
        <CardHeader>
          <CardTitle>Testimonials</CardTitle>
          <CardDescription>
            Manage all user testimonials. {filteredTestimonials.length} testimonial(s) found.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <p>Loading testimonials...</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-12 bg-destructive/10 rounded-lg border border-destructive/20">
              <p className="text-destructive font-semibold">Error loading testimonials</p>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          )}

          {!loading && !error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedTestimonials.length === filteredTestimonials.length && filteredTestimonials.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTestimonials(filteredTestimonials.map(t => t.id));
                        } else {
                          setSelectedTestimonials([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTestimonials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      <div className="flex flex-col items-center space-y-2">
                        <User className="h-8 w-8" />
                        <p>No testimonials found</p>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Testimonial
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTestimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedTestimonials.includes(testimonial.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTestimonials(prev => [...prev, testimonial.id]);
                            } else {
                              setSelectedTestimonials(prev => prev.filter(id => id !== testimonial.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{testimonial.authorName}</div>
                          {testimonial.authorAffiliation && (
                            <div className="text-sm text-muted-foreground">
                              {testimonial.authorAffiliation}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md">
                          <p className="text-sm line-clamp-2">{testimonial.excerpt}</p>
                          {testimonial.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {testimonial.tags.slice(0, 2).map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {testimonial.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{testimonial.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(testimonial.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Globe className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm uppercase">{testimonial.language}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {testimonial.featured ? (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(testimonial.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setPreviewTestimonial(testimonial)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {testimonial.status !== 'approved' && (
                              <DropdownMenuItem onClick={() => setActionDialog({ type: 'approve', testimonial })}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                            )}
                            {testimonial.status !== 'rejected' && (
                              <DropdownMenuItem onClick={() => setActionDialog({ type: 'reject', testimonial })}>
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            )}
                            {!testimonial.featured ? (
                              <DropdownMenuItem onClick={() => setActionDialog({ type: 'feature', testimonial })}>
                                <Star className="h-4 w-4 mr-2" />
                                Feature
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => setActionDialog({ type: 'unfeature', testimonial })}>
                                <Star className="h-4 w-4 mr-2" />
                                Unfeature
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => setActionDialog({ type: 'delete', testimonial })}
                              className="text-red-600"
                            >
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={!!previewTestimonial} onOpenChange={() => setPreviewTestimonial(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Testimonial Preview</DialogTitle>
            <DialogDescription>
              Preview how this testimonial will appear to users
            </DialogDescription>
          </DialogHeader>
          {previewTestimonial && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{previewTestimonial.authorName}</h3>
                  {previewTestimonial.authorAffiliation && (
                    <p className="text-muted-foreground">{previewTestimonial.authorAffiliation}</p>
                  )}
                </div>
                {getStatusBadge(previewTestimonial.status)}
              </div>
              
              <div className="prose prose-sm max-w-none">
                <p>{previewTestimonial.content}</p>
              </div>

              {previewTestimonial.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {previewTestimonial.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Globe className="h-3 w-3" />
                    <span className="uppercase">{previewTestimonial.language}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Created {formatDate(previewTestimonial.createdAt)}</span>
                  </div>
                </div>
                {previewTestimonial.featured && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>Featured</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Dialog */}
      <AlertDialog open={!!actionDialog.type} onOpenChange={() => setActionDialog({ type: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionDialog.type === 'approve' && 'Approve Testimonial'}
              {actionDialog.type === 'reject' && 'Reject Testimonial'}
              {actionDialog.type === 'delete' && 'Archive Testimonial'}
              {actionDialog.type === 'feature' && 'Feature Testimonial'}
              {actionDialog.type === 'unfeature' && 'Unfeature Testimonial'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionDialog.bulk ? (
                <>
                  This action will affect {selectedTestimonials.length} testimonial(s). 
                  Are you sure you want to continue?
                </>
              ) : (
                <>
                  {actionDialog.type === 'approve' && 'This testimonial will be published and visible to users.'}
                  {actionDialog.type === 'reject' && 'This testimonial will be marked as rejected and hidden from users.'}
                  {actionDialog.type === 'delete' && 'This testimonial will be archived and can be restored later.'}
                  {actionDialog.type === 'feature' && 'This testimonial will be featured and shown prominently.'}
                  {actionDialog.type === 'unfeature' && 'This testimonial will no longer be featured.'}
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {(actionDialog.type === 'reject' || actionDialog.type === 'delete') && !actionDialog.bulk && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason (optional)</label>
              <Textarea placeholder="Add a reason for this action..." />
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction}>
              {actionDialog.type === 'approve' && 'Approve'}
              {actionDialog.type === 'reject' && 'Reject'}
              {actionDialog.type === 'delete' && 'Archive'}
              {actionDialog.type === 'feature' && 'Feature'}
              {actionDialog.type === 'unfeature' && 'Unfeature'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}