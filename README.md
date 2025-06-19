# 📦 ShippersTT – ML-Powered Shipping Cost Estimator

ShippersTT is a machine learning–powered web application that helps predict the shipping and customs clearing cost of U.S. products for customers in Trinidad and Tobago. Built to support my real-world e-commerce logistics service, this tool uses real and synthetic data to automate manual quoting and improve customer transparency.


## 🚀 Live Demo

🔗 [Visit the Live App](https://shipperstt.onrender.com)

---

## 🧠 Key Features

- 💡 **ML-Based Cost Prediction**: Uses a trained regression model on historical customs clearing data to estimate shipping costs.
- 📝 **Simple Input Form**: Customers enter the item category and weight to generate a cost estimate.
- 📊 **Trained on Local Data**: Model uses real-world shipping and customs patterns from Trinidad & Tobago, enhanced with synthetic data for robustness.
- 🧮 **Full Quote Output**: Final price includes duties, shipping fees, and a fixed markup rate for business use.
- 🌐 **Deployed Web App**: Fully functional app using Flask for the backend and HTML/CSS for the frontend, hosted on Render.

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (optional: Tailwind or Bootstrap if used)
- **Backend**: Flask (Python)
- **ML Libraries**: `pandas`, `numpy`, `scikit-learn`
- **Deployment**: Render (used due to serverless limitations with Vercel)

---

## ⚙️ How It Works

1. User selects a **category** (e.g., shoes, electronics, clothing).
2. User enters the **weight** of the package in pounds.
3. The app feeds this input into a trained **regression model**.
4. The model outputs the **estimated clearing cost**, which is then used to calculate the final price (converted from USD and marked up).
5. The user receives a detailed quote in **TTD**.

---
