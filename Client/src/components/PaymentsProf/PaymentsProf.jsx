/* eslint-disable react/prop-types */
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  List,
  ListSubheader,
  Typography,
} from '@mui/material';
import { AttachMoney } from '@mui/icons-material';

export default function PaymentsProf({ payments }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <Card sx={{ boxShadow: 20, marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Mis pagos
            </Typography>
            {payments.length > 0 ? (
              payments.map((pay) => (
                <Grid
                  container
                  spacing={2}
                  key={pay._id}
                  alignItems="center"
                  sx={{ marginBottom: '10px' }}
                >
                  <Grid item xs={12} md={3}>
                    <Typography
                      color="textSecondary"
                      sx={{ margin: '5px', padding: '6px' }}
                    >
                      {new Date(pay.date).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Avatar src={pay.clientData.image} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CardContent>
                      <Typography variant="body2">
                        {pay.clientData.name} {pay.clientData.lastName}
                      </Typography>
                      <Typography variant="body2">
                        <a href={`mailto:${pay.clientData.email}`}>
                          {pay.clientData.email}
                        </a>
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Typography variant="body2" color="black">
                No hay pagos disponibles
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
