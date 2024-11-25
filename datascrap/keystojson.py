import json

# Чтение JSON-файла
with open('products.json', 'r', encoding='utf-8') as file:
    products = json.load(file)

# Добавление ключа 'priority' к каждому продукту
for product in products:
    product['clicks'] = 0  # Установите нужное значение приоритета

# Запись изменённых данных обратно в JSON-файл
with open('products.json', 'w', encoding='utf-8') as file:
    json.dump(products, file, ensure_ascii=False, indent=4)

print("Ключ 'priority' успешно добавлен ко всем элементам.")