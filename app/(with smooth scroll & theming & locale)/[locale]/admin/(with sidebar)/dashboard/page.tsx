

export default async function AdminDashboard() {
  // TODO: replace these static values with real data (fetch counts from API or DB)
  const totalUsers = 0;
  const totalConnectRequests = 42; // example value
  const newConnectRequests = 3; // example unread/new requests

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users card */}
        <div className="relative bg-white overflow-visible shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="shrink-0">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">U</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd className="text-lg font-medium text-gray-900">{totalUsers}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Connect Requests card */}
        <div className="relative bg-white overflow-visible shadow rounded-lg">
          {/* Badge: overflowed and positioned top-right */}
          <div className="absolute -top-3 -right-3 z-10">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-600 text-white text-sm font-semibold shadow-lg border-2 border-white">
              {newConnectRequests}
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center">
              <div className="shrink-0">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">CR</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Connect Requests</dt>
                  <dd className="text-lg font-medium text-gray-900">{totalConnectRequests}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* New/Unread Requests quick card */}
        <div className="relative bg-white overflow-visible shadow rounded-lg">
          <div className="absolute -top-3 -right-3 z-10">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-600 text-white text-sm font-semibold shadow-lg border-2 border-white">
              {newConnectRequests}
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center">
              <div className="shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">N</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">New Requests</dt>
                  <dd className="text-lg font-medium text-gray-900">{newConnectRequests} awaiting review</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}