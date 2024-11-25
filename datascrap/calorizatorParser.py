import requests
from bs4 import BeautifulSoup
import json

base_url = 'https://calorizator.ru/product/all?page={}'
#base_url = 'https://calorizator.ru/product/all'

products = []
number = 80

for page in range(1, 84):
    url = base_url.format(page)
    response = requests.get(url)
    
    if response.status_code != 200:
        print(f"Не удалось получить данные с {url}")
        continue
    soup = BeautifulSoup(response.text, 'html.parser')
    rows = soup.find_all('tr')[1:] 

    for row in rows:
        cols = row.find_all('td')
        
        if len(cols) < 6:
            continue  

        try: 
            name = cols[1].text.strip()  # Название продукта
            protein100g = float(cols[2].text.strip().replace(',', '.'))  # Калории на 100 г
            fat100g = float(cols[3].text.strip().replace(',', '.'))  # Белки на 100 г
            carbs100g = float(cols[4].text.strip().replace(',', '.'))  # Жиры на 100 г
            calories100g = float(cols[5].text.strip().replace(',', '.'))  # Углеводы на 100 г
            weight = None 
            priority = 0
            clicks = 0

            print(name)
            print(calories100g)
            print(protein100g)
            print(fat100g)
            print(carbs100g)

            number += 1
            products.append({
                "id": number,  
                "name": name,
                "calories100g": calories100g,
                "protein100g": protein100g,
                "fat100g": fat100g,
                "carbs100g": carbs100g,
                "weight": weight,
                "priority": priority,
                "clicks":clicks
            })
        except ValueError as e:
            print(e)

with open('products.json', 'a+', encoding='utf-8') as json_file:
    json.dump(products, json_file, ensure_ascii=False, indent=4)
                 
print("Данные успешно сохранены в products.json")