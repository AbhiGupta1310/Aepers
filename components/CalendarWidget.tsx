"use client";

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Globe,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  User,
  Mail,
  Building,
  Sparkles,
  ArrowLeft
} from "lucide-react";

// Google Meet colored SVG Logo
function GoogleMeetLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <path d="M15 8L20 4V20L15 16V8Z" fill="#00A86B" />
      <rect x="2" y="5" width="13" height="14" rx="2" fill="#4285F4" />
      <path d="M2 9.5L6.5 14H2V9.5Z" fill="#EA4335" />
      <path d="M11 5L15 8.5V5H11Z" fill="#FBBC05" />
    </svg>
  );
}

// 24-hour source slots (convertible to 12-hour and timezone shifted)
const TIME_SLOTS = [
  "09:30",
  "10:30",
  "11:30",
  "13:30",
  "14:30",
  "15:30",
  "16:30",
  "23:30"
];

// Available Timezones with offsets relative to IST (UTC+05:30)
const TIMEZONES = [
  { name: "Asia/Kolkata", label: "Asia/Kolkata (IST)", offset: 0, tzCode: "IST" },
  { name: "America/New_York", label: "America/New_York (EST)", offset: -10.5, tzCode: "EST" }, // New York is IST - 10.5 hours (or -9.5 under DST, let's use -10.5)
  { name: "Europe/London", label: "Europe/London (GMT)", offset: -5.5, tzCode: "GMT" },
  { name: "Europe/Paris", label: "Europe/Paris (CET)", offset: -4.5, tzCode: "CET" },
  { name: "Asia/Singapore", label: "Asia/Singapore (SGT)", offset: 2.5, tzCode: "SGT" },
  { name: "Asia/Dubai", label: "Asia/Dubai (GST)", offset: -1.5, tzCode: "GST" },
  { name: "Australia/Sydney", label: "Australia/Sydney (AEST)", offset: 4.5, tzCode: "AEST" }
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [is24h, setIs24h] = useState(true);
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "iamabhids@gmail.com",
    company: "",
    details: "",
    interest: "AI Voice Agent"
  });

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun, 6 = Sat

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Generate blank offset cells and day cells
  const days = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    if (checkDate < today) return true;
    return false;
  };

  const isToday = (date: Date) => {
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date)) return;
    setSelectedDate(date);
    setSelectedSlot(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);
    }, 1200);
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return "";
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // Shift slot time relative to timezone offset
  const formatSlot = (slot24: string) => {
    if (!slot24) return "";
    const [hourStr, minStr] = slot24.split(":");
    const hour = parseInt(hourStr);
    const min = parseInt(minStr);

    const selectedTz = TIMEZONES.find(t => t.name === timezone) || TIMEZONES[0];
    const offsetMinutes = selectedTz.offset * 60;

    let totalMinutes = hour * 60 + min + offsetMinutes;
    // Keep within [0, 24*60)
    while (totalMinutes < 0) totalMinutes += 24 * 60;
    totalMinutes = totalMinutes % (24 * 60);

    const shiftedH = Math.floor(totalMinutes / 60);
    const shiftedM = totalMinutes % 60;

    const formattedH = String(shiftedH).padStart(2, "0");
    const formattedM = String(shiftedM).padStart(2, "0");

    if (is24h) {
      return `${formattedH}:${formattedM}`;
    } else {
      const ampm = shiftedH >= 12 ? "PM" : "AM";
      const hour12 = shiftedH % 12 || 12;
      return `${hour12}:${formattedM} ${ampm}`;
    }
  };

  const getTzCode = () => {
    const selectedTz = TIMEZONES.find(t => t.name === timezone) || TIMEZONES[0];
    return selectedTz.tzCode;
  };

  return (
    <div className="calendar-layout" style={{ textAlign: "left" }}>
      {bookingSuccess && selectedDate ? (
        <div className="booking-success-card" style={{ border: "none", boxShadow: "none", padding: 0, width: "100%", maxWidth: "100%" }}>
          <div className="booking-success-icon">
            <CheckCircle2 size={48} />
          </div>
          <div>
            <h2 style={{ fontSize: "28px", fontWeight: 600, marginBottom: "8px", textAlign: "center" }}>Audit Booked Successfully!</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "16px", textAlign: "center" }}>
              We are thrilled to explore automation opportunities with you.
            </p>
          </div>

          <div style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "24px",
            width: "100%",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "8px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ fontSize: "20px" }}>✦</div>
              <div>
                <strong style={{ color: "var(--text-primary)" }}>Free 30-Minute Automation Audit</strong>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>With Abhi Gupta, Founder of Aepers</p>
              </div>
            </div>
            <div className="divider" />
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--text-secondary)" }}>
                <CalendarIcon size={16} className="text-accent" />
                <span>{formatSelectedDate()}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--text-secondary)" }}>
                <Clock size={16} className="text-accent" />
                <span>{formatSlot(selectedSlot || "")} ({getTzCode()})</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--text-secondary)" }}>
                <Globe size={16} className="text-accent" />
                <span>Google Meet (Invite sent to {formData.email})</span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, textAlign: "center" }}>
            A calendar invite and detailed confirmation in **{timezone}** timezone have been sent to <strong>{formData.email}</strong>. Please check your inbox (and spam folder, just in case). We look forward to meeting you!
          </p>
        </div>
      ) : (
        <>
          {/* Column 1: Left Details Panel */}
          <div className="calendar-sidebar">
            <div className="calendar-profile" style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
              <div className="calendar-avatar-img" style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF7A35 0%, #F56211 100%)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: "15px",
                boxShadow: "0 4px 12px rgba(245, 98, 17, 0.15)",
                border: "2px solid white"
              }}>
                AG
              </div>
              <div>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)" }}>Abhi Gupta</span>
                <h2 className="calendar-sidebar-title" style={{ fontSize: "20px", marginTop: "4px" }}>30 min meeting</h2>
              </div>
            </div>

            <ul className="calendar-meta-list" style={{ gap: "12px" }}>
              <li className="calendar-meta-item" style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", fontSize: "14px" }}>
                <Clock size={16} />
                <span>30m</span>
              </li>
              <li className="calendar-meta-item" style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", fontSize: "14px" }}>
                <GoogleMeetLogo />
                <span>Google Meet</span>
              </li>
              
              {/* Interactive Timezone Picker Dropdown */}
              {/* Native styled timezone select list to prevent clipping */}
              <li className="calendar-meta-item">
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", fontSize: "14px" }}>
                  <Globe size={16} />
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                      cursor: "pointer",
                      padding: 0,
                      fontFamily: "inherit",
                      outline: "none",
                      boxShadow: "none",
                      fontWeight: 500,
                      marginRight: "4px"
                    }}
                  >
                    {TIMEZONES.map(tz => (
                      <option key={tz.name} value={tz.name} style={{ background: "var(--surface)", color: "var(--text-primary)" }}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                  <span style={{ fontSize: "9px", opacity: 0.7, pointerEvents: "none", marginLeft: "-4px" }}>▼</span>
                </div>
              </li>
            </ul>

            {selectedDate && (
              <div style={{ marginTop: "auto", paddingTop: "20px" }}>
                <div className="divider" />
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--accent)", fontWeight: 600 }}>
                    <CalendarIcon size={14} />
                    <span>{formatSelectedDate()}</span>
                  </div>
                  {selectedSlot && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--accent)", fontWeight: 600 }}>
                      <Clock size={14} />
                      <span>{formatSlot(selectedSlot)} ({getTzCode()})</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area: switches between Date-Time Selector and Booking Form */}
          {!showForm ? (
            <div className="calendar-picker-container">
              {/* Column 2: Date Picker Panel */}
              <div className="calendar-datepicker-panel">
                {/* Month selector header */}
                <div className="calendar-header-actions" style={{ marginBottom: "24px" }}>
                  <span className="calendar-month-title" style={{ fontSize: "15px", fontWeight: 600 }}>
                    {MONTHS[month]} {year}
                  </span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      type="button"
                      className="calendar-nav-btn"
                      onClick={handlePrevMonth}
                      disabled={month === today.getMonth() && year === today.getFullYear()}
                      aria-label="Previous month"
                      style={{ width: "30px", height: "30px" }}
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      type="button"
                      className="calendar-nav-btn"
                      onClick={handleNextMonth}
                      aria-label="Next month"
                      style={{ width: "30px", height: "30px" }}
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Weekday labels */}
                <div className="calendar-days-grid" style={{ marginBottom: "12px" }}>
                  {WEEKDAYS.map(day => (
                    <div key={day} className="calendar-weekday-label" style={{ fontSize: "11px", color: "#6B7280" }}>
                      {day}
                    </div>
                  ))}
                </div>

                {/* Day cells grid */}
                <div className="calendar-days-grid">
                  {days.map((date, idx) => {
                    if (!date) {
                      return <div key={`empty-${idx}`} style={{ aspectRatio: 1 }} />;
                    }

                    const disabled = isDateDisabled(date);
                    const selected = isSelected(date);
                    const currentToday = isToday(date);

                    let cellClass = "calendar-day-cell";
                    if (disabled) {
                      cellClass += " disabled-day";
                    } else if (selected) {
                      cellClass += " selected-day";
                    } else {
                      cellClass += " active-day";
                    }

                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        className={cellClass}
                        disabled={disabled}
                        onClick={() => handleDateSelect(date)}
                        aria-label={`Select ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
                        aria-selected={selected}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "2px",
                          borderRadius: "8px"
                        }}
                      >
                        <span>{date.getDate()}</span>
                        <span style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          background: selected ? "white" : (currentToday ? "var(--accent)" : "transparent"),
                          display: "block"
                        }} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Column 3: Time Slots Picker Panel */}
              <div className={`calendar-slots-panel ${selectedDate ? "open" : ""}`}>
                {selectedDate ? (
                  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", justifySpace: "space-between", justifyContent: "space-between", marginBottom: "20px" }}>
                      <span className="slots-title" style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                        {selectedDate.toLocaleDateString("en-US", { weekday: "short", day: "numeric" })}
                      </span>
                      <div style={{ display: "flex", background: "rgba(0,0,0,0.05)", borderRadius: "8px", padding: "2px" }}>
                        <button
                          type="button"
                          onClick={() => setIs24h(false)}
                          style={{
                            border: "none",
                            background: !is24h ? "white" : "none",
                            boxShadow: !is24h ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                            borderRadius: "6px",
                            fontSize: "11px",
                            fontWeight: 600,
                            padding: "4px 8px",
                            cursor: "pointer",
                            color: !is24h ? "var(--text-primary)" : "var(--text-secondary)",
                            transition: "all 0.2s"
                      }}
                    >
                      12h
                    </button>
                    <button
                      type="button"
                      onClick={() => setIs24h(true)}
                      style={{
                        border: "none",
                        background: is24h ? "white" : "none",
                        boxShadow: is24h ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "4px 8px",
                        cursor: "pointer",
                        color: is24h ? "var(--text-primary)" : "var(--text-secondary)",
                        transition: "all 0.2s"
                      }}
                    >
                      24h
                    </button>
                  </div>
                </div>

                <div className="slots-vertical-list">
                  {TIME_SLOTS.map(slot => {
                    const isThisSlotSelected = selectedSlot === slot;
                    return (
                      <div key={slot} className="slot-item-wrapper">
                        <button
                          type="button"
                          className={`slot-chip ${isThisSlotSelected ? "selected-slot" : ""}`}
                          onClick={() => setSelectedSlot(slot)}
                          style={{
                            flex: isThisSlotSelected ? "0.6" : "1",
                            padding: "12px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: 600,
                            border: "1px solid var(--border)",
                            background: isThisSlotSelected ? "#4B5563" : "white",
                            color: isThisSlotSelected ? "white" : "var(--accent)",
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                        >
                          {formatSlot(slot)}
                        </button>
                        {isThisSlotSelected && (
                          <button
                            type="button"
                            className="slot-confirm-btn"
                            onClick={() => setShowForm(true)}
                            style={{
                              flex: "0.4",
                              background: "var(--accent)",
                              color: "white",
                              border: "none",
                              borderRadius: "8px",
                              fontSize: "14px",
                              fontWeight: 600,
                              cursor: "pointer",
                              boxShadow: "0 4px 12px rgba(245, 98, 17, 0.2)"
                            }}
                          >
                            Confirm
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="slots-placeholder">
                Select a date to view available times
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Booking Confirmation Form Panel */
        <div className="calendar-form-panel">
          <button
            type="button"
            className="calendar-form-back-btn"
            onClick={() => setShowForm(false)}
          >
            <ArrowLeft size={16} /> Edit Date & Time
          </button>
          
          <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={18} className="text-accent" />
            <span>Confirm your contact details</span>
          </h3>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div className="form-group">
                <label className="form-label" htmlFor="book-name">Your Name *</label>
                <div style={{ position: "relative" }}>
                  <User size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-secondary)" }} />
                  <input
                    id="book-name"
                    className="form-input"
                    style={{ paddingLeft: "42px" }}
                    type="text"
                    placeholder="Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="book-email">Email Address *</label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-secondary)" }} />
                  <input
                    id="book-email"
                    className="form-input"
                    style={{ paddingLeft: "42px" }}
                    type="email"
                    placeholder="rahul@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div className="form-group">
                <label className="form-label" htmlFor="book-company">Company / Business Name</label>
                <div style={{ position: "relative" }}>
                  <Building size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-secondary)" }} />
                  <input
                    id="book-company"
                    className="form-input"
                    style={{ paddingLeft: "42px" }}
                    type="text"
                    placeholder="Sharma & Co."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="book-interest">Primary Automation Interest *</label>
                <select
                  id="book-interest"
                  className="form-input"
                  style={{ cursor: "pointer" }}
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  required
                >
                  <option value="AI Voice Agent">AI Voice Agent / Receptionist</option>
                  <option value="RAG Chatbot">RAG Knowledge Chatbot</option>
                  <option value="Workflow Automation">Workflow / Process Automation</option>
                  <option value="Data Pipeline">NL Data Pipelines & Dashboards</option>
                  <option value="General Audit">Not sure — general workflow audit</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "20px" }}>
              <label className="form-label" htmlFor="book-details">What is the #1 manual process you want to automate? *</label>
              <textarea
                id="book-details"
                className="form-input form-textarea"
                placeholder="e.g. answering basic calls after-hours, typing customer leads into CRM, matching invoice receipts..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", gap: "12px" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Securing slot..." : `Schedule Audit for ${selectedSlot} →`}
            </button>
          </form>
        </div>
      )}
    </>
  )}
</div>
);
}
