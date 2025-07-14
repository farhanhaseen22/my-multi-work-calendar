
# --- Sample: main.py ---
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from app import gpt_utils, db, map_utils

app = FastAPI()
templates = Jinja2Templates(directory="app/templates")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/search")
async def search_food(request: Request, query: str = Form(...)):
    filters = await gpt_utils.extract_filters(query)
    coords = await map_utils.get_coordinates(filters["location"])
    food_items = db.search_food(filters)
    return templates.TemplateResponse("index.html", {
        "request": request,
        "filters": filters,
        "food_items": food_items,
        "map_coords": coords
    })


# --- Sample: gpt_utils.py ---
from openai import OpenAI
from dotenv import load_dotenv
import os
import json


load_dotenv()  # Load .env file into environment
openai_api_key = os.getenv("OPENAI_API_KEY")


client = OpenAI(api_key=os.getenv(openai_api_key))

async def extract_filters(user_query: str) -> dict:
    prompt = f"""Extract JSON filters from this query: '{user_query}'\n
Return JSON with keys: category, location, target_audience."""
    resp = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )
    return json.loads(resp.choices[0].message.content)



# --- Sample: map_utils.py ---
import requests
import os

MAPBOX_TOKEN = os.getenv("MAPBOX_TOKEN")

async def get_coordinates(location: str) -> dict:
    url = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{location}.json?access_token={MAPBOX_TOKEN}"
    resp = requests.get(url)
    data = resp.json()
    coords = data['features'][0]['center']  # [lon, lat]
    return {"lon": coords[0], "lat": coords[1]}


# --- Sample: index.html ---
<!-- Basic HTML with form and map placeholder -->
<html>
<head>
  <title>Community Food Map</title>
  <script src='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js'></script>
  <link href='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css' rel='stylesheet' />
</head>
<body>
  <form method="post" action="/search">
    <input type="text" name="query" placeholder="e.g., Non-perishable food near Rabbittown">
    <button type="submit">Search</button>
  </form>

  <div id="map" style="width: 600px; height: 400px;"></div>
  <script>
    mapboxgl.accessToken = '{{ MAPBOX_TOKEN }}';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [{{ map_coords.lon }}, {{ map_coords.lat }}],
      zoom: 13
    });
    new mapboxgl.Marker().setLngLat([{{ map_coords.lon }}, {{ map_coords.lat }}]).addTo(map);
  </script>
</body>
</html>



# --- Sample: 📁 .env file ---
OPENAI_API_KEY=your-openai-key-here
MAPBOX_TOKEN=your-mapbox-token-here








