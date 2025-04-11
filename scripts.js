let events = JSON.parse(localStorage.getItem('events')) || [];

document.getElementById('addBtn').addEventListener('click', () => {
    document.getElementById('eventForm').style.display = 'block';
});

document.getElementById('submitBtn').addEventListener('click', () => {
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;

    if (title && date && time) {
        events.push({ title, date, time });
        localStorage.setItem('events', JSON.stringify(events));
        resetForm();
        displayEvents();
    }
});

function resetForm() {
    document.getElementById('eventForm').style.display = 'none';
    document.getElementById('eventTitle').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventTime').value = '';
}

function displayEvents() {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';
    const now = new Date();

    const sortedEvents = events
        .map(event => ({
            ...event,
            eventDateTime: new Date(`${event.date}T${event.time}`)
        }))
        .filter(event => event.eventDateTime - now >= 0)
        .sort((a, b) => a.eventDateTime - b.eventDateTime);

    sortedEvents.forEach((event, index) => {
        const timeDiff = event.eventDateTime - now;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        const eventDiv = document.createElement('div');
        eventDiv.className = 'event-card';

        if (days === 0 && hours < 3) {
            eventDiv.style.borderColor = "#ff8800";
            eventDiv.style.backgroundColor = "#fff3e0";
        }

        eventDiv.innerHTML = `
            <button class="deleteBtn" onclick="deleteEvent(${index})">✕</button>
            <div class="event-title">${event.title}</div>
            <div class="event-time">${event.date} @ ${event.time}</div>
            <div class="event-countdown">${days}d ${hours}h ${minutes}m left</div>
        `;
        eventList.appendChild(eventDiv);
    });
}

function deleteEvent(index) {
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
    displayEvents();
}

displayEvents();
