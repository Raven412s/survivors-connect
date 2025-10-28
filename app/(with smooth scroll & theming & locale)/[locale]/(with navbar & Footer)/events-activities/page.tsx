// app/(with smooth scroll & theming & locale)/[locale]/(with navbar & Footer)/events-activities/page.tsx
import ProjectOverview from "@/components/pages/events-activities/project-overview";
import OngoingActivities from "@/components/pages/events-activities/ongoing-activities";
import KeyAchievements from "@/components/pages/events-activities/key-achievements";
import UpcomingEvents from "@/components/pages/events-activities/upcoming-events";
import VisualGallery from "@/components/pages/events-activities/visual-gallery";
import WorkshopsWebinars from "@/components/pages/events-activities/workshops-webinars";

export default async function EventsActivitiesPage() {
  return (
    <main className="w-full">
      <ProjectOverview />
      <OngoingActivities />
      <KeyAchievements />
      <WorkshopsWebinars />
      <UpcomingEvents />
      <VisualGallery />
    </main>
  );
}