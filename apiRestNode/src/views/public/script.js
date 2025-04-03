const objs = [
    {
        title : 'Usuarios',
        tables : [
            {
                title : 'getAll',
                url : '/usuarios',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 500 Internal Error'
            },
            {
                title : 'create',
                url : '/usuarios',
                method : 'POST',
                body : '{<br> identificacion : Int,<br> nombre : String,<br> apellidos : String,<br> fechaNacimiento : Date,<br> telefono : Int,<br> correoElectronico : String,<br> password : String<br> }',
                responses : '201 Created - 400 Client Error - 500 Internal Error'
            },
            {
                title : 'login',
                url : '/login',
                method : 'POST',
                body : '{<br>correoElectronico : String,<br>password : String<br>}',
                responses : '200 OK - 404 Not Found - 400 Client Error - 500 Internal Error'
            },
            {
                title : 'update',
                url : '/usuarios/:id',
                method : 'PUT',
                body : '{<br> identificacion : Int?,<br> nombre : String?,<br> apellidos : String?,<br> fechaNacimiento : Date?,<br> telefono : Int?,<br> correoElectronico : String?,<br> password : String?<br> }',
                responses : '200 OK - 400 Client Error - 500 Internal Error'
            }
        ]
    },
    {
        title : 'Pasantes',
        tables : [
            {
                title : 'getAll',
                url : '/pasantes',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 500 Internal Error'
            },
            {
                title : 'create',
                url : '/pasantes',
                method : 'POST',
                body : '{<br>fk_Usuarios : Int,<br> fechaInicioPasantia : Date,<br> fechaFinalizacion : Date,<br> salarioHora : Int,<br> area : String<br>}',
                responses : '201 Created - 400 Client Error - 500 Internal Error'
            }
        ]
    },
    {
        title : 'Horas Mensuales',
        tables : [
            {
                title : 'getHoras',
                url : '/horasmensuales',
                method : 'GET',
                body : '{<br>id : Int<br>}',
                responses : '200 OK - 500 Internal Error'
            },
            {
                title : 'regHoras',
                url : '/horasmensuales',
                method : 'POST',
                body : '{<br>fk_Pasantes : Int,<br>minutos : Int,<br>mes : String<br>}',
                responses : '201 Created - 400 Client Error - 500 Internal Error'
            }
        ]
    },
    {
        title : 'ACTIVIDADES',
        tables : [
            {
                title : 'getAllActividad',
                url : '/actividad',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 404 No se encontraron actividades - 500 Internal server error '
            },
            {
                title : 'createActividad',
                url : '/actividad',
                method : 'POST',
                body : '{<br> fk_Cultivos : Int,<br> fk_Usuarios : Bigint,<br> titulo : Varchar,<br> descripcion : Text,<br> fecha : Date,<br> estado : enum("Asignada","Completada","Cancelada")<br>}',
                responses : '201 Actividad creada correctamente - 400 Error al crear la actividad - 500 Internal server error'
            },
            {
                title : 'updateActividad',
                url : '/actividad/:id',
                method : 'PUT',
                body : '{<br> fk_Cultivos : Int,<br> fk_Usuarios : Bigint,<br> titulo : Varchar,<br> descripcion : Text,<br> fecha : Date,<br> estado : enum("Asignada","Completada","Cancelada")<br>}',
                responses : '201 Actividad actualizada correctamente - 400 Error al actualizar la actividad - 500 Internal server error'
            }
        ]
    },
    {
        title : 'HERRAMIENTAS',
        tables : [
            {
                title : 'getAllHerramientas',
                url : '/herramientas',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 404 No se encontraron herramientas - 500 Internal server error '
            },
            {
                title : 'createHerramientas',
                url : '/herramientas',
                method : 'POST',
                body : '{<br> fk_Lotes : Int,<br> nombre : Varchar,<br> descripcion : Text,<br> unidades : Int<br>}',
                responses : '201 Herramienta creada correctamente - 400 Error al agregar la herramienta - 500 Internal server error'
            },
            {
                title : 'updateHerramientas',
                url : '/herramientas/:id',
                method : 'PUT',
                body : '{<br> fk_Lotes : Int,<br> nombre : Varchar,<br> descripcion : Text,<br> unidades : Int<br>}',
                responses : '201 Herramienta actualizada correctamente - 400 Error al actualizar la herramienta - 500 Internal server error'
            }
        ]
    },
    {
        title : 'INSUMOS',
        tables : [
            {
                title : 'getAllInsumos',
                url : '/insumos',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 404 No se encontraron insumos - 500 Internal server error '
            },
            {
                title : 'createInsumo',
                url : '/insumos',
                method : 'POST',
                body : '{<br> nombre : Varchar,<br> descripcion : Text,<br> precio : Int,<br> unidades : tinyint<br>}',
                responses : '201 Insumo agregado correctamente - 400 Error al agregar el insumo - 500 Internal server error'
            },
            {
                title : 'updateInsumos',
                url : '/insumos/:id',
                method : 'PUT',
                body : '{<br> nombre : Varchar,<br> descripcion : Text,<br> precio : Int,<br> unidades : tinyint<br>}',
                responses : '201 Insumo actualizado correctamente - 400 Error al actualizar el insumo - 500 Internal server error'
            }
        ]
    },
    {
        title : 'USOS HERRAMIENTAS',
        tables : [
            {
                title : 'getAllUsosHerramientas',
                url : '/usosHerramientas',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 404 No se encontraron usos de herramientas registrados - 500 Internal server error '
            },
            {
                title : 'createUsosHerramientas',
                url : '/usosHerramientas',
                method : 'POST',
                body : '{<br> fk_Herramientas : Int,<br> fk_Actividades : Int<br>}',
                responses : '201 Uso de herramienta agregado correctamente - 400 Error al agregar el uso de la herramienta - 500 Internal server error'
            },
        ]
    },
    {
        title : 'USOS PRODUCTOS',
        tables : [
            {
                title : 'getAllUsosProductos',
                url : '/usosProductos',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 404 No se encontraron usos de productos registrados - 500 Internal server error '
            },
            {
                title : 'createUsosProductos',
                url : '/usosProductos',
                method : 'POST',
                body : '{<br> fk_Insumos : Int,<br> fk_Actividades : Int,<br>cantidadProducto : Int<br>}',
                responses : '201 Uso del producto agregado correctamente - 400 Error al agregar el uso del producto - 500 Internal server error'
            },
            {
                title : 'updateUsosProductos',
                url : '/usosProductos/:id',
                method : 'PUT',
                body : '{<br> fk_Insumos : Int,<br> fk_Actividades : Int,<br>cantidadProducto : Int<br>}',
                responses : '201 uso del producto actualizado correctamente - 400 Error al actualizar el uso de producto - 500 Internal server error'
            }
        ]
    },
    {
        title : 'EVAPOTRANSPIRACIONES',
        tables : [
            {
                title : 'getAllEvapotranspiraciones',
                url : '/evapotranspiraciones',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 400 No se encontraron evapotranspiraciones registradas en la base de datos - 500 Internal server error '
            },
            {
                title : 'createEvapotranspiraciones',
                url : '/evapotranspiraciones',
                method : 'POST',
                body : '{<br> fk_Lotes : Int,<br> fecha : Datetime,<br>milimetrosMCuadrado: Int<br>}',
                responses : '200 Evapotranspiracion recolectada correctamente - 400 Error al recolectar la evapotranspiracion - 500 Internal server error'
            }
        ]
    },
    {
        title : 'PRECIPITACIONES',
        tables : [
            {
                title : 'getAllPrecipitaciones ',
                url : '/precipitaciones',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 400 No se encontraron Precipitaciones registradas en la base de datos - 500 Internal server error '
            },
            {
                title : 'createPrecipitaciones ',
                url : '/precipitaciones',
                method : 'POST',
                body : '{<br> fk_Lotes : Int,<br> fecha : Datetime,<br>mm: Int<br>}',
                responses : '200 Precipitacion recolectada correctamente - 400 Error al recolectar los datos de las precipitaciones - 500 Internal server error'
            }
        ]
    },
    {
        title : 'TEMPERATURAS',
        tables : [
            {
                title : 'getAllTemperaturas ',
                url : '/temperaturas',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 400 No se encontraron temperaturas registradas en la base de datos - 500 Internal server error '
            },
            {
                title : 'createTemperaturas',
                url : '/temperaturas',
                method : 'POST',
                body : '{<br> fk_Lotes : Int,<br>gradosC: Tinyint<br>,<br> fecha : Datetime <br>}',
                responses : '200 Temperatura recolectada correctamente - 400 Error al recolectar los datos de las Temperaturas - 500 Internal server error'
            }
        ]
    },
    {
        title : 'VELOCIDAD VIENTO',
        tables : [
            {
                title : 'getAllPrecipitaciones ',
                url : '/velocidadViento',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 400 No se encontro una velocidad del viento registrada en la base de datos - 500 Internal server error '
            },
            {
                title : 'createVelocidadViento',
                url : '/velocidadViento',
                method : 'POST',
                body : '{<br> fk_Lotes : Int,<br> fecha : Datetime,<br>kilomhora : Tinyint<br>}',
                responses : '200 Velocidad del viento recolectada correctamente - 400 Error al recolectar los datos de las velocidad del viento- 500 Internal server error'
            }
        ]
    },
    {
        title : 'ILUMINACIONES',
        tables : [
            {
                title : 'getAllIluminaciones ',
                url : '/iluminaciones',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 400 No se encontraron iluminaciones registradas en la base de datos - 500 Internal server error '
            },
            {
                title : 'createIluminaciones',
                url : '/iluminaciones',
                method : 'POST',
                body : '{<br> fk_Lotes : Int,<br> fecha : Datetime,<br>lumens: Int<br>}',
                responses : '200 Iluminacion recolectada correctamente - 400 Error al recolectar los datos de las iluminaciones - 500 Internal server error'
            }
        ]
    },
    {
        title: "TIPOS DE PLAGA",
        tables: [
          {
            title: "listarTipoPlaga",
            url: "/tipoPlaga",
            method: "GET",
            body: "NULL",
            responses:
              "200 OK - 404 Tipos de plaga no encontrados - 500 Error en el sistema",
          },
          {
            title: "buscarTipoPlaga",
            url: "/tipoPlaga/:id",
            method: "GET",
            body: "NULL",
            responses:
              "200 OK - 404 Tipos de plaga no encontrados - 500 Error en el sistema",
          },
          {
            title: "registrarTipoPlaga",
            url: "/tipoPlaga",
            method: "POST",
            body: "{<br> nombre: String,<br> descripcion: String,<br> img: String <br>}",
            responses:
              "200 Tipo de plaga registrada - 400 El tipo de plaga no se pudo registrar - 500 Error en el sistema",
          },
          {
            title: "actualizarTipoPlaga",
            url: "/tipoPlaga/:id",
            method: "PUT",
            body: "{<br> nombre: String,<br> descripcion: String,<br> img: String <br>}",
            responses:
              "200 Tipo de plaga actualizada - 400 No fue posible actualizar el tipo de plaga - 500 Error en el sistema",
          },
          {
            title: "eliminarTipoPlaga",
            url: "/tipoPlaga/:id",
            method: "DELETE",
            body: "NULL",
            responses:
              "200 Tipo de plaga eliminada - 400 No fue posible eliminar el tipo de plaga - 500 Error en el sistema",
          },
        ],
      },
    
      {
        title: "PLAGAS",
        tables: [
          {
            title: "listarPlagas",
            url: "/plagas",
            method: "GET",
            body: "NULL",
            responses:
              "200 OK - 404 Plagas no encontradas - 500 Error en el sistema",
          },
          {
            title: "buscarPlaga",
            url: "/plagas/:id",
            method: "GET",
            body: "NULL",
            responses: "200 OK - 404 Plaga no encontrada - 500 Error en el sistema",
          },
          {
            title: "registrarPlagas",
            url: "/plagas",
            method: "POST",
            body: "{<br> fk_TiposPlaga: int,<br> nombre: String,<br> descripcion: String,<br> img: String <br>}",
            responses:
              "200 Plaga registrada - 400 Plaga no se pudo registrar - 500 Error en el sistema",
          },
          {
            title: "actualizarPlagas",
            url: "/plagas/:id",
            method: "PUT",
            body: "{<br> fk_TiposPlaga: int,<br> nombre: String,<br> descripcion: String,<br> img: String <br>}",
            responses:
              "200 Plaga actualizada - 400 No fue posible actualizar la plaga - 500 Error en el sistema",
          },
          {
            title: "eliminarPlagas",
            url: "/plagas/:id",
            method: "DELETE",
            body: "NULL",
            responses:
              "200 Plaga eliminada - 400 No fue posible eliminar la plaga - 500 Error en el sistema",
          },
        ],
      },
    
      {
        title: "AFECCIONES",
        tables: [
          {
            title: "listarAfecciones",
            url: "/afecciones",
            method: "GET",
            body: "NULL",
            responses:
              "200 OK - 404 Afecciones no encontradas - 500 Error en el sistema",
          },
          {
            title: "buscarAfeccion",
            url: "/afecciones/:id",
            method: "GET",
            body: "NULL",
            responses:
              "200 OK - 404 Afección no encontrada - 500 Error en el sistema",
          },
          {
            title: "registrarAfecciones",
            url: "/afecciones",
            method: "POST",
            body: "{<br> fk_Plantaciones: int,<br> fk_Plagas: int,<br> fechaEncuentro: Date,<br> estado: String <br>}",
            responses:
              "200 Afección registrada - 400 No se pudo registrar la afección - 500 Error en el sistema",
          },
          {
            title: "actualizarAfecciones",
            url: "/afecciones/:id",
            method: "PUT",
            body: "{<br> fk_Plantaciones: int,<br> fk_Plagas: int,<br> fechaEncuentro: Date,<br> estado: String <br>}",
            responses:
              "200 Afección actualizada - 400 No fue posible actualizar la afección - 500 Error en el sistema",
          },
          {
            title: "eliminarAfecciones",
            url: "/afecciones/:id",
            method: "DELETE",
            body: "NULL",
            responses:
              "200 Afección eliminada - 400 No fue posible eliminar la afección - 500 Error en el sistema",
          },
        ],
      },
      {
        title: "CONTROLES",
        tables: [
          {
            title: "listarControles",
            url: "/controles",
            method: "GET",
            body: "NULL",
            responses:
              "200 OK - 404 Controles no encontrados - 500 Error en el sistema",
          },
          {
            title: "registrarControles",
            url: "/controles",
            method: "POST",
            body: "{<br> fk_Afecciones: int,<br> fk_TiposControl: int,<br> descripcion: String,<br> fechaControl: Date <br>}",
            responses:
              "200 Tipo de control registrado - 400 No se pudo registrar el tipo de control - 500 Error en el sistema",
          },
          {
            title: "actualizarControles",
            url: "/controles/:id",
            method: "PUT",
            body: "{<br> fk_Afecciones: int,<br> fk_TiposControl: int,<br> descripcion: String,<br> fechaControl: Date <br>}",
            responses:
              "200 Control actualizado - 400 No se pudo actualizar el control - 500 Error en el sistema",
          },
          {
            title: "eliminarControles",
            url: "/controles/:id",
            method: "DELETE",
            body: "NULL",
            responses:
              "200 Control eliminado - 400 No se pudo eliminar el control - 500 Error en el sistema",
          },
        ],
      },
      {
        title: "TIPOS CONTROL",
        tables: [
          {
            title: "listarTiposControl",
            url: "/tiposcontrol",
            method: "GET",
            body: "NULL",
            responses:
              "200 OK - 404 Tipos de control no encontrados - 500 Error en el sistema",
          },
          {
            title: "registrarTipoControl",
            url: "/tiposcontrol",
            method: "POST",
            body: "{<br> nombre: String,<br> descripcion: String <br>}",
            responses:
              "200 Tipo de control registrado - 400 No se pudo registrar el tipo de control - 500 Error en el sistema",
          },
          {
            title: "actualizarTipoControl",
            url: "/tiposcontrol/:id",
            method: "PUT",
            body: "{<br> nombre: String,<br> descripcion: String <br>}",
            responses:
              "200 Tipo de control actualizado - 400 No se pudo actualizar el tipo de control - 500 Error en el sistema",
          },
          {
            title: "eliminarTipoControl",
            url: "/tiposcontrol/:id",
            method: "DELETE",
            body: "NULL",
            responses:
              "200 Tipo de control eliminado - 400 No se pudo eliminar el tipo de control - 500 Error en el sistema",
          },
          {
            title: "buscarTipoControl",
            url: "/tiposcontrol/:id",
            method: "GET",
            body: "NULL",
            responses:
              "200 OK - 404 Tipo de control no encontrado - 500 Error en el sistema",
          },
        ],
      },
      {
        title: "PRODUCTOS CONTROL",
        tables: [
          {
            title: "listarProductosControl",
            url: "/productosControl",
            method: "GET",
            body: "NULL",
            responses:
              "200 OK - 404 Productos para el control no encontrados - 500 Error en el sistema",
          },
          {
            title: "registrarProductosControl",
            url: "/productosControl",
            method: "POST",
            body: "{<br> nombre: String,<br> precio: int,<br> compuestoActivo: String,<br> fichaTecnica: String,<br> contenido: String,<br> tipoContenido: String,<br> unidades: int <br>}",
            responses:
              "200 Producto de control registrado - 400 No se pudo registrar el producto de control - 500 Error en el sistema",
          },
          {
            title: "actualizarProductosControl",
            url: "/productosControl/:id",
            method: "PUT",
            body: "{<br> nombre: String,<br> precio: int,<br> compuestoActivo: String,<br> fichaTecnica: String,<br> contenido: String,<br> tipoContenido: String,<br> unidades: int <br>}",
            responses:
              "200 Producto de control actualizado - 400 No se pudo actualizar el producto de control - 500 Error en el sistema",
          },
          {
            title: "eliminarProductosControl",
            url: "/productosControl/:id",
            method: "DELETE",
            body: "NULL",
            responses:
              "200 Producto de control ha sido eliminado - 400 No es posible eliminar el producto de control - 500 Error en el sistema",
          },
          {
            title: "buscarProductosControl",
            url: "/productosControl/:id",
            method: "GET",
            body: "NULL",
            responses:
              "200 OK - 404 Producto de control no encontrado - 500 Error en el sistema",
          },
        ],
      },
      {
        title: "USO PRODUCTOS CONTROL",
        tables: [
          {
            title: "listarUsoProductoControl",
            url: "/usoProductoControl",
            method: "GET",
            body: "NULL",
            responses:
              "200 OK - 404 Uso de productos no encontrados - 500 Error en el sistema",
          },
          {
            title: "registrarUsoProductosControl",
            url: "/usoProductoControl",
            method: "POST",
            body: "{<br> fk_ProductosControl: int,<br> fk_Controles: int,<br> cantidadProducto: int <br>}",
            responses:
              "200 Uso de producto de control registrado - 400 No se pudo registrar el uso del producto de control - 500 Error en el sistema",
          },
          {
            title: "actualizarUsoProductoControl",
            url: "/usoProductoControl/:id",
            method: "PUT",
            body: "{<br> fk_ProductosControl: int,<br> fk_Controles: int,<br> cantidadProducto: int <br>}",
            responses:
              "200 Uso de producto de control actualizado - 400 No se pudo actualizar el uso del producto de control - 500 Error en el sistema",
          },
          {
            title: "eliminarUsoProductoControl",
            url: "/usoProductoControl/:id",
            method: "DELETE",
            body: "NULL",
            responses:
              "200 Uso de producto de control eliminado - 400 No fue posible eliminar el uso del producto de control - 500 Error en el sistema",
          },
          {
            title: "buscarUsoProductoControl",
            url: "/usoProductoControl/:id",
            method: "GET",
            body: "NULL",
            responses:
              "200 OK - 404 Uso de producto de control no encontrado - 500 Error en el sistema",
          },
        ],
      },
      {
        title : 'Lotes',
        tables : [
            {
                title : 'ListarLotes',
                url : '/lotes',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK, 500 Error al listar los lotes'
            },
            {
                title : 'RegistrarLotes',
                url : '/lotes',
                method : 'POST',
                body : '{<br> nombre : int, <br> descripcion : text, <br> tamX: tinyint, <br> tamy: tinyint, <br> estado : tinyint (1), <br> posX : decimal(3,2), <br> posY : decimal(3,2) }',
                responses : '201 OK, 409 El nombre del lote ya existe, 500 errror al registrar lote'
            },
            {
                title : 'ActualizarLotes',
                url : '/lotes/:id', 
                method : 'PUT',
                body : '{<br> nombre : int, <br> descripcion : text, <br> tamX: tinyint, <br> tamy: tinyint, <br> estado : tinyint (1), <br> posX : decimal(3,2), <br> posY : decimal(3,2) }',
                responses :'200 OK, 404 lote no encontrado, 500 error del sistema'
            },
            {
                title : 'EliminarLotes',
                url: '/lotes/:id', 
                method : 'DELETE',
                body : 'NULL',
                responses : '200 OK, 404 lote no encontrado, 500 error del sistema'
            }, 
            {
                title : 'BuscarLotes',
                url : '/lotes/:id', 
                method : 'GET',
                body : 'NULL',
                responses : '200 OK, 404 lote no encontrado, 500 error del sistema'
            }
        ]
    },
    {
        title : 'Eras',
        tables : [
            {
                title : 'ListarEras',
                url : '/eras',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK, 500 Error al listar las eras'
            },
            {
                title : 'RegistrarEras',
                url : '/eras',
                method : 'POST',
                body : '{<br> fk_Lotes : int, <br> tamX : decimal(3,2), <br> tamY : decimal(3,2), <br> posX : decimal(3,2), <br> posY : decimal(3,2), <br> estado : tinyint(1)}',
                responses : '200 OK, 404 Era no registrada, 500 Error del sistema'
            },
            {
                title : 'ActualizarEras',
                url : '/eras/:id',
                method : 'PUT',
                body : '{<br> fk_Lotes : int , <br> tamX : decimal(3,2), <br> tamY : decimal(3,2), <br> posX : decimal(3,2), <br> posY : decimal(3,2), <br> estado : tinyint(1) }',
                responses : '200 OK, 404 Era no encontrada, 500 Error del sistema'
            },
            {
                title : 'EliminarEras',
                url : '/eras/:id',
                method : 'DELETE',
                body : 'NULL',
                responses : '200 OK, 404 Era no encontrada, 500 Error del sistema'
            },
            {
                title : 'BuscarEras',
                url : '/eras/:id',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK, 404 Era no encontrada, 500 Error del sistema'
            }
        ]
    },
    {
        title : 'Cultivos',
        tables : [
            {
                title : 'ListarCultivos',
                url : '/Cultivos',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK, 500 Error del servidor'
            },
            {
                title : 'RegistrarCultivos',
                url : '/cultivos',
                method : 'POST',
                body : '{<br> fk_Especies : int, <br> nombre : varchar(20), <br> unidades : int, <br> estado : tinyint(1), <br> FechaSiembra : date}',
                responses : '201 OK, 500 Error al registrar cultivo'
            },
            {
                title : 'ActualizarCultivos',
                url : '/cultivos/:id',
                method : 'PUT',
                body : '{<br> fk_Especies : int, <br> nombre : varchar(20), <br> unidades : int, <br> estado : tinyint(1), <br> FechaSiembra : date',
                responses : '404 Cultivo no encontrado, 200 OK, 500 Error al actualizar'
            },
            {
                title : 'EliminarCultivos',
                url : '/cultivos/:id',
                method : 'DELETE',
                body : 'NULL',
                responses : '200 OK, 500 error al eliminar el cultivo'
            },
            {
                title : 'BuscarCultivos',
                url : '/culyivos/:id',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK, 404 Cultivo no encontado, 500 Error al buscar el cultivo'
            }
        ]
    }, 
    {
        title : 'Plantaciones',
        tables : [
            {
                title : 'ListarPlantaciones',
                url : '/plantaciones',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK, 500 Error al listar plantaciones'
            },
            {
                title : 'RegistrarPlantaciones',
                url : '/plantaciones',
                method : 'POST',
                body : '{<br> fk_Cultivos : int, <br> fk_Eras : int}',
                responses : '200 OK, 500 Error al registro plantaciones'
            },
            {
                title : 'ActualizarPlantaciones',
                url : '/plantaciones/:id',
                method : 'PUT',
                body : '{<br>fk_Cultivos : int, <br> fk_Eras : int}',
                responses : '200 OK, 500 Error al actualizar la plantacion'
            },
            {
                title : 'EliminarPlantaciones',
                url : '/plantaciones/:id',
                method : 'DELETE',
                body : 'NULL',
                responses : '200 OK, 500 Error al eliminar la plantacion'
            },
            {
                title : 'BuscarPlantacion',
                url : '/plantaciones/:id',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK, 500 Error al buscar la plantacion'
            }
        ]
    },
    {
        title : 'Humedad del terreno',
        tables : [
            {
                title : 'ListarHumedad',
                url : '/humedadTerreno',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK, 500 Error al listar la humedad del terreno'
            },
            {
                title : 'RegistrarHumedad',
                url : '/humedadTerreno',
                method : 'POST',
                body : '{<br>} fk_Eras : int, <br> porcentaje : int, <br> fecha : date',
                responses : '201 OK, 500 Error al registrar la humedad del terreno'
            },
            {
                title : 'ActualizarHumedad',
                url : '/humedadTerreno/:id',
                method : 'PUT',
                body : '{<br>} fk_Eras : int, <br> porcentaje : int, <br> fecha : date',
                responses : '200 OK, 500 Error al actualizar la humedad del terreno'
            },
            {
                title : 'EliminarHumedad',
                url : '/humedadTerreno/:id',
                method : 'DELETE',
                body : 'NULL',
                responses : '200 OK, 500 Error al eliminar la humedad del terreno'
            },
            {
                title : 'BuscarHumedad',
                url : '/humedadTerreno/:id',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK, 500 Error al buscar la humedad del terreno'
            }
        ]
    }, 
    {
        title : 'pH',
        tables : [
            {
                title : 'ListarPhs',
                url : '/pHs',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK, 500 Error al listar'
            },
            {
                title : 'RegistrarPhs',
                url : '/pHs',
                method : 'POST',
                body : '{<br> fk_Eras : int, <br> acidez : int, <br> fecha : date }',
                responses : '201 OK, 500 Error al registrar el pH'
            },
            {
                title : 'ActualizarPhs',
                url : '/pHs/:id',
                method : 'PUT',
                body : '{<br> fk_Eras : int, <br> acidez : int, <br> fecha : date }',
                responses : 'STATUS'
            },
            {
                title : 'EliminarPhs',
                url : '/pHs/:id',
                method : 'DELETE',
                body : 'NULL',
                responses : '200 OK, 500 Error al eliminar el pH'
            },
            {
                title : 'BuscarPhs',
                url : '/pHs/:id',
                method : 'GET',
                body : 'NULL',
                responses : '404 pH no encontrado, 200 OK, 500 Error al buscar el pH'
            }
        ]
    },
    {
        title : 'COSECHAS',
        tables : [
            {
                title : 'getAllCosechas',
                url : '/cosechas',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 404 No se encontraron datos de cosechas - 500 Internal server error '
            },
            {
                title : 'createCosechas',
                url : '/cosechas',
                method : 'POST',
                body : '{<br> fk_Cultivos : Int,<br> unidades : Int,<br> fecha : date,<br>}',
                responses : '201 La cosecha fue registrada exitosamente - 400 Error al registrar la cosecha - 500 Internal server error'
            },
            {
                title : 'updateCosechas',
                url : '/cosechas/:id',
                method : 'PUT',
                body : '{<br> fk_Cultivos : Int,<br> unidades : Int,<br> fecha : date,<br>}',
                responses : '201 La cosecha fue actualizada correctamente - 400 Error al actualizar la cosecha - 500 Internal server error'
            }
        ]
    },
    {
        title : 'DESECHOS',
        tables : [
            {
                title : 'getAllDesechos',
                url : '/desechos',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 404 No se encontraron datos de desechos - 500 Internal server error '
            },
            {
                title : 'createDesechos',
                url : '/desechos',
                method : 'POST',
                body : '{<br> fk_Cultivos : Int,<br> fk_TiposDesecho : Int,<br> nombre : Varchar, <br>descripcion : Text <br>}',
                responses : '200 El desecho fue registrado exitosamente - 400 Error al crear el desecho - 500 Internal server error'
            },
            {
                title : 'updateDesechos',
                url : '/desechos/:id',
                method : 'PUT',
                body : '{<br> fk_Cultivos : Int,<br> fk_TiposDesecho : Int,<br> nombre : Varchar, <br>descripcion : Text <br>}',
                responses : '201 El desecho fue actualizado correctamente - 400 Error al actualizar el desecho- 500 Internal server error'
            }
        ]
    },
    {
        title : 'TIPOS DESECHO',
        tables : [
            {
                title : 'getAllTiposDesecho',
                url : '/tiposDesecho',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 400 No se encontraron tipos de desechos registrados - 500 Internal server error '
            },
            {
                title : 'createTiposDesecho',
                url : '/tiposDesecho',
                method : 'POST',
                body : '{<br> nombre : Varchar,<br> descripcion : Text,<br> }',
                responses : '200 El tipo de desecho fue registrado exitosamente - 400 Error al registrar el tipo de desecho - 500 Internal server error'
            },
            {
                title : 'updateTiposDesecho',
                url : '/tiposDesecho/:id',
                method : 'PUT',
                body : '{<br> nombre : Varchar,<br> descripcion : Text,<br> }',
                responses : '200 El tipo de desecho fue actualizado exitosamente - 400 Error al actualizar el tipo de desecho - 500 Internal server error'
            }
        ]
    },
    {
        title : 'VENTAS',
        tables : [
            {
                title : 'getAllVentas',
                url : '/ventas',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 402 No se encontraron datos de Ventas - 500 Internal server error '
            },
            {
                title : 'createVentas',
                url : '/ventas',
                method : 'POST',
                body : '{<br> fk_Cosechas : Int,<br> precioUnitario : Int,<br> fecha : date <br>}',
                responses : '200 La venta fue registrada correctamente- 400 Error al registrar la venta - 500 Internal server error'
            },
            {
                title : 'updateVentas',
                url : '/ventas/:id',
                method : 'PUT',
                body : '{<br> fk_Cosechas : Int,<br> precioUnitario : Int,<br> fecha : date <br>}',
                responses : '200 La venta fue actualizada correctamente - 400 Error al actualizar la venta - 500 Internal server error'
            }
        ]
    },
    {
        title : 'ESPECIES',
        tables : [
            {
                title : 'getAllEspecies',
                url : '/especies',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 400 No se encontraron datos de especies registradas- 500 Internal server error '
            },
            {
                title : 'createEspecies',
                url : '/especies',
                method : 'POST',
                body : '{<br> nombre : Varchar,<br> descripcion : Text ,<br> img : Varchar,<br> tiempoCrecimiento : Int , <br>fk_TiposEspecie : Int <br>}',
                responses : '200 La especie fue registrada exitosamente - 400 Error al registrar la especie - 500 Internal server error'
            },
            {
                title : 'updateEspecies',
                url : '/especies',
                method : 'PUT',
                body : '{<br> nombre : Varchar,<br> descripcion : Text ,<br> img : Varchar,<br> tiempoCrecimiento : Int , <br>fk_TiposEspecie : Int <br>}',
                responses : '200 La especie fue actualizada exitosamente - 400 Error al actualizar la especie - 500 Internal server error'
            }
        ]
    },
    {
        title : 'SEMILLEROS',
        tables : [
            {
                title : 'getAllSemilleros',
                url : '/semilleros',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 404 No se encontraron semilleros registrados - 500 Internal server error '
            },
            {
                title : 'createSemilleros',
                url : '/semilleros',
                method : 'POST',
                body : '{<br> fk_Especies : Int,<br> unidades : Int,<br> fechaSiembra : Date,<br>fechaEstimada : Date,<br>}',
                responses : '200 El semilleros fue registrado exitosamente - 400 Error al registrar el semillero - 500 Internal server error'
            },
            {
                title : 'updateSemilleros',
                url : '/semilleros/:id',
                method : 'PUT',
                body : '{<br> fk_Especies : Int,<br> unidades : Int,<br> fechaSiembra : Date,<br>fechaEstimada : Date,<br>}',
                responses : '200 El semillero fue actualizado exitosamente- 400 Error al actualizar el semillero - 500 Internal server error'
            }
        ]
    },
    {
        title : 'TIPOS ESPECIE',
        tables : [
            {
                title : 'getAllTiposEspecie',
                url : '/tiposEspecie',
                method : 'GET',
                body : 'NULL',
                responses : '200 OK - 402 No se encontraron tipos de especie registrados - 500 Internal server error '
            },
            {
                title : 'createTiposEspecie',
                url : '/tiposEspecie',
                method : 'POST',
                body : '{<br> nombre : Varchar,<br> descripcion : Text,<br> img : Varchar,<br>}',
                responses : '200 El tipo de especie fue registrado exitosamente - 400 Error al registrar el tipo de especie - 500 Internal server error'
            },
            {
                title : 'updateTiposEspecie',
                url : '/tiposEspecie',
                method : 'PUT',
                body : '{<br> nombre : Varchar,<br> descripcion : Text,<br> img : Varchar,<br>}',
                responses : '200 El tipo de especie fue actualizado exitosamente - 400 Error al actualizar el tipo de especie - 500 Internal server error'
            }
        ]
    }
]



const tables = objs.map(controller=>(
    `<div>
        <div class="d-flex">
            <h5 class="text-center p-3 my-3 mx-auto shadow rounded-3">${controller.title}</h5>
        </div>
        
        ${controller.tables.map(table=>(
            `<table class="table table-striped shadow">
                <thead>
                    <th class="text-center" colspan="2">${table.title}</th>
                </thead>
                <tbody>
                    <tr>
                        <td><b>URL:</b></td>
                        <td>${table.url}</td>
                    </tr>
                    <tr>
                        <td><b>Method:</b></td>
                        <td>${table.method}</td>
                    </tr>
                    <tr>
                        <td><b>Headers:</b></td>
                        <td>Content-Type: application/json</td>
                    </tr>
                    <tr>
                        <td><b>Body:</b></td>
                        <td>${table.body}</td>
                    </tr>
                    <tr>
                        <td><b>Responses:</b></td>
                        <td>${table.responses}</td>
                    </tr>
                </tbody>
            </table>`
        ))}

    </div>`
))

document.getElementById('tables').innerHTML = tables;