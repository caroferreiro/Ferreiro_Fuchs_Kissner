# import pandas as pd
import csv

# # Leer los archivos CSV
# df_a = pd.read_csv('StreamingHistory_caro.csv')
# df_b = pd.read_csv('StreamingHistory_nanu.csv')
# df_c = pd.read_csv('StreamingHistory_valen.csv')

# # Agregar una columna que indique la fuente (A, B o C)
# df_a['Fuente'] = 'A'
# df_b['Fuente'] = 'B'
# df_c['Fuente'] = 'C'

# # Combinar los tres DataFrames en uno solo
# df_combined = pd.concat([df_a, df_b, df_c])

# # Guardar el DataFrame combinado en un nuevo archivo CSV
# df_combined.to_csv('datos.csv', index=False)


# Abrir el archivo CSV de entrada y crear el archivo CSV de salida
with open('datos.csv', 'r',encoding='utf-8') as file_in, open('datos2.csv', 'w', newline='', encoding='utf-8') as file_out:
    # Crear los objetos de escritura y lectura de CSV
    writer = csv.writer(file_out)
    reader = csv.reader(file_in)

    # Escribir la cabecera en el archivo de salida
    header = next(reader)
    writer.writerow(['Fecha', 'Hora'] + header[1:])

    # Iterar sobre las filas del archivo de entrada
    for row in reader:
        # Obtener la fecha y la hora de la primera columna
        datetime_str = row[0]
        date_str, time_str = datetime_str.split(' ')

        # Escribir la fecha, la hora y el resto de los datos en el archivo de salida
        writer.writerow([date_str, time_str] + row[1:])