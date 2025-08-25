from typing import Optional
from datetime import date, timedelta
from datetime import datetime
import httpx

from config.envs import BCRA_ACCESS_TOKEN

def get_dolar_stadistics():
    response = httpx.get("https://api.estadisticasbcra.com/usd", headers={ "Authorization": f"BEARER {BCRA_ACCESS_TOKEN}"})
    if response.status_code == 200:
        data = response.json()
        return data
    
def get_dolar_price(datetime: Optional[datetime] = None):
    response = httpx.get("https://api.argentinadatos.com/v1/cotizaciones/dolares/")
    today = date.today()
    date_requested = datetime.date() - timedelta(days=1) if datetime else today - timedelta(days=1)
    formatted_date = date_requested.strftime("%Y-%m-%d")
    if response.status_code == 200:
        data = response.json()
        current_price = next(
            (
                {"price": int(dt["venta"]), "date": str(dt["fecha"])}
                for dt in data
                if dt["fecha"] == formatted_date and dt["casa"] == "blue"
            ),
            None
        )

        return current_price