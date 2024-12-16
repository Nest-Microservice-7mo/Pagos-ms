-- CreateTable
CREATE TABLE "Pago" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idCliente" INTEGER NOT NULL,
    "idCita" INTEGER NOT NULL,
    "fechaPago" DATETIME NOT NULL,
    "metodoPago" TEXT NOT NULL,
    "montoPago" REAL NOT NULL,
    "estadoPago" TEXT NOT NULL
);
