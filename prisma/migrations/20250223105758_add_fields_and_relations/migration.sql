-- CreateTable
CREATE TABLE "brands" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT,
    "website" TEXT,
    "country" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tyres" (
    "id" SERIAL NOT NULL,
    "model_id" INTEGER,
    "brand_id" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "country" VARCHAR(50),
    "date_code" CHAR(4),
    "applicability" VARCHAR(50),
    "sku" VARCHAR(50) NOT NULL,
    "inventory_quantity" INTEGER DEFAULT 0,
    "price" DECIMAL(10,2) NOT NULL,
    "load_speed_index" VARCHAR(10),
    "brand" VARCHAR(50),
    "model" VARCHAR(100),
    "width" DECIMAL(4,1),
    "profile" DECIMAL(4,1),
    "constr" CHAR(1),
    "diameter" DECIMAL(4,1),
    "delimiter" CHAR(1),
    "load_index" VARCHAR(10),
    "speed_index" CHAR(1),
    "type" VARCHAR(50),

    CONSTRAINT "tires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "models" (
    "id" SERIAL NOT NULL,
    "brandId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tires_sku_key" ON "tyres"("sku");

-- AddForeignKey
ALTER TABLE "tyres" ADD CONSTRAINT "tyres_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tyres" ADD CONSTRAINT "tyres_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;
