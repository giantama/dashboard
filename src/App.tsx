import './App.css';
import { useState } from 'react';
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import useFetchData from './hooks/useFetchData';

function App() {

    // Estado levantado: la ciudad elegida en SelectorUI se comunica a App y de ahí al hook
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const { data, loading, error } = useFetchData(selectedOption);

    // Etiquetas del eje X / columna Hora: solo la hora (2026-11-16T14:00 -> 14:00)
    const horas = data ? data.hourly.time.map((tiempo) => tiempo.slice(11)) : [];

    return (
        <Grid container spacing={5} sx={{ justifyContent: 'center', alignItems: 'center' }}>

            {/* Encabezado */}
            <Grid size={{ xs: 12, md: 12 }}>
                <HeaderUI />
            </Grid>

            {/* Alertas */}
            <Grid size={{ xs: 12, md: 12 }}
                container sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>

                <AlertUI description="No se prevén lluvias" />

            </Grid>

            {/* Selector */}
            <Grid size={{ xs: 12, md: 3 }}>
                <SelectorUI onOptionSelect={setSelectedOption} />
            </Grid>

            {/* Indicadores */}
            <Grid container size={{ xs: 12, md: 9 }}>

                {loading && <CircularProgress />}
                {error && <Alert severity="error">{error}</Alert>}

                <Grid size={{ xs: 12, md: 3 }}>
                    {data &&
                        (<IndicatorUI
                            title='Temperatura (2m)'
                            description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`} />)
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    {data &&
                        (<IndicatorUI
                            title='Temperatura aparente'
                            description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`} />)
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    {data &&
                        (<IndicatorUI
                            title='Velocidad del viento'
                            description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`} />)
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    {data &&
                        (<IndicatorUI
                            title='Humedad relativa'
                            description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`} />)
                    }
                </Grid>

            </Grid>

            {/* Gráfico */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                {data && (
                    <ChartUI
                        title='Temperatura y viento por hora'
                        labels={horas}
                        values1={data.hourly.temperature_2m}
                        values2={data.hourly.wind_speed_10m}
                        label1={`Temperatura (${data.hourly_units.temperature_2m})`}
                        label2={`Viento (${data.hourly_units.wind_speed_10m})`} />
                )}
            </Grid>

            {/* Tabla */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                {data && (
                    <TableUI
                        labels={horas}
                        values1={data.hourly.temperature_2m}
                        values2={data.hourly.wind_speed_10m}
                        header1={`Temperatura (${data.hourly_units.temperature_2m})`}
                        header2={`Viento (${data.hourly_units.wind_speed_10m})`} />
                )}
            </Grid>

            {/* Información adicional */}
            <Grid size={{ xs: 12, md: 12 }}>
                {data && (
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            Coordenadas: {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)} · Elevación: {data.elevation} m ·
                            Zona horaria: {data.timezone} · Última actualización: {data.current.time.replace('T', ' ')} ·
                            Fuente: Open-Meteo
                        </Typography>
                    </Paper>
                )}
            </Grid>

        </Grid>
    );
}

export default App;
