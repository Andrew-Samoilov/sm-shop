COPY tyres (title, description, country, date_code, applicability, sku, inventory_quantity, price, load_speed_index, brand, model, width, profile, constr, diameter, delimiter, load_index, speed_index, type)
FROM 'C:/sag/tyre_products.csv' DELIMITER ',' CSV HEADER;
