```python
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn

app = FastAPI(title="Luxury Smart Watch Landing Page")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def landing_page(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "title": "Horizon X - Luxury Smart Watch",
            "product_name": "Horizon X",
            "tagline": "Where Elegance Meets Innovation",
            "price": "$2,499",
            "features": [
                {"icon": "💎", "title": "Sapphire Crystal", "description": "Scratch-resistant display"},
                {"icon": "⚡", "title": "7-Day Battery", "description": "Ultra-efficient power management"},
                {"icon": "🌊", "title": "100m Water Resistant", "description": "Dive-ready construction"},
                {"icon": "❤️", "title": "Health Monitoring", "description": "ECG, SpO2, sleep tracking"},
                {"icon": "📡", "title": "GPS + Cellular", "description": "Stay connected anywhere"},
                {"icon": "🎨", "title": "Customizable Face", "description": "Thousands of watch faces"}
            ],
            "specifications": [
                {"label": "Display", "value": "1.5\" AMOLED, 466x466"},
                {"label": "Processor", "value": "Snapdragon W5+ Gen 1"},
                {"label": "Storage", "value": "32GB"},
                {"label": "RAM", "value": "2GB"},
                {"label": "OS", "value": "Wear OS 4.0"},
                {"label": "Material", "value": "Titanium + Ceramic"},
                {"label": "Weight", "value": "52g"},
                {"label": "Warranty", "value": "2 Years"}
            ],
            "reviews": [
                {"name": "Alex M.", "rating": 5, "text": "Absolutely stunning timepiece. The craftsmanship is unmatched."},
                {"name": "Sarah K.", "rating": 5, "text": "Best smartwatch I've ever owned. Battery life is incredible."},
                {"name": "James R.", "rating": 4, "text": "Premium build quality. Worth every penny."}
            ]
        }
    )

@app.get("/api/product", response_class=HTMLResponse)
async def product_api():
    return {
        "name": "Horizon X",
        "price": 2499,
        "currency": "USD",
        "available": True,
        "colors": ["Midnight Black", "Silver Titanium", "Rose Gold"]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```