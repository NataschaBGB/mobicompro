# ⚡ MobiComPro

A React-based web application for visualizing energy consumption data in a clear and user-friendly interface.
This project was developed based on Mobicom’s own repository, where they provided the assignment as part of the project.
Link to the assignment: https://github.com/mobicom-pro-aps/frontend-developer-exercise?tab=readme-ov-file

---

## 🧩 My Approach

I focused on creating a clear component structure, separating logic from UI where possible, and ensuring the code would be easy to understand for others and maintain.

Some of the decisions I made included:

* Structuring the project using reusable components rather than placing everything in a few large files

* Separating styling using SASS to keep styles modular and easier to manage

* Handling incomplete or inconsistent data from the API to ensure the UI remains stable

* Replacing all icon files with react icons for easy switch between inactive and active icon colors.

During development, I tried to make the rounded slider for the heat adjustment as close to the original design as possible. I ended up with a slider that came close, but never managed to hit the original design spot on.
I also chose to add a tiny bit of function to the menu icon on the front page - The burgermenu icon.
    - Although the links do not work, the icon itself has animation when clicked.

Overall, my approach focused on handling:

* Clean code structure

* User experience

* Maintainability

* Functionality

* Design

I will admit that I found this assignment challenging. While some parts were relatively straightforward to set up and match the original design, the overall scope turned out to be much larger than I initially expected.

In particular, the circular slider for adjusting the temperature was difficult to implement and style correctly. Although it does not perfectly match the design given, I am quite satisfied with how it turned out.

It has been a significant challenge, but one that I genuinely enjoyed working on and completing.

---

## ✨ Features

* 🔄 Dynamic data handling and transformation
* 🌐 Data is fetched from an external API for real-time updates
* 🧩 Component-based architecture
* 🎨 Styled using SCSS for modular and maintainable styling
* 📊 Data visualization using chart
* 📉 Comparison between actual usage and average consumption
* 🎯 Highlighting of important data points (e.g. current day)

---

## 🛠 Tech Stack

* **React**
* **React Router**
* **React Icons**
* **JavaScript (ES6+)**
* **Recharts** (data visualization)
* **SCSS (Sass)** (styling)

---

## 📁 Project Structure

```bash
src/
├── components/
│   ├── Header/
│   ├── HeatMode/
│   ├── HeatThermostat/
│   ├── HeatThermostatOnOff/
│   ├── HeatVent/
│   ├── Navigation/
│   ├── Preset/
│   ├── Rooms/
│   ├── SmartSettings/
│   ├── StatisticsExpenses/
│   ├── StatisticsUsage/
│   └── UsedEnergy
│
├── loaders/
│   ├── devicesLoader.js
│   ├── homeLoader.js
│   └── statisticsLoader.js
│
├── hooks/
│   ├── useHeatDevice.js
│   └── useLocalStorage.js
│
├── pages/
│   ├── Error.jsx
│   ├── Heat.jsx
│   ├── Home.jsx
│   ├── Light.jsx
│   ├── Statistics.jsx
│   └── Thermostat.jsx
│
├── style/
│   ├── _layout.sass
│   └── _variables_.sass
│
├── App.jsx
├── main.jsx
└── main.sass
```

> The project follows a component-based structure where each UI element is isolated and reusable.
