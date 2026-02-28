/*
Name: Raymundo Licon Castaneda
Date created: Feb 25, 2026
Date Last Updated: Feb 27, 2026
Purpose: Homework 1 Clinic Form

Notes
- Displays today's date
- Added live character counter for notes
- Live pain level output for slider
- match password
*/

document.addEventListener("DOMContentLoaded", () => {
  // Today's date
  const todaySpan = document.getElementById("today");
  if (todaySpan) {
    const now = new Date();
    todaySpan.textContent = now.toLocaleDateString();
  }

  // Pain slider (1–10)
  const range = document.getElementById("range");
  const rangeOut = document.getElementById("range-slider");

  const updateRange = () => {
    if (range && rangeOut) rangeOut.textContent = `Pain Level: ${range.value}/10`;
  };
  // Depression slider output (1–10)
  const depression = document.getElementById("depression");
  const depressionOut = document.getElementById("depression-slider");

  const updateDepression = () => {
    if (depression && depressionOut) {
      depressionOut.textContent = `Depression Level: ${depression.value}/10`;
    }
  };

  if (depression && depressionOut) {
    updateDepression();
    depression.addEventListener("input", updateDepression);
  }
  if (range && rangeOut) {
    updateRange();
    range.addEventListener("input", updateRange);
  }

  // Stress slider output (1–10)
  const stress = document.getElementById("stress");
  const stressOut = document.getElementById("stress-slider");

  const updateStress = () => {
  if (stress && stressOut) stressOut.textContent = `Stress Level: ${stress.value}/10`;
  };

  if (stress && stressOut) {
  updateStress();
  stress.addEventListener("input", updateStress);
  }


  // character counter
  const notes = document.getElementById("notes");
  const desc = document.getElementById("description_text");

  const updateCount = () => {
    if (notes && desc) desc.textContent = `Notes: ${notes.value.length}/500`;
  };

  if (notes && desc) {
    updateCount();
    notes.addEventListener("input", updateCount);
  }

  // Password check
  const form = document.querySelector("form");
  const p1 = document.getElementById("password1");
  const p2 = document.getElementById("password2");

  if (form && p1 && p2) {
    form.addEventListener("submit", (e) => {
      if (p1.value !== p2.value) {
        e.preventDefault();
        alert("Passwords do not match.");
        p2.focus();
      }
    });
  }
});