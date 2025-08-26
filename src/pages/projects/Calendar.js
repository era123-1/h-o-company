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
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost/kompani-ndertimi/api/calendar.php"
        );
        const formattedEvents = await response.json();
        setEvents(
          formattedEvents.map((event) => ({
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
            description: event.description,
          }))
        );
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
        setEvents([
          ...events,
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

  const handleSelectSlot = (slotInfo) => {
    const selectedDateEvents = events.filter((event) => {
      return moment(event.start).isSame(slotInfo.start, "day");
    });
    setSelectedEventDetails(selectedDateEvents);
    setCurrentDate(slotInfo.start);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "months").toDate());
  };

  const goToNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "months").toDate());
  };

  const handleEventClick = (event) => {
    setSelectedEventDetails(event);
  };
  const handleNavigate = (newDate) => {
    setCurrentDate(newDate); 
  };
  return (
    <div className="event-calendar-container">
      <h1>Event Calendar</h1>
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>

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
            <h2>Add Event</h2>
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
              Event Description
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
              ></textarea>
            </label>
            <button type="submit">Add Event</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        onNavigate={handleNavigate}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventClick}
        toolbar={false}
        style={{ height: 500, marginTop: "20px" }}
        selectable={true}
        views={["month", "week", "day"]}
        defaultView="month"
      />
      <button className="add-event-button" onClick={() => setShowForm(true)}>
        Add Event
      </button>
      {/* Displaying events for the relevant date*/}
      {selectedEventDetails && selectedEventDetails.length > 0 && (
        <div className="events-for-date">
          <h2>Events on {moment(currentDate).format("MMMM Do YYYY")}</h2>
          <ul>
            {selectedEventDetails.map((event, index) => (
              <li key={index}>
                <p>
                  <strong>{event.title}</strong>
                </p>
                <p>{event.description}</p>
                <p>
                  {moment(event.start).format("h:mm A")} -{" "}
                  {moment(event.end).format("h:mm A")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* If there are no events for the date */}
      {selectedEventDetails && selectedEventDetails.length === 0 && (
        <div className="no-events">
          <p>No events for this date.</p>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;