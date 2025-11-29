# Dashboard Specification

Date: 2025-11-27

Purpose
-------
This document defines the requirements, data sources, user journeys, key metrics, UI layout, and acceptance criteria for the Dashboard page. The goal is to make the dashboard fully functional, performant, secure, accessible, and visually polished.

Goals
-----
- Provide authorized users quick insight into platform health and recent activity.
- Enable fast exploration and management of key resources (connect requests, contacts, testimonies, volunteer applications, professional partner apps).
- Surface KPIs and allow drill-down into lists and item detail pages.

Primary Users & Roles
---------------------
- Admin: full access to all dashboard features, can perform CRUD on resources.
- Moderator / Staff: can view and act on selected resources (e.g., approve requests), limited write permissions.
- Viewer: read-only access to summaries and reports.

Core User Journeys
------------------
1. Sign in and reach dashboard landing.
2. Scan summary cards (totals, trends) and click a card to filter list for that resource.
3. Use search & filters to find an item in a table, open detail sheet, and perform allowed actions (approve, archive, message).
4. Export a CSV of filtered results or navigate to related admin page.

Key Metrics / KPIs
------------------
- Total Connect Requests (last 7/30/90 days)
- New Contacts / messages (last 7/30 days)
- Pending Volunteer Applications
- Number of Published Testimonies
- Response Time / Avg time-to-respond (if available)
- Admin actions per day (activity log count)

Data Sources & API Endpoints
---------------------------
Use existing API routes under `api/` and models in `models/`.

- Connect requests: `GET /api/connect-request?limit=&page=&q=&status=` and `POST/PUT/DELETE /api/connect-request`.
- Contacts/messages: `GET /api/contact` and POST for replies.
- Volunteer applications: `GET /api/volunteer-applications` and action routes.
- Professional partner applications: `GET /api/professional-partners`.
- Testimonies: `GET /api/testimonies`.
- Auth: `api/auth/*` for session checks.

If any endpoint is missing, create a thin API wrapper in `lib/actions.ts` and server-side helpers in `lib/`.

Suggested Response Shape
------------------------
All list endpoints should support pagination and filters. Example:

{
  "items": [ ... ],
  "meta": { "page": 1, "perPage": 20, "total": 342 }
}

UI Layout & Components Mapping
------------------------------
- Landing header: summary cards (cards in `components/ui/card.tsx`).
- Main area split: left — charts & trends; right — actionable lists/tables (`components/data-table.tsx`).
- Table rows open a slide-over/detail modal (`components/contact/view-sheet.tsx`, `modals/`).
- Reusable components: search input, filter panel, skeleton loaders, empty state components.

Performance & UX
-----------------
- Load summary cards server-side for fastest first paint (SSR/edge). Lazy-load heavy charts.
- Use caching and background refresh via SWR or React Query for client interactions.
- Virtualize long lists (`react-window`) and use key-based memoization (`useMemo`, `React.memo`).
- Optimize images and preconnect critical origins.

Accessibility
-------------
- Keyboard navigation for tables and modals.
- Proper ARIA attributes for controls and roles.
- Color contrast compliance and focus states.

Security & Permissions
----------------------
- Enforce authorization in API routes using `lib/auth.ts` middleware.
- UI should hide controls not allowed for a role; server must reject unauthorized actions.
- Sanitize inputs and validate on server side.

Testing & Acceptance Criteria
----------------------------
- Landing loads in under 1.5s on a 3G emulated fast connection for summary payloads.
- CRUD flows for a chosen resource complete end-to-end in staging.
- Keyboard-only navigation and screen-reader checks pass major issues.
- Unit tests for core components and integration tests for listing/detail flows exist.

Mock Data & Development Helpers
------------------------------
- Add fixtures in `scripts/fixtures/` or mock handlers in `pages/api/__mocks__`.
- Provide sample CSV export for QA.

Telemetry & Monitoring
----------------------
- Add Sentry or similar for error monitoring.
- Track dashboard feature usage (which cards are clicked, exports performed).

Acceptance Checklist (short)
---------------------------
- [ ] Auth-protected route and API enforcement
- [ ] Summary cards with counts and trends
- [ ] Search + filters + paginated lists
- [ ] Detail slide-over and allowed actions
- [ ] Export CSV for filtered view
- [ ] Performance optimizations and caching
- [ ] Accessibility checks completed
- [ ] Tests covering core flows

Next Steps
----------
1. Review this spec with stakeholders and confirm KPIs.
2. Wireframe the layout and map components to `components/`.
3. Implement server-side summary endpoints and client hooks (start with `connect-request`).
4. Iterate on visual polish and a11y.

Maintainer notes
----------------
Save feedback and changes to this file. When ready, mark the `Discovery & Requirements` TODO completed.
