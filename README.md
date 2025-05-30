# Sistema de Gestión de Usuarios y Productos

Una aplicación web desarrollada en React para la gestión completa de usuarios y productos con una interfaz moderna y funcional.

## 🚀 Características

- **Gestión de Usuarios**: Crear, leer, actualizar y eliminar usuarios
- **Gestión de Productos**: Administrar catálogo de productos con precios
- **Exportación PDF**: Generar reportes en PDF con diseño neon personalizado
- **Validación de Formularios**: Validación robusta usando Yup y Formik
- **Interfaz Responsiva**: Diseño adaptable con PrimeReact
- **Navegación Intuitiva**: Rutas organizadas con React Router

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   └── navbar.jsx      # Barra de navegación principal
├── pages/              # Páginas principales
│   ├── home.jsx        # Página de inicio
│   ├── users/          # Módulo de usuarios
│   │   ├── usersView.jsx    # Lista de usuarios con tabla
│   │   └── usersForm.jsx    # Formulario crear/editar usuario
│   └── products/       # Módulo de productos  
│       ├── productsView.jsx # Lista de productos con tabla
│       └── productsForm.jsx # Formulario crear/editar producto
├── hooks/              # Custom hooks
│   ├── useUsers.js     # Lógica de estado para usuarios
│   └── useProducts.js  # Lógica de estado para productos
├── services/           # Servicios API
│   ├── config.jsx      # Configuración de Axios
│   ├── usersService.jsx    # Endpoints de usuarios
│   └── productsService.jsx # Endpoints de productos
├── utils/              # Utilidades y validaciones
│   ├── usersValidation.jsx    # Esquemas Yup usuarios
│   └── productsValidation.jsx # Esquemas Yup productos
├── routes/             # Configuración de rutas
│   ├── usersRoutes.jsx     # Rutas del módulo usuarios
│   └── productsRoutes.jsx  # Rutas del módulo productos
└── styles/             # Estilos CSS personalizados
```

## 🛠️ Funcionalidades

### Módulo de Usuarios
- **Lista de Usuarios**: Tabla paginada con búsqueda y ordenamiento
- **Crear Usuario**: Formulario con validación para nombre, email y edad
- **Editar Usuario**: Modificar datos existentes
- **Eliminar Usuario**: Confirmación antes de eliminar
- **Exportar PDF**: Reporte con diseño neon azul/violeta

### Módulo de Productos  
- **Lista de Productos**: Tabla paginada con información de productos
- **Crear Producto**: Formulario para nombre y precio con validación
- **Editar Producto**: Actualizar información de productos
- **Eliminar Producto**: Confirmación antes de eliminar
- **Exportar PDF**: Reporte con diseño neon violeta

### Características Técnicas
- **Validación Robusta**: 
  - Usuarios: nombre (3-50 chars), email único, edad (1-130)
  - Productos: nombre alfanumérico, precio positivo hasta 1M
- **Estado Global**: Custom hooks para manejo de estado
- **API REST**: Integración con backend en `localhost:5000`
- **UI Moderna**: PrimeReact con estilos personalizados
- **Navegación**: React Router con rutas anidadas

## 🎨 Interfaz

- **Diseño Neon**: Colores vibrantes con efectos visuales
- **Responsive**: Adaptable a diferentes tamaños de pantalla  
- **Componentes PrimeReact**: DataTable, formularios, botones, etc.
- **Iconos**: PrimeIcons para una interfaz intuitiva
- **Animaciones**: Loading spinners y transiciones suaves

## 🔧 Instalación

```bash
# Clonar el repositorio
git clone git@github.com:avelazquez777/frontProject.git

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev
```

## 📋 Dependencias Principales

- **React**: Framework principal
- **React Router**: Navegación y rutas
- **PrimeReact**: Biblioteca de componentes UI
- **Formik + Yup**: Manejo y validación de formularios
- **Axios**: Cliente HTTP para API
- **jsPDF**: Generación de reportes PDF

## 🌐 API

La aplicación consume una API REST en `http://localhost:5000` con los siguientes endpoints:

- `GET/POST /usuarios` - Listar/crear usuarios
- `GET/PUT/DELETE /usuarios/:id` - Obtener/actualizar/eliminar usuario
- `GET/POST /productos` - Listar/crear productos  
- `GET/PUT/DELETE /productos/:id` - Obtener/actualizar/eliminar producto

## 🎯 Uso

1. **Inicio**: Página de bienvenida con navegación
2. **Usuarios**: Gestionar usuarios desde el menú
3. **Productos**: Administrar productos desde el menú
4. **Formularios**: Crear/editar con validación en tiempo real
5. **Reportes**: Exportar listas a PDF con un clic