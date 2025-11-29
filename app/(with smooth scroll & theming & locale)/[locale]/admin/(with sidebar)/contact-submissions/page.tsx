"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "./table-columns";
import { Loader2, RefreshCcw } from "lucide-react";
import { ContactSubmission } from "@/types/contact";
import { Button } from "@/components/ui/button";

export default function ContactSubmissionsPage() {
  const [data, setData] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/contact/");
      const json = await res.json();
      setData(json.submissions || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Contact Form Submissions</h1>

        <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <RefreshCcw className="w-4 h-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>

      <DataTable columns={columns(fetchData)} data={data} />

    </div>
  );
}
