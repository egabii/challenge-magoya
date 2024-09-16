## Proyecto

### Requerimientos:

Parte 1: Frontend (Necesaria, validación de skills principales del candidato)
Tecnologías Requeridas: Next.js, React, Typescript, Redux, React query
Desarrolla una aplicación de interfaz de usuario que permita a los usuarios abrir una nueva
cuenta bancaria y realizar transacciones bancarias como depósitos y retiros.

1. La aplicación debe permitir a los usuarios crear cuentas con detalles como el
   nombre, el número de cuenta y el saldo inicial.
2. La aplicación debe permitir a los usuarios ingresar a su cuenta ya creada por número de
   cuenta.
3. Los usuarios deben poder realizar depósitos y retiros, introduciendo el monto de la
   transacción y seleccionando el tipo de transacción.
4. La aplicación debe mostrar el balance actualizado de la cuenta después de cada
   transacción.
5. La aplicación debe contar con una sección donde se listen las transacciones realizadas
   con datos de la misma: Fecha, monto, tipo de transacción.
6. La aplicación debe trabajar con state management.
   Nota: Utilizar estructura de código limpia orientada a componentes.

## Documentacion

Este proyecto se creo con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Comandos basicos

- Instale las dependencias:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

- Para correr en modo desarrollo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) en su navegador favorito.

### Stack Tecnologico:

Para este proyecto se usaron

- [Next.js](https://nextjs.org): metaframework basado en React, su ultima version 14.2.11. Nos permite un manejo ideal estrategias de renderizado de la interfaz, tales
  como SSR y SSG
- [React](https://react.dev/learn): version: 18.3.1 biblioteca para el desarollo de la interfaz de usuario, nos permite definir componentes y usarlos de manera declarativa.
- [Typescript](https://www.typescriptlang.org/): super set de caractiristicas adicionales a Javascript, para una mejor experiencia para el desarrollador, ademas de tener potente
  chequeo de tipos para nuestro control estatico.
- Redux: biblioteca para el manejo de estados global en la UI, en nuestro caso lo usamos para el manejo del estado del lado del cliente.
  Se instalo [redux/toolkit](https://redux-toolkit.js.org/), ya que una solucion empaquetada del boilerplate que se generaba cada vez
  que se debeia instalar redux con sus dependencias
- [React query](https://tanstack.com/query/v5): una biblioteca agnostica para los procesos asincronicos. Por ejemplo: llamadas a APIs.
- [shadcn ui](https://ui.shadcn.com/) - es una coleccion de componentes reutilizables hecha con react, tailwindcss y [radix-ui](https://www.radix-ui.com/primitives) para agilizar el proyeco de desarrollo y contar con un design system.

## Estructura de carpetas

```
/app
   (auth) -> para registrar una cuenta
   (general) -> las vistas una vez el usuario haya iniciado sesion con su cuenta
      /home
      /components --> aqui van los componentes que solo aplican en para este namespace/vista/seccion
      /deposit
      /withdraw
      ./layout.tsx --> tiene su propio layout para distinguirse del login y signup
   /store --> contiene toda configuracion de redux y la logica para el estado global
   /queries --> las queries y mutation que se realizar para integrar con la  API
   /fonts --> viene con nextjs
   /favicon.ico  --> viene con nextjs
   /global.css --> viene con nextjs
   /react-query-provider.tsx --> es el provider con la configuracion  para usar react-query con nextjs
   /store-provider --> es el provider con la configuracion  para usar redux con nextjs
   /page.tsx --> pagina de inicio
   /layout.tsx --> es el layout raiz
/components
   /ui --> aqui se instalan todos los componentes de shadcn ui y cualquier otro componentes que se quiera reutilizar en cualquier otra aplicacion
   Fuera de la carpeta /ui tambien existen algunos componentes propios de la aplicacion pero solo para esta aplicacion
```
