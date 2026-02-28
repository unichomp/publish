/*
Name: Raymundo Licon Castaneda
Date created: Feb 25, 2026
Date Last Updated: Feb 27, 2026
Purpose: Homework 1 JS

This file is shared across ALL pages (patient-form.html, ThankYou.html, MentalHealth.html)
adds functionalities to pages
*/

document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);

  // time/date
  const todaySpan = byId("today");
  const clockSpan = byId("clock");

  if (todaySpan || clockSpan) {
    const ctDateFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const ctTimeFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const updateCentralTime = () => {
      const now = new Date();
      if (todaySpan) todaySpan.textContent = ctDateFormatter.format(now);
      if (clockSpan) clockSpan.textContent = ctTimeFormatter.format(now);
    };

    updateCentralTime();
    setInterval(updateCentralTime, 1000);
  }

  // 2 Sliders
  const hookSlider = (sliderId, outputId, label) => {
    const slider = byId(sliderId);
    const output = byId(outputId);

    const render = () => {
      if (slider && output) output.textContent = `${label}: ${slider.value}/10`;
    };

    if (slider && output) {
      render();
      slider.addEventListener("input", render);
    }

    // reset
    return render;
  };

  const renderPain = hookSlider("range", "range-slider", "Pain Level");
  const renderDepression = hookSlider("depression", "depression-slider", "Depression Level");
  const renderStress = hookSlider("stress", "stress-slider", "Stress Level");
  const attachCharCounter = (textareaId, counterSpanId, maxChars) => {
    const ta = byId(textareaId);
    if (!ta) return null;

    let counter = byId(counterSpanId);
    if (!counter) {
      counter = document.createElement("span");
      counter.id = counterSpanId;
      counter.className = "char-counter";
      ta.insertAdjacentElement("afterend", counter);

      // add spacing
      ta.insertAdjacentHTML("afterend", "<br /><br />");
    }

    const render = () => {
      const remaining = maxChars - ta.value.length;
      counter.textContent = `Characters remaining: ${remaining}`;
    };

    render();
    ta.addEventListener("input", render);
    return render;
  };

  
  const renderNotes = attachCharCounter("notes", "description_text", 500);
  const renderMHNotes = attachCharCounter("mhNotes", "mh_description_text", 500);

  // Password check 
  const form = document.querySelector("form");
  const p1 = byId("password1");
  const p2 = byId("password2");
  const depressionSlider = byId("depression");

  if (form) {
    form.addEventListener("submit", (e) => {
      if (p1 && p2 && p1.value !== p2.value) {
        e.preventDefault();
        alert("Passwords do not match.");
        p2.focus();
        return;
      }

      //goes to ThankYou.html.
      if (depressionSlider && Number(depressionSlider.value) >= 8) {
        window.open("MentalHealth.html", "_blank");
      }
    });

    form.addEventListener("reset", () => {
      setTimeout(() => {
        if (typeof renderPain === "function") renderPain();
        if (typeof renderDepression === "function") renderDepression();
        if (typeof renderStress === "function") renderStress();
        if (typeof renderNotes === "function") renderNotes();
        if (typeof renderMHNotes === "function") renderMHNotes();
      }, 0);
    });
  }
});