function addAssignment() {
    const name = document.getElementById("assignment-name").value.trim();
    const date = document.getElementById("assignment-date").value;

    if (!name || !date) {
      alert("Please enter both name and date.");
      return;
    }

    const assignmentList = document.getElementById("assignments-list");

    const assignmentItem = document.createElement("div");
    assignmentItem.className = "assignment-item";

    const countdownEl = document.createElement("p");
    countdownEl.className = "countdown";

    const textContainer = document.createElement("div");
    textContainer.className = "assignment-text";
    textContainer.innerHTML = `<strong>${name}</strong>`;
    textContainer.appendChild(countdownEl);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "delete";
    deleteBtn.onclick = () => assignmentItem.remove();

    assignmentItem.appendChild(textContainer);
    assignmentItem.appendChild(deleteBtn);
    assignmentList.appendChild(assignmentItem);

    const targetDate = new Date(date).getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        countdownEl.textContent = "Deadline passed";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((distance % (1000 * 60)) / 1000);

      countdownEl.textContent = `Only ${days}d ${hrs}h ${mins}m ${secs}s Left`;
    }

    updateCountdown();
    const interval = setInterval(() => {
      if (!document.body.contains(assignmentItem)) {
        clearInterval(interval);
      } else {
        updateCountdown();
      }
    }, 1000);
  }
