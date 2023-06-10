import pandas as pd

# Leer los archivos CSV
df_a = pd.read_csv('StreamingHistory_caro.csv')
df_b = pd.read_csv('StreamingHistory_nanu.csv')
df_c = pd.read_csv('StreamingHistory_valen.csv')

# Agregar una columna que indique la fuente (A, B o C)
df_a['Fuente'] = 'A'
df_b['Fuente'] = 'B'
df_c['Fuente'] = 'C'

# Combinar los tres DataFrames en uno solo
df_combined = pd.concat([df_a, df_b, df_c])

# Guardar el DataFrame combinado en un nuevo archivo CSV
df_combined.to_csv('combined.csv', index=False)