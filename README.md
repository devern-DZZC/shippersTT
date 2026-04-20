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

- **Frontend**: React 18 + TypeScript, Vite
- **Backend**: Flask (Python), Gunicorn
- **ML Libraries**: `pandas`, `numpy`, `scikit-learn`, `catboost`, `joblib`
- **Deployment**: API on Fly.io · Frontend as static site (Vercel / Netlify / Cloudflare Pages)

---

## 📁 Repository Structure

```
shippersTT/
├── backend/          # Flask API (Python)
│   ├── app.py
│   ├── models.py
│   ├── wsgi.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .env.example
│   └── model/        # ML pickle files (not committed — copy from shippers-web-app/model/)
└── frontend/         # Vite + React + TypeScript SPA
    ├── src/
    │   ├── api/      # Typed API client
    │   ├── components/   # Layout, Navbar, Footer
    │   ├── pages/    # Home, Calculator, About, Contact
    │   └── styles/   # CSS (matches original design)
    ├── public/       # Static assets — copy shippers_logo.jpeg and shein_items.jpg here
    ├── vite.config.ts
    └── .env.example
```

---

## 🚀 Development Setup

### Backend

```bash
cd backend
python -m venv venv
# Windows:  venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt

# Copy .env.example → .env and fill in values
cp .env.example .env

# Copy ML model files from the original location
# cp -r ../shippers-web-app/model ./model

flask run --port 5003
```

### Frontend

```bash
cd frontend
npm install

# Copy .env.example → .env (leave VITE_API_BASE_URL empty for local dev)
cp .env.example .env

# Copy static assets into public/
# cp ../shippers-web-app/static/shippers_logo.jpeg ./public/
# cp ../shippers-web-app/static/shein_items.jpg   ./public/   (if it exists)

npm run dev
# → http://localhost:5173 — proxied /predict calls go to http://localhost:5003
```

### Production Build

```bash
cd frontend
npm run build   # outputs to frontend/dist/
```

Deploy `dist/` to Vercel, Netlify, or Cloudflare Pages.  
Set the `VITE_API_BASE_URL` environment variable in your static host dashboard to your Fly.io API URL, e.g. `https://shipperstt-api.fly.dev`.

---

## 🔌 API Reference

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check (returns `{"status":"ok"}`) |
| `POST` | `/predict` | Returns shipping cost estimate |

**POST `/predict`** — accepts `application/json` or `multipart/form-data`:

```json
{ "category": "electronics", "price": 500, "weight": 3 }
```

Response:

```json
{
  "item_cost": 3400.00,
  "tax": 238.00,
  "shipping": 45.20,
  "service_charge": 552.48,
  "total_cost": 4235.68
}
```

---

## 🐳 Docker (Backend)

```bash
cd backend
docker build -t shipperstt-api .
docker run -p 5003:5003 \
  -e SECRET_KEY=... \
  -e JWT_SECRET_KEY=... \
  -e CORS_ORIGINS=https://your-frontend.vercel.app \
  shipperstt-api
```

---

## ⚙️ How It Works

1. User selects a **category** (e.g., shoes, electronics, clothing).
2. User enters the **weight** of the package in pounds.
3. The app feeds this input into a trained **regression model**.
4. The model outputs the **estimated clearing cost**, which is then used to calculate the final price (converted from USD and marked up).
5. The user receives a detailed quote in **TTD**.

---
