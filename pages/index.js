import { getFeaturedEvents } from "../dummy-data";
import EventList from "../component/events/event-list";

function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}
export default HomePage;
