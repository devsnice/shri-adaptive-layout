import Widget from "../components/widget/widget";

class IndexPage {
  constructor() {
    this.init();
  }

  renderDashboardWidgets(events) {
    const dashboardWidgetsList = document.getElementById("dashboard-list");

    events.forEach(event => {
      new Widget({
        event,
        container: dashboardWidgetsList
      });
    });
  }

  loadEvents() {
    return fetch("http://localhost:8000/api/events", {
      method: "POST",
      body: JSON.stringify({
        type: "critical:info",
        offset: 0,
        limit: 20
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(result => result)
      .catch(err => alert(err));
  }

  init() {
    this.loadEvents().then(events => {
      this.renderDashboardWidgets(events);
    });
  }
}

export default IndexPage;