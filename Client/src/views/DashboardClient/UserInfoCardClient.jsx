/* eslint-disable react/prop-types */

import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

const UserInfoCard = ({
  user,
  userImage,
  editMode,
  handleEdit,
  handleSave,
  setUser,
}) => {
  return (
    <Card
      sx={{
        border: "none",
        borderRadius: 5,
        padding: 2,
        margin: "1em",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Avatar src={userImage} sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardHeader
            title={
              editMode ? (
                <Typography variant="body1">
                  Edita tu perfil actualizando tu domicilio para recibir listados de
                  profesionales en tu zona en tu casilla de email:
                </Typography>
              ) : (
                <Typography variant="h5" gutterBottom>
                  {user.name} {user.LastName}
                </Typography>
              )
            }
            subheader={
              <Typography variant="h6">{user.email}</Typography>
            }
            action={
              <IconButton onClick={handleEdit}>
                <Edit />
              </IconButton>
            }
          />
          <Grid container spacing={2}>
            {editMode && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Provincia"
                    value={user.province}
                    fullWidth
                    required
                    onChange={(e) => setUser({ ...user, province: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Ciudad"
                    value={user.location}
                    fullWidth
                    required
                    onChange={(e) => setUser({ ...user, location: e.target.value })}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              {editMode && (
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "5px" }}
                >
                  Guardar cambios
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
export default UserInfoCard;