Instalador MySQL: https://dev.mysql.com/downloads/file/?id=486088
Instalación MySQL:
- Setup type: "Developer Default", o bien "Custom": MySQL Server; MySQL Workbench.
- Execute (Instala los requerimientos de cada módulo).
- Execute (Instala los módulos seleciconados).
Configuración MySQL:
- High Availability: Standalone MySQL Server / Classic MySQL Replication
- Type and Networking: Config Type: Development Computer; Connectivity TCP/IP, Port: 3306, X Protocol Port: 33060, Open Windows Firewall ports for network access.
- Authentication Method: Use Legacy Authentication Method (Retain MySQL 5.x Compatibility)
- Accounts and Roles: MySQL Root Password: petship (Podemos acordar agregar nuevos usuarios para no usar el root).
- Windows Service: Configure MySQL Server as a Windows Service - Windows Service Name: MySQL80 - Standard System Account
- Apply Configuration: Execute.
PATH:
- Abrir propiedades del sistema
- Variables del entorno > Variables del sistema > Path > Editar
- Nuevo: C:\Program Files\MySQL\MySQL Server 8.0\bin
Migración de DB:
- Verificar que el servicio de MySQL se esté ejecutando
- Abrir MySQL Workbench
- Conectar con Local instance MySQL80
- File > Open MySQL Script (Seleccionar /directorio_del_repositorio/backend-api/database/db.sql)
- Ejecutar Script.
Ejecución del servidor:
- Ejecutar en una terminal ubicada en backend-api: npm run dev
