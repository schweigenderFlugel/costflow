from datetime import date, timedelta
import httpx

from config.envs import BCRA_ACCESS_TOKEN

def get_dolar_stadistics():
    response = httpx.get("https://api.estadisticasbcra.com/usd", headers={ "Authorization": f"BEARER {BCRA_ACCESS_TOKEN}"})
    if response.status_code == 200:
        data = response.json()
        return data
    
def get_dolar_current_price():
    response = httpx.get("https://api.argentinadatos.com/v1/cotizaciones/dolares/")
    today = date.today()
    yesterday = today - timedelta(days=1)
    formatted_date = yesterday.strftime("%Y-%m-%d")
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