import pool from "../db.js";

export const createActividad = async (req, res) => {
  try {
    const sql = await pool.actividades.create({
      data: req.body
    })
    if (sql) {
      return res.status(201).json({ msg: "Actividad creada correctamente" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getAllActividad = async (req, res) => {
  try {
    const sql = await pool.actividades.findMany()

    if (sql) {
      return res.status(200).json(sql)
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateActividad = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = await pool.actividades.update({
      where: { id: parseInt(id) },
      data: req.body
    })
    if (sql) {
      return res.status(200).json({ msg: "Se actualizo Correctamente" })
    }
  } catch (error) {
    console.error(error)
    if (error.code == "P2025") {
      return res.status(404).json({ msg: "No se encontro el ID" })
    }
    return res.status(500).json({ msg: "Error en el servidor" })
  }
}


export const reporteRentabilidad = async (req, res) => {
  try {
    // Obtener todas las actividades que estén asociadas a cultivos y pasantes
    const actividades = await pool.actividades.findMany({
      include: {
        cultivos: true,
        usuarios: {
          include: {
            pasantes: {
              include: {
                horasMensuales: true,
              },
            },
          },
        },
      },
    });

    // Preparar resultados
    const resultados = [];

    for (const actividad of actividades) {
      const cultivo = actividad.cultivos;
      const usuario = actividad.usuarios;
      const pasante = usuario.pasantes[0]; // si hay múltiples, tomar el primero

      if (!cultivo || !pasante) continue;

      // Buscar cosechas y ventas del cultivo
      const cosechas = await prisma.cosechas.findMany({
        where: { fkCultivos: cultivo.id },
        include: {
          ventas: true,
        },
      });

      // Calcular ingresos (sumatoria de unidades * precioUnitario)
      let ingresos = 0;
      cosechas.forEach(cosecha => {
        cosecha.ventas.forEach(venta => {
          ingresos += cosecha.unidades * venta.precioUnitario;
        });
      });

      // Calcular egresos (minutos * (salarioHora / 60))
      let egresos = 0;
      pasante.horasMensuales.forEach(hm => {
        egresos += hm.minutos * (pasante.salarioHora / 60);
      });

      resultados.push({
        Cultivo: cultivo.nombre,
        Ingresos: Math.round(ingresos),
        Pasante: usuario.nombre,
        ActividadRealizada: actividad.titulo,
        Egresos: Math.round(egresos),
        Rentabilidad: Math.round(ingresos - egresos),
      });
    }

    if (resultados.length > 0) {
      return res.status(200).json(resultados);
    } else {
      return res.status(404).json({ msg: "No se encontraron reportes de Rentabilidad" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};



