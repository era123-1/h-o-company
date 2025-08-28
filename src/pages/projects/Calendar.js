import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../features/EventCalendar/EventCalendar.css";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost/kompani-ndertimi/api/calendar.php"
        );
        const data = await response.json();
        const formattedEvents = data.map((event) => ({
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
          description: event.description,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventToSave = {
      ...newEvent,
      start: new Date(newEvent.start).toISOString(),
      end: new Date(newEvent.end).toISOString(),
    };
    try {
      const response = await fetch(
        "http://localhost/kompani-ndertimi/api/calendar.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventToSave),
        }
      );
      const result = await response.json();
      if (result.success) {
        setEvents((prev) => [
          ...prev,
          {
            ...newEvent,
            start: new Date(newEvent.start),
            end: new Date(newEvent.end),
          },
        ]);
        setNewEvent({ title: "", start: "", end: "", description: "" });
        setShowForm(false);
      } else {
        alert("Error adding event: " + result.message);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const goToPreviousMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "months").toDate());
  };

  const goToNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "months").toDate());
  };

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  const eventsForCurrentMonth = events.filter((event) =>
    moment(event.start).isSame(currentDate, "month")
  );

  return (
    <div className="event-calendar-container">
      <div className="calendar-header">
        <h1>📅 Event Calendar</h1>
        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
      </div>

      <div className="custom-calendar-header">
        <button className="nav-button" onClick={goToPreviousMonth}>
          &laquo; Prev
        </button>
        <span className="current-month">
          {moment(currentDate).format("MMMM YYYY")}
        </span>
        <button className="nav-button" onClick={goToNextMonth}>
          Next &raquo;
        </button>
      </div>

      {showForm && (
        <div className="modal">
          <form className="event-form" onSubmit={handleSubmit}>
            <h2>Add New Event</h2>
            <label>
              Event Title
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Start Time
              <input
                type="datetime-local"
                name="start"
                value={newEvent.start}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              End Time
              <input
                type="datetime-local"
                name="end"
                value={newEvent.end}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
              />
            </label>

            <div className="form-buttons">
              <button type="submit">Add Event</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <Calendar
        localizer={localizer}
        events={[]} 
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        onNavigate={handleNavigate}
        toolbar={false}
        style={{ height: 500, width: "100%" }}
        selectable={false} 
        views={["month"]}
        defaultView="month"
        components={{
          event: () => null, 
        }}
      />

      <button className="add-event-button" onClick={() => setShowForm(true)}>
        Add Event
      </button>

      <div className="events-for-month">
        <h2>Events in {moment(currentDate).format("MMMM YYYY")}</h2>
        {eventsForCurrentMonth.length > 0 ? (
          <ul className="event-list">
            {eventsForCurrentMonth.map((event, index) => (
              <li key={index} className="event-item">
                <div className="event-title">{event.title}</div>
                <div className="event-description">{event.description}</div>
                <div className="event-time">
                  {moment(event.start).format("MMM Do, h:mm A")} -{" "}
                  {moment(event.end).format("MMM Do, h:mm A")}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-events">No events for this month.</p>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
