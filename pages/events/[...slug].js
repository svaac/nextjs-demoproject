import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../component/events/event-list";
import ResultsTitle from "../../component/events/results-title";
import Button from "../../component/ui/button";
import ErrorAlert from "../../component/ui/error-alert";
function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;
  if (!filterData) {
    return <p className="center">Loading</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear || isNaN(numMonth) || numYear > 2030 || numMonth < 2021) ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>Invalid Filter. Please Adjust Your Values</p>;
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found.</p>
          <div>
            <Button link="/events">Show All Events</Button>
          </div>
        </ErrorAlert>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents}></EventList>
    </div>
  );
}
export default FilteredEventsPage;
