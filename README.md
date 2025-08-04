# 📡 Real-Time Network Traffic Simulator

A real-time simulator for visualizing network traffic across a telecom-style network. Nodes generate packets based on time-dependent traffic rates. Packets are routed via the shortest path, and link capacities are monitored to simulate congestion and queue buildup.

---

## 🔧 Tech Stack

| Layer         | Technologies Used                              |
|---------------|-------------------------------------------------|
| **Frontend**  | React, Tailwind CSS, Recharts, React Flow       |
| **Backend**   | Node.js, Express.js                             |

---

## 🎯 Features

### 🚀 Real-Time Simulation
- Traffic auto-updates every 1 second
- Each node generates packets based on the current time
- Packets routed using BFS shortest path algorithm

### 📦 Queuing and Capacity Handling
- Links have defined capacity
- If link is full, packet is queued at source node

### 📊 Visual Dashboards
- **Line Chart**: Packets generated vs. queued per node
- **Bar Chart**: Used vs. capacity per link
- **Interactive Graph**: Nodes and links visualized with traffic color coding (green/yellow/red)

---

## 🖥️ Screenshots
<img width="1903" height="678" alt="image" src="https://github.com/user-attachments/assets/128dc1df-6eda-4401-bef6-d6ca505f2de4" />


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e874fe73-eca5-43dc-8e14-134d63ff256c" />

---

## 🛠️ How It Works

### 1. Packet Generation
```js
trafficRates = {
  "09:00": { A: 70, B: 50, C: 60, D: 40, E: 80, F: 65, G: 55 },
  ...
}
```

### 2. Routing
- Random destination assigned
- Packets routed using BFS over links

### 3. Link Capacity
- Each link has fixed `capacity`
- Link usage tracked per simulation step
- If over limit, packet gets queued

---


---

## 🧪 Run Locally

### 🖥 Backend

```bash
cd backend
npm install
node index.js
```

### 🌐 Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📬 Submission Info

Submitted by: **Raj Malave**  
Roll No: `A751`  
Email: `rajmalave4@gmail.com`  
contact: `9146856993`

