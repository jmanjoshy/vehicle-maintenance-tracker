import { useState, useEffect } from 'react';
import './App.css';

function App() {
  
const [maintenanceRecords, setMaintenanceRecords] = useState(() => {
  try {
    const savedRecords = localStorage.getItem('maintenanceRecords');

    return savedRecords ? JSON.parse(savedRecords) : [];
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem(
    'maintenanceRecords',
    JSON.stringify(maintenanceRecords)
  );
}, [maintenanceRecords]);

  const [service, setService] = useState('');
  const [odometer, setOdometer] = useState('');
  const [cost, setCost] = useState('');

  
function addMaintenance(event) {
  event.preventDefault();

  const newRecord = {
    id: crypto.randomUUID(),
    service: service.trim(),
    odometer: Number(odometer),
    cost: Number(cost)
  };

  if (
    !newRecord.service ||
    odometer === '' ||
    cost === '' ||
    !Number.isFinite(newRecord.odometer) ||
    !Number.isFinite(newRecord.cost) ||
    newRecord.odometer < 0 ||
    newRecord.cost < 0
  ) {
    return;
  }

  setMaintenanceRecords((previousRecords) => [
    ...previousRecords,
    newRecord
  ]);

  setService('');
  setOdometer('');
  setCost('');
}


  return (
    <main className="dashboard">
      <h1>Vehicle Maintenance Tracker</h1>
      <p>Manage your vehicle's maintenance and expenses.</p>

      <section className="vehicle-card">
        <h2>My Vehicle</h2>
        <p>2022 Subaru WRX</p>
        <p>Odometer: {Number(63000).toLocaleString()} km</p>
      </section>

<section className="maintenance">
  <h2>Add Maintenance</h2>

  <form onSubmit={addMaintenance}>
    <label htmlFor="service">Service</label>
    <input
      id="service"
      type="text"
      placeholder="e.g. Oil Change"
      value={service}
      onChange={(event) => setService(event.target.value)}
      required
    />

    <label htmlFor="odometer">Odometer (km)</label>
    <input
      id="odometer"
      type="number"
      min="0"
      placeholder="e.g. 65000"
      value={odometer}
      onChange={(event) => setOdometer(event.target.value)}
      required
    />

    <label htmlFor="cost">Cost ($)</label>
    <input
      id="cost"
      type="number"
      min="0"
      step="0.01"
      placeholder="e.g. 150"
      value={cost}
      onChange={(event) => setCost(event.target.value)}
      required
    />

    <button type="submit">Add Record</button>
  </form>
</section>

      <section className="maintenance">
        <h2>Maintenance History</h2>

        {maintenanceRecords.length === 0 ? (
        <p>No maintenance records added yet.</p>
        ) : (
          <ul>
            {maintenanceRecords.map((record) => (
              <li key={record.id}> 
              {record.service} - {record.odometer.toLocaleString()} km - ${record.cost.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
