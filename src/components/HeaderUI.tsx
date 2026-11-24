import Typography from '@mui/material/Typography';

export default function HeaderUI() {
    return (
        <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: 'bold', fontSize: { xs: '2.2rem', md: '3.75rem' } }}>
            Dashboard del Clima
        </Typography>
    );
}
