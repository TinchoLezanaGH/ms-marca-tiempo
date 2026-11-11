import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Endpoint del microservicio
app.get(["/api", "/api/:date"], (req, res) => {

  const dateString = req.params.date;
  let date;

  // Si no se proporciona una fecha, usamos la actual
  if (dateString === undefined) {
    date = new Date();
  }

  // Si el parámetro es un timestamp numérico
  else if (/^-?\d+$/.test(dateString)) {
    date = new Date(Number(dateString));
  }

  // Si es una fecha convencional
  else {
    date = new Date(dateString);
  }

  // Validamos la fecha
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Devolvemos los resultados
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });

});

const listener = app.listen(8000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});